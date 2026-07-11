import { initializeSocketConnection } from "../services/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../services/chat.api.js";
import { createNewChat, setChats, setCurrentChatId, setError, setLoading, addMessages, addNewMessage } from "../chat.slice";
import { useDispatch, useSelector } from "react-redux";



export const useChat = () => {

    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId })
        console.log(data)
        const { chat, aiMsg: aiMessage } = data
        const finalChatId = chatId || chat?._id
        
        if (!chatId) {
            dispatch(createNewChat({
                chatId: chat._id,
                title: chat.title,
            }))
        }
        
        dispatch(addNewMessage({
            chatId: finalChatId,
            content: message,
            role: "user",
        }))
        
        if (aiMessage?.content) {
            dispatch(addNewMessage({
                chatId: finalChatId,
                content: aiMessage.content,
                role: aiMessage.role || "ai",
            }))
        }
        
        dispatch(setCurrentChatId(finalChatId))
        dispatch(setLoading(false))
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId, chats) {

        console.log(chats[chatId]?.messages.length)

        if (chats[chatId]?.messages.length === 0) {
            const data = await getMessages( chatId )
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role,
            }))

            // console.log(formattedMessages);
            

            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))

        }
        dispatch(setCurrentChatId(chatId))
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }
}