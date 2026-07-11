import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

export const sendMessage = async ({ message, chatId }) => {
    const res = await api.post('/api/chats/message', { message, chat: chatId })
    return res.data
}

export const getChats = async () => {
    const res = await api.get('/api/chats')
    return res.data
}

export const getMessages = async (chatId) => {
    const res = await api.get(`/api/chats/${chatId}/messages`)
    return res.data
}

export const deleteChat = async (chatId) => {
    const res = await api.delete(`/api/chats/delete/${chatId}`)
    return res.data
}