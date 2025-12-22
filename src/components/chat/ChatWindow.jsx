import { useState, useEffect, useRef } from 'react'

export function ChatWindow({ 
    chat, 
    messages, 
    currentUserId, 
    onSendMessage, 
    onMarkAsRead,
    messagesLoading,
    onBackToList 
}) {
    const [newMessage, setNewMessage] = useState('')
    const [sending, setSending] = useState(false)
    const messagesEndRef = useRef(null)
    const messagesContainerRef = useRef(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        // Mark as read when chat opens or new message arrives
        if (chat && messages.length > 0) {
            onMarkAsRead()
        }
    }, [chat?._id, messages.length])

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    async function handleSendMessage(e){
        e.preventDefault()
        
        const trimmedMessage = newMessage.trim()
        if (!trimmedMessage || sending) return

        try {
            setSending(true)
            await onSendMessage(trimmedMessage)
            setNewMessage('')
        } catch (error) {
            console.error('Error sending message:', error)
            alert('Failed to send message. Please try again.')
        } finally {
            setSending(false)
        }
    }

    function getOtherParticipant(){
        if (!chat) return null
        return chat.participants.find(
            p => p.userId.toString() !== currentUserId.toString()
        )
    }

    function isMessageRead(message){
        if (message.senderId === currentUserId) {
            const otherParticipant = getOtherParticipant()
            return message.readBy?.some(
                id => id.toString() === otherParticipant?.userId?.toString()
            )
        }
        return false
    }

    function formatMessageTime(timestamp){
        const date = new Date(timestamp)
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        })
    }

    function formatMessageDate(timestamp){
        const date = new Date(timestamp)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (date.toDateString() === today.toDateString()) {
            return 'Today'
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday'
        } else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
            })
        }
    }

    function shouldShowDateSeparator(currentMsg, prevMsg){
        if (!prevMsg) return true
        
        const currentDate = new Date(currentMsg.createdAt).toDateString()
        const prevDate = new Date(prevMsg.createdAt).toDateString()
        
        return currentDate !== prevDate
    }

    // Empty state
    if (!chat) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                        Select a conversation
                    </h3>
                    <p className="text-sm text-gray-500">
                        Choose a chat from the list to start messaging
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            
            <div className="lg:hidden px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                {/* Back button for mobile */}
                {onBackToList && (
                    <button
                        onClick={onBackToList}
                        className="lg:hidden px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        ← Back
                    </button>
                )}
            </div>

            {/* Messages */}
            <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-6 py-4 max-h-[75vh] bg-gray-50"
            >
                {messagesLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-gray-500">Loading messages...</div>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">
                            No messages yet. Start the conversation!
                        </p>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => {
                            const isOwnMessage = message.senderId === currentUserId
                            const showDateSeparator = shouldShowDateSeparator(
                                message, 
                                messages[index - 1]
                            )

                            return (
                                <div key={message._id}>
                                    {showDateSeparator && (
                                        <div className="flex items-center justify-center my-4">
                                            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                                                {formatMessageDate(message.createdAt)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className={`flex gap-2 mb-4 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                                        {!isOwnMessage && (
                                            <img
                                                src={message.sender?.imgUrl || '/default-avatar.png'}
                                                alt={message.sender?.fullname}
                                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                            />
                                        )}
                                        
                                        <div className={`max-w-[60%] flex flex-col ${isOwnMessage ? 'items-end' : ''}`}>
                                            <div className={`
                                                px-4 py-2 rounded-2xl
                                                ${isOwnMessage 
                                                    ? 'bg-rose-500 text-white rounded-br-sm' 
                                                    : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
                                                }
                                            `}>
                                                <p className="text-sm leading-relaxed break-words">
                                                    {message.content}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 px-1">
                                                <span className="text-xs text-gray-500">
                                                    {formatMessageTime(message.createdAt)}
                                                </span>
                                                {isOwnMessage && isMessageRead(message) && (
                                                    <span className="text-xs text-gray-500">
                                                        • Read
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                        maxLength={1000}
                        disabled={sending}
                    />
                    <button 
                        type="submit" 
                        disabled={!newMessage.trim() || sending}
                        className="px-6 py-3 bg-rose-500 text-white rounded-full font-semibold text-sm hover:bg-rose-600 disabled:bg-rose-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {sending ? 'Sending...' : 'Send'}
                    </button>
                </form>
                <div className="mt-2 text-right">
                    <small className="text-xs text-gray-500">
                        {newMessage.length}/1000 characters
                    </small>
                </div>
            </div>
        </div>
    )
}