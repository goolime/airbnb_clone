
export function PropertyPlaceholder({ styles }) {

    return <>
        <div className="snap-start">
            <div className={`bg-gray-300 rounded-3xl  ${styles.carousel}`} />
            <div className={`bg-gray-300 rounded-full mt-2 mb-1 ${styles.header} w-8/10 h-[1.3rem]` } />
            <div className={`bg-gray-300 rounded-full ${styles.text} w-3/5 h-[1.2rem]`} />
        </div>
    </>
}
