import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { ChatPage } from './ChatPage.jsx'
import { showLoginModal } from '../services/event-bus.service'
import { chatService } from '../services/chat/chat.service.remote.js'

export function ChatPageConnected() {
    const navigate = useNavigate()
    const location = useLocation()
    const [chatId, setChatId] = useState(location.state?.chatId || null)
    const [loading, setLoading] = useState(false)
    const hasCreatedChat = useRef(false)

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    console.log('ChatPageConnected RENDER')
    console.log('location.state:', location.state)
    console.log('location.pathname:', location.pathname)
    console.log('================')

    useEffect(() => {

        if (loggedInUser &&
            location.state?.hostId &&
            location.state?.propertyId &&
            !chatId &&
            !hasCreatedChat.current) {
            handlePropertyNavigation()
        }
    }, [location.state?.hostId, location.state?.propertyId, loggedInUser])

    useEffect(() => {
        if (!loggedInUser) {
            showLoginModal()
            navigate('/')
        }
    }, [loggedInUser, navigate])

async function handlePropertyNavigation() {
    console.log('=== Creating/Finding Chat ===')
    console.log('Property ID:', location.state.propertyId)
    console.log('Host ID:', location.state.hostId)
    console.log('User ID:', loggedInUser._id)

    // IMMEDIATELY clear the hostId/propertyId from state
    const propertyId = location.state.propertyId
    const hostId = location.state.hostId
    
    // Clear state right away to prevent re-runs
    navigate('/messages', {
        state: {},
        replace: true
    })

    hasCreatedChat.current = true

    try {
        setLoading(true)

        const chat = await chatService.findOrCreate(
            propertyId,
            hostId
        )

        console.log('Chat created/found:', chat._id)
        
        setChatId(chat._id)
        setLoading(false)

        navigate('/messages', {
            state: { chatId: chat._id },
            replace: true
        })
    } catch (error) {
        console.error('Error creating chat:', error)
        setLoading(false)
        hasCreatedChat.current = false
    }
}

    if (!loggedInUser) {
        return null
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Starting conversation...</p>
                </div>
            </div>
        )
    }

    return <ChatPage currentUser={loggedInUser} />
}