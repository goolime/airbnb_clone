import { httpService } from '../http.service.js'

const CHAT_URL = 'chats'

export const chatService = {

    query,
    findOrCreate,
    getById,
    getMessages,
    addMessage,
    markAsRead
}

async function query() {
    try {
        return await httpService.get('chats')
    } catch (err) {
        console.error('chatService[query] error:', err)
        throw err
    }
}

async function findOrCreate(propertyId, hostId) {
    try {
        return await httpService.post(`${CHAT_URL}/find-or-create`, {
            propertyId,
            hostId
        })
    } catch (err) {
        console.error('chatService[findOrCreate] error:', err)
        throw err
    }
}

async function getById(chatId) {
    try {
        return await httpService.get(`${CHAT_URL}/${chatId}`)
    } catch (err) {
        console.error('chatService[getById] error:', err)
        throw err
    }
}

async function getMessages(chatId, limit = 50, before = null) {
    try {
        const params = { limit }
        if (before) params.before = before
        return await httpService.get(`${CHAT_URL}/${chatId}/messages`, params)
    } catch (err) {
        console.error('chatService[getMessages] error:', err)
        throw err
    }
}

async function addMessage(chatId, content) {
    try {
        return await httpService.post(`${CHAT_URL}/${chatId}/messages`, { content })
    } catch (err) {
        console.error('chatService[addMessage] error:', err)
        throw err
    }
}

async function markAsRead(chatId) {
    try {
        return await httpService.post(`${CHAT_URL}/${chatId}/read`)
    } catch (err) {
        console.error('chatService[markAsRead] error:', err)
        throw err
    }
}
