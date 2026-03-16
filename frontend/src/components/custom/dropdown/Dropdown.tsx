import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LIST_MODELS } from "@/constants/endpoints"
import api from "@/api/api"

type Model = {
  active: boolean
  context_window: number
  created: number
  id: string
  max_completion_tokens: number
  object: string
  owned_by: string
  public_apps: null
}

type ModelListItem = {
  id: string
  context_window: number
  max_completion_tokens: number
}

type DropdownProps = {
  selectedModel: string
  setSelectedModel: (modelName: string) => void
}

const Dropdown = ({ selectedModel, setSelectedModel }: DropdownProps) => {
  const [models, setModels] = useState<ModelListItem[]>([])

  const handleClick = (modelName: string) => {
    setSelectedModel(modelName)
  }

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const result = await api.get(LIST_MODELS)
        const modelsList = result.data?.data?.map((obj: Model) => {
          return {
            id: obj.id,
            context_window: obj.context_window,
            max_completion_tokens: obj.max_completion_tokens,
          }
        })
        setModels(modelsList)
      } catch {
        // console.log
      }
    }
    fetchModels()
  }, [])
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-65 justify-between">
            {selectedModel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {models?.map((obj: ModelListItem) => {
            return (
              <DropdownMenuItem
                key={obj.id}
                onClick={() => {
                  handleClick(obj.id)
                }}
              >
                {obj.id}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Dropdown
