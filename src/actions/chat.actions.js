import { chatService } from '../services/chat/chat.service.remote.js'
import { socketService } from '../services/socket.service.js'

export const chatActions = {

    loadChats,
    findOrCreateChat,
    selectChat,
    sendMessage,
    handleNewMessage,
    handleChatUpdate,
    handleMessagesRead,
    loadMoreMessages,
    setupSocket,
    leaveChat
}

async function loadChats(dispatch) {
    try {
        dispatch({ type: 'SET_LOADING', payload: true })

        console.log('Loading chats...')
        const chats = await chatService.query()
        console.log('Chats loaded:', chats)

        dispatch({ type: 'SET_CHATS', payload: chats })
        dispatch({ type: 'SET_LOADING', payload: false })

        return chats
    } catch (err) {
        console.error('loadChats error:', err)
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load chats' })
        dispatch({ type: 'SET_LOADING', payload: false })
        throw err
    }
}

async function findOrCreateChat(propertyId, hostId, dispatch) {
    try {
        const chat = await chatService.findOrCreate(propertyId, hostId)

        dispatch({ type: 'ADD_OR_UPDATE_CHAT', payload: chat })

        return chat
    } catch (err) {
        console.error('Error finding/creating chat:', err)
        throw err
    }
}

async function selectChat(chatId, currentUserId, dispatch) {
    try {
        dispatch({ type: 'SET_MESSAGES_LOADING', payload: true })

        const chat = await chatService.getById(chatId)
        dispatch({ type: 'SET_SELECTED_CHAT', payload: chat })

        const messages = await chatService.getMessages(chatId)
        dispatch({ type: 'SET_MESSAGES', payload: messages })

        socketService.joinChat(chatId)

        await chatService.markAsRead(chatId)

        dispatch({
            type: 'RESET_UNREAD_COUNT',
            payload: { chatId, userId: currentUserId }
        })

        dispatch({ type: 'SET_MESSAGES_LOADING', payload: false })
    } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load chat' })
        dispatch({ type: 'SET_MESSAGES_LOADING', payload: false })
        throw err
    }
}

async function sendMessage(chatId, content, dispatch) {
    try {
        const message = await chatService.addMessage(chatId, content)
        return message
    } catch (err) {
        console.error('Error sending message:', err)
        throw err
    }
}

function handleNewMessage(message, currentUserId, dispatch) {

    if (!message || !message.chatId) {
        console.warn('handleNewMessage: Invalid message received', message)
        return
    }

    dispatch({ type: 'ADD_MESSAGE', payload: message })

    dispatch({
        type: 'UPDATE_CHAT_LAST_MESSAGE',
        payload: {
            chatId: message.chatId,
            lastMessage: message.content,
            lastMessageAt: message.createdAt,
            senderId: message.senderId,
            currentUserId
        }
    })
}

function handleChatUpdate(updatedChat, dispatch) {
    dispatch({ type: 'ADD_OR_UPDATE_CHAT', payload: updatedChat })
}

function handleMessagesRead(data, dispatch) {
    dispatch({ type: 'MARK_MESSAGES_READ', payload: data })
}

async function loadMoreMessages(chatId, currentMessages, dispatch) {
    try {
        if (currentMessages.length === 0) return

        const oldestMessage = currentMessages[0]
        const olderMessages = await chatService.getMessages(
            chatId,
            50,
            oldestMessage.createdAt
        )

        if (olderMessages.length > 0) {
            dispatch({ type: 'PREPEND_MESSAGES', payload: olderMessages })
        }
    } catch (err) {
        console.error('Error loading more messages:', err)
        throw err
    }
}

function setupSocket(userId, dispatch) {

    socketService.connect(userId)

    const handleNewMessage = (message) => {
        chatActions.handleNewMessage(message, userId, dispatch)
    }

    const handleChatUpdate = (chat) => {
        chatActions.handleChatUpdate(chat, dispatch)
    }

    const handleMessagesRead = (data) => {
        chatActions.handleMessagesRead(data, dispatch)
    }

    socketService.on('message:new', handleNewMessage)
    socketService.on('chat:update', handleChatUpdate)
    socketService.on('messages:read', handleMessagesRead)

    return () => {
        socketService.off('message:new', handleNewMessage)
        socketService.off('chat:update', handleChatUpdate)
        socketService.off('messages:read', handleMessagesRead)
    }
}

function leaveChat(chatId) {
    if (chatId) {
        socketService.leaveChat(chatId)
    }
}


