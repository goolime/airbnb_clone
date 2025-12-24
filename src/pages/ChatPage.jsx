import { useReducer, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChatList } from '../components/chat/ChatList.jsx'
import { ChatWindow } from '../components/chat/ChatWindow.jsx'
import { chatReducer, initialChatState } from '../store/chat.reducer.js'
import { chatActions } from '../actions/chat.actions.js'

export function ChatPage({ currentUser }) {

    const [state, dispatch] = useReducer(chatReducer, initialChatState)
    const location = useLocation()
    const [showMobileChat, setShowMobileChat] = useState(false)

    useEffect(() => {

        if (!currentUser?._id) return

        // Load chats when component mounts
        chatActions.loadChats(dispatch)

        // Setup socket listeners
        const cleanup = chatActions.setupSocket(currentUser._id, dispatch)

        // If coming from property page with chatId in state
        if (location.state?.chatId) {
            loadSpecificChat(location.state.chatId)
        }

        // Cleanup on unmount
        return () => {
            cleanup()
            // Leave current chat room if selected
            if (state.selectedChat) {
                chatActions.leaveChat(state.selectedChat._id)
            }
        }
    }, [currentUser?._id])

    async function loadSpecificChat(chatId) {
        try {
            await chatActions.selectChat(chatId, currentUser._id, dispatch)
            setShowMobileChat(true) // Show chat on mobile
        } catch (error) {
            console.error('Error loading specific chat:', error)
        }
    }

    async function handleChatSelect(chat) {
        try {
            // Leave previous chat room
            if (state.selectedChat) {
                chatActions.leaveChat(state.selectedChat._id)
            }

            // Select new chat
            await chatActions.selectChat(chat._id, currentUser._id, dispatch)
            setShowMobileChat(true) // Show chat on mobile
        } catch (error) {
            console.error('Error selecting chat:', error)
        }
    }

    async function handleSendMessage(content) {
        if (!state.selectedChat) return

        try {
            await chatActions.sendMessage(state.selectedChat._id, content, dispatch)
        } catch (error) {
            console.error('Error sending message:', error)
            throw error
        }
    }

    function handleMarkAsRead() {
        if (!state.selectedChat) return
    }

    function handleBackToList() {
        setShowMobileChat(false)
    }

    if (!currentUser) {
        return (
            <div className="h-[100dvh] flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        Please log in to view messages
                    </h2>
                    <p className="text-gray-600">
                        You need to be logged in to access your chats
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-[100dvh] bg-white">
            <div className="h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr]">
                {/* Chat List - Hidden on mobile when chat is selected */}
                <div className={`
                    ${showMobileChat ? 'hidden lg:block' : 'block'}
                    h-full overflow-hidden
                `}>
                    <ChatList
                        chats={state.chats}
                        selectedChatId={state.selectedChat?._id}
                        onChatSelect={handleChatSelect}
                        currentUserId={currentUser._id}
                        loading={state.loading}
                    />
                </div>

                {/* Chat Window - Hidden on mobile when no chat selected */}
                <div className={`
                    ${showMobileChat ? 'block' : 'hidden lg:block'}
                    h-full overflow-hidden
                `}>
                    <ChatWindow
                        chat={state.selectedChat}
                        messages={state.messages}
                        currentUserId={currentUser._id}
                        onSendMessage={handleSendMessage}
                        onMarkAsRead={handleMarkAsRead}
                        messagesLoading={state.messagesLoading}
                        onBackToList={handleBackToList}
                    />
                </div>
            </div>

            {/* Error Toast */}
            {state.error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    {state.error}
                </div>
            )}
        </div>
    )
}