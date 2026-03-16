import { useState, useEffect } from "react"
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

const Home = () => {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState("")

  const handleTextAreaChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleSubmit = async () => {
    if (!userInput) return
    try {
      const payload = {
        userInput: userInput,
      }
      const newUserMessage = {
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
      const newSystemMessage = {
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
    } catch (err) {
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
      <h1>Chatbot</h1>
      <div className="main flex h-[96vh] min-h-0 flex-col">
        <div className="displayArea h-12/15 min-h-0 px-5 py-2">
          <Card className="h-full min-h-0 overflow-visible">
            <CardContent className="flex min-h-0 flex-1 flex-col">
              <div className="flex min-h-0 flex-1 flex-col items-start gap-3 overflow-auto">
                {messages?.map((card) => {
                  return (
                    <Card
                      className={`h-md max-w-9/10 ${card.type === "user" ? "self-end" : ""}`}
                    >
                      <CardContent className="">
                        <p>{card?.content}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="textLoc flex h-3/15 w-full items-center gap-2 p-4">
          <div className="w-14/15">
            <Textarea
              className="h-24"
              value={userInput}
              placeholder="Type your message here"
              onChange={handleTextAreaChange}
            />
          </div>
          <div className="flex w-1/15 items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className="h-16 w-16"
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
