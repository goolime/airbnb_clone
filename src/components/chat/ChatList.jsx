export function ChatList({ chats, selectedChatId, onChatSelect, currentUserId, loading }) {

    function getOtherParticipant(chat) {
        return chat.participants.find(
            p => p.userId.toString() !== currentUserId.toString()
        )
    }

    function getUserRole(chat) {
        const participant = chat.participants.find(
            p => p.userId.toString() === currentUserId.toString()
        )
        return participant?.role || 'guest'
    }

    function getUnreadCount(chat) {
        const role = getUserRole(chat)
        return chat.unreadCount?.[role] || 0
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp)
        const now = new Date()
        const diffMs = now - date
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Just now'
        if (diffMins < 60) return `${diffMins}m ago`
        if (diffHours < 24) return `${diffHours}h ago`
        if (diffDays < 7) return `${diffDays}d ago`
        return date.toLocaleDateString()
    }

    if (loading) {
        return (
            <div className="h-full bg-white border-r border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900">Messages</h2>
                </div>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading chats...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-[#222222]">Messages</h2>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {chats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 px-6 text-center">
                        <p className="text-[#222222] font-medium">No messages yet</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Start a conversation with a host
                        </p>
                    </div>
                ) : (
                    <div>
                        {chats.map(chat => {
                            const otherParticipant = getOtherParticipant(chat)
                            const unreadCount = getUnreadCount(chat)
                            const isSelected = chat._id === selectedChatId

                            return (
                                <div
                                    key={chat._id}
                                    onClick={() => onChatSelect(chat)}
                                    className={`
                                        flex gap-3 p-4 cursor-pointer border-b border-gray-100
                                        transition-colors duration-150
                                        ${isSelected
                                            ? 'bg-gray-100'
                                            : 'hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={otherParticipant?.user?.imgUrl || '/default-avatar.png'}
                                            alt={otherParticipant?.user?.fullname}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-base font-semibold text-gray-900 truncate">
                                                {otherParticipant?.user?.fullname}
                                            </h3>
                                            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                                {formatTimestamp(chat.lastMessageAt)}
                                            </span>
                                        </div>

                                        {/* Property */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <img
                                                src={chat.property?.imgUrls?.[0] || '/default-property.png'}
                                                alt={chat.property?.name}
                                                className="w-6 h-6 rounded object-cover"
                                            />
                                            <span className="text-xs text-gray-600 truncate">
                                                {chat.property?.name}
                                            </span>
                                        </div>

                                        {/* Last Message */}
                                        <div className="flex items-center justify-between">
                                            <p className={`
                                                text-sm truncate
                                                ${unreadCount > 0
                                                    ? 'text-gray-900 font-semibold'
                                                    : 'text-gray-500'
                                                }
                                            `}>
                                                {chat.lastMessage || 'No messages yet'}
                                            </p>
                                            {unreadCount > 0 && (
                                                <span className="ml-2 flex-shrink-0 bg-rose-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                                                    {unreadCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}