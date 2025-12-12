
export function PropertyPlaceholder({ styles }) {

    return <>
        <div className="snap-start">
            <div className={`bg-gray-300 rounded-3xl  ${styles.carousel}`} />
            <div className={`bg-gray-300 rounded-full mt-2 mb-1 w-8/10 h-[1.3rem] sm:h-[1.1rem]` } />
            <div className={`flex flex-raw gap-1`}>
                <div className={`bg-gray-300 rounded-full w-3/10 h-[1rem] sm:h-[0.8rem]`} />
                <div className={`bg-gray-300 rounded-full w-3/10 h-[1rem] sm:h-[0.8rem]`} />
            </div>
            <div className={`bg-gray-300 mt-1 rounded-full w-4/5 h-[1rem] sm:h-[0.8rem]`} />
        </div>
    </>
}
