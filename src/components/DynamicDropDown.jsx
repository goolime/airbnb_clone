import { useEffect, useRef, useState } from 'react'

export function DynamicDropDown({ isModalOpen,  onCloseModal, children, width, direction, position, className = '', prevModalType, modalType }) {
    const dropdownRef = useRef(null)
    const contentRef = useRef(null)
    const [slideDirection, setSlideDirection] = useState('')
    const [isRender, setShouldRender] = useState(false)
    const [isAnimate, setShouldAnimate] = useState(false)

    useEffect(() => {
        const modalOrder = { location: 0, date: 1, guest: 2 }
        if (!prevModalType) {
            setSlideDirection('')
            return
        }
        const prevOrder = modalOrder[prevModalType] || 0
        const currentOrder = modalOrder[modalType] || 0
        let dir = ''
        if (currentOrder > prevOrder) {
            dir = 'animate-slide-in-left'
        } else if (currentOrder < prevOrder) {
            dir = 'animate-slide-in-right'
        }
        setSlideDirection(dir)
    }, [modalType, prevModalType])

    useEffect(() => {
        if (isModalOpen) {
            setShouldRender(true)
            const timer = setTimeout(() => {
                setShouldAnimate(true)
            }, 10)
            return () => clearTimeout(timer)
        } else {
            setShouldAnimate(false)
            const timer = setTimeout(() => {
                setShouldRender(false)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [isModalOpen])

    useEffect(() => {
        if (!isModalOpen) return
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                const isFilterBarClick = event.target.closest('[data-filter-section]')
                if (!isFilterBarClick) {
                    onCloseModal()
                }
            }
        }
        const timer = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside)
        }, 0)
        return () => {
            clearTimeout(timer)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isModalOpen, onCloseModal])

    if (!isRender) return null

    return (
        <div
            ref={dropdownRef}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            className={`${position} top-full ${direction} bg-white ${width} rounded-3xl py-6  px-4 shadow-lg border-2 border-gray-200 z-50 overflow-hidden transition-all 
            duration-300 ease-out  ${isAnimate ? 'opacity-100 scale-100 translate-y-2' : 'opacity-0 scale-90 translate-y-0'} ${className} `}
            style={{
                transformOrigin: 'top center'
            }}
        >
            <div ref={contentRef} key={modalType} className={slideDirection} >
                {children}
            </div>
        </div>
    )
}