
export function OrderPreviewPlaceholder() {
    
    return <div className={`border border-gray-300 rounded-2xl p-4 shadow-md md:grid md:grid-cols-[15rem_1fr] md:grid-rows-[auto_auto_auto] md:gap-4 max-md:flex max-md:flex-col max-md:gap-2 items-center justify-center`}>
            <div className="bg-gray-300 rounded-md max-md:size-[50vw] md:w-full md:h-64 md:col-span-2 md:col-start-1 md:row-start-1"/>
            <div className="bg-gray-300 rounded-md h-[1rem] w-3/4 md:w-[15rem] mb-2 md:col-span-2 md:col-start-1 md:row-start-2"></div>
            <div className="flex flex-row md:col-start-1 md:row-start-3 gap-2"> 
                <div className="bg-gray-300 rounded-md h-[1rem] w-1/4"></div>
                <div className="bg-gray-300 rounded-md h-[1rem] w-1/4"></div>
            </div>
            <div className="flex flex-row gap-4 mt-2 w-full">
                <div className="bg-gray-300 rounded-md h-[1rem] w-1/6"></div>
                <div className="bg-gray-300 rounded-md h-[1rem] w-1/6"></div>
                <div className="bg-gray-300 rounded-md h-[1rem] w-1/6"></div>
                <div className="bg-gray-300 rounded-md h-[1rem] w-1/6"></div>
                <div className="bg-gray-300 rounded-md h-[1rem] w-1/12"></div>
            </div>
            <div className="md:col-start-2 md:row-start-2 flex flex-row items-center gap-2 w-3/4">
                <div className="bg-gray-300 rounded-full w-8 h-8 inline-block mr-2"></div>
                <div className="bg-gray-300 rounded-md h-[1rem] w-1/4"></div>
                <div className="bg-gray-300 rounded-md h-[1rem] w-1/6 ml-4"></div>
            </div>
            <div className="mt-2 flex flex-row items-center">
                <span className="bg-gray-300 rounded-md h-[1rem] w-[7rem] inline-block ml-2" />
                <span className="bg-gray-300 rounded-md h-[1rem] w-[7rem] inline-block ml-2" />
            </div>
            <div className="flex flex-row gap-4">
                <div className="bg-gray-300 rounded-xl h-[2.5rem] w-32 mt-2"></div>
                <div className="bg-gray-300 rounded-xl h-[2.5rem] w-32 mt-2"></div>
            </div>
           
        </div>
}