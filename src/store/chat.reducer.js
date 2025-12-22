
export const initialChatState = {
    chats: [],
    selectedChat: null,
    messages: [],
    loading: false,
    messagesLoading: false,
    error: null
};

export function chatReducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };

        case 'SET_MESSAGES_LOADING':
            return {
                ...state,
                messagesLoading: action.payload
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
                messagesLoading: false
            };

        case 'SET_CHATS':
            return {
                ...state,
                chats: action.payload,
                error: null
            };

        case 'ADD_OR_UPDATE_CHAT': {
            const updatedChat = action.payload;
            const existingIndex = state.chats.findIndex(c => c._id === updatedChat._id);
            
            let newChats;
            if (existingIndex >= 0) {

                newChats = [...state.chats];
                newChats[existingIndex] = updatedChat;
            } else {
                newChats = [updatedChat, ...state.chats];
            }
            
            newChats.sort((a, b) => 
                new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
            );
            
            return {
                ...state,
                chats: newChats
            };
        }

        case 'SET_SELECTED_CHAT':
            return {
                ...state,
                selectedChat: action.payload,
                error: null
            };

        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.payload,
                error: null
            };

        case 'ADD_MESSAGE': {
            const newMessage = action.payload;
            
            if (!newMessage || !newMessage.chatId) {
                console.warn('ADD_MESSAGE: Invalid message', newMessage);
                return state;
            }
            
            if (state.selectedChat && 
                newMessage.chatId === state.selectedChat._id &&
                !state.messages.find(m => m._id === newMessage._id)) {
                return {
                    ...state,
                    messages: [...state.messages, newMessage]
                };
            }
            
            return state;
        }

        case 'PREPEND_MESSAGES': {
            const olderMessages = action.payload;
            
            return {
                ...state,
                messages: [...olderMessages, ...state.messages]
            };
        }

        case 'UPDATE_CHAT_LAST_MESSAGE': {
            const { chatId, lastMessage, lastMessageAt, senderId, currentUserId } = action.payload;
            
            const newChats = state.chats.map(chat => {
                if (chat._id === chatId) {

                    const userParticipant = chat.participants.find(
                        p => p.userId === currentUserId
                    );
                    const userRole = userParticipant?.role || 'guest';
                    
                    const shouldIncrementUnread = senderId !== currentUserId;
                    
                    return {
                        ...chat,
                        lastMessage,
                        lastMessageAt,
                        unreadCount: {
                            ...chat.unreadCount,
                            [userRole]: shouldIncrementUnread 
                                ? (chat.unreadCount[userRole] || 0) + 1 
                                : chat.unreadCount[userRole]
                        }
                    };
                }
                return chat;
            });
            
            newChats.sort((a, b) => 
                new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
            );
            
            return {
                ...state,
                chats: newChats
            };
        }

        case 'RESET_UNREAD_COUNT': {
            const { chatId, userId } = action.payload;
            
            const newChats = state.chats.map(chat => {
                if (chat._id === chatId) {

                    const userParticipant = chat.participants.find(
                        p => p.userId === userId
                    );
                    const userRole = userParticipant?.role || 'guest';
                    
                    return {
                        ...chat,
                        unreadCount: {
                            ...chat.unreadCount,
                            [userRole]: 0
                        }
                    };
                }
                return chat;
            });
            
            return {
                ...state,
                chats: newChats
            };
        }

        case 'MARK_MESSAGES_READ': {
            const { userId } = action.payload;
            
            const newMessages = state.messages.map(msg => ({
                ...msg,
                readBy: msg.readBy?.includes(userId) 
                    ? msg.readBy 
                    : [...(msg.readBy || []), userId]
            }));
            
            return {
                ...state,
                messages: newMessages
            };
        }

        case 'CLEAR_SELECTED_CHAT':
            return {
                ...state,
                selectedChat: null,
                messages: []
            };

        default:
            return state;
    }
}