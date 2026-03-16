import { useState, useEffect, type ChangeEvent } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  TEXT_TO_TEXT,
  GET_MESSAGES,
  INSERT_MESSAGES,
} from "@/constants/endpoints"
import api from "../../api/api"
import { v4 as uuid } from "uuid"
import Dropdown from "@/components/custom/dropdown/Dropdown"

const Home = () => {
  type Message = {
    id: string
    type: "user" | "system"
    content: string
  }

  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("openai/gpt-oss-120b")

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value)
  }

  const handleSubmit = async () => {
    if (!userInput) return
    try {
      const payload = {
        userInput: userInput,
        model: selectedModel,
      }
      const newUserMessage: Message = {
        id: uuid(),
        type: "user",
        content: userInput,
      }
      setMessages((prevMessages) => [...prevMessages, newUserMessage])
      setUserInput("")
      const result = await api.post(TEXT_TO_TEXT, payload)
      console.log("a45", result.data.data)
      if (result.status !== 200) {
        //show error
      }
      const newSystemMessage: Message = {
        id: uuid(),
        type: "system",
        content: result.data.data,
      }
      console.log("a46", [...messages, result.data.data])
      setMessages((prevMessages) => [...prevMessages, newSystemMessage])
      const insertPayload = []
      insertPayload.push(newUserMessage)
      insertPayload.push(newSystemMessage)
      const dbInsert = await api.post(INSERT_MESSAGES, {
        messages: insertPayload,
      })
      if (!dbInsert) {
        //console log db error //find retry mechanism
      }
    } catch {
      //console any error
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const getMessages = await api.get(GET_MESSAGES)
      setMessages(getMessages.data.data)
    }
    fetchData()
  }, [])
  return (
    <div className="h-screen overflow-hidden">
      <div className="header flex h-[7vh] justify-between px-5 py-2">
        <div className="logo">GroqGPT</div>
        <div className="dropdown w-65">
          <Dropdown
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        </div>
      </div>
      <div className="main flex h-[92vh] min-h-0 flex-col">
        <div className="displayArea h-12/15 min-h-0 px-5 py-2">
          <Card className="h-full min-h-0 overflow-visible">
            <CardContent className="flex min-h-0 flex-1 flex-col">
              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto pr-2">
                {messages?.map((card) => {
                  const isUser = card.type === "user"
                  return (
                    <div
                      key={card.id}
                      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={[
                          "max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
                          "whitespace-pre-wrap break-words",
                          isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground",
                        ].join(" ")}
                      >
                        {card.content}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="textLoc flex h-3/15 w-full items-center gap-2 p-4">
          <div className="w-19/20">
            <Textarea
              className="h-24"
              value={userInput}
              placeholder="Type your message here"
              onChange={handleTextAreaChange}
            />
          </div>
          <div className="flex w-1/20 items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11"
              aria-label="Submit"
              onClick={handleSubmit}
            >
              <ArrowUpIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
