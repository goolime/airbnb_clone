import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { chatService } from '../../services/chat/chat.service.remote.js'
import { store } from '../../store/store.js'

export function ContactHost({ property, currentUser }) {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    console.log(currentUser)
    async function handleContactHost() {

        if (!currentUser) {
            navigate('/login', {
                state: { from: `/property/${property._id}` }
            })
            return
        }

        if (currentUser._id === property.host._id) {
            alert("You can't message yourself!")
            return
        }

        try {
            setLoading(true)

            const chat = await chatService.findOrCreate(
                property._id,
                property.host._id
            )

            navigate('/messages', {
                state: { chatId: chat._id }
            })
        } catch (error) {
            console.error('Error creating chat:', error)
            alert('Failed to start conversation. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            className="bg-gray-100 w-fit py-3 rounded-xl px-6 font-semibold cursor-pointer hover:bg-gray-200 mb-6 transition"
            onClick={() => {
                console.log('=== CONTACT HOST DEBUG ===');
                console.log('property:', property);
                console.log('property.host:', property.host);
                console.log('property.host._id:', property.host?._id);
                console.log('property._id:', property._id);
                console.log('currentUser:', store.getState().userModule.loggedInUser);
                console.log('========================');

                navigate('/messages', {
                    state: {
                        hostId: property.host._id,
                        propertyId: property._id
                    }
                });
            }}
        >
            Contact host
        </button>
    )
}