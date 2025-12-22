import { io } from 'socket.io-client'

class SocketService {
    
    constructor() {
        this.socket = null
    }

    connect(userId) {
        if (this.socket?.connected) {

            return this.socket
        }

        const serverUrl = process.env.NODE_ENV === 'production'
            ? window.location.origin
            : 'http://localhost:3030'
        
        this.socket = io(serverUrl, {
            withCredentials: true,
            transports: ['websocket', 'polling']
        })

        this.socket.on('connect', () => {
            console.log('Socket connected:', this.socket.id)
            if (userId) {
                this.socket.emit('user:join', userId)
            }
        })

        this.socket.on('disconnect', () => {
            console.log('Socket disconnected')
        })

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error)
        })

        return this.socket
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }

    joinChat(chatId) {
        if (this.socket) {
            this.socket.emit('chat:join', chatId)
            console.log('Joined chat room:', chatId)
        }
    }

    leaveChat(chatId) {
        if (this.socket) {
            this.socket.emit('chat:leave', chatId)
            console.log('Left chat room:', chatId)
        }
    }

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback)
        }
    }

    off(event, callback) {
        if (this.socket) {
            this.socket.off(event, callback)
        }
    }

    removeAllListeners(event) {
        if (this.socket) {
            this.socket.off(event)
        }
    }

    isConnected() {
        return this.socket?.connected || false
    }
}

export const socketService = new SocketService()