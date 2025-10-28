

export function DynamicDropDown({ isModalOpen, onCloseModal, children, width, direction, position }) {



    if (!isModalOpen) return null

    return <>

        <div onClick={onCloseModal} className="fixed inset-0 z-40" />

        <div
            onClick={(e) => e.stopPropagation()}
            className={`
                    ${position}
                    top-full
                    ${direction}
                    bg-white
                    ${width}
                    rounded-3xl
                    py-4
                    px-8
                    mt-4
                    shadow-lg
                    border-2
                    border-gray-200
                    origin-top
                    transition-transform
                    duration-200
                    z-50
                    ${isModalOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
                `}>
            {children}
        </div>
    </>
}








