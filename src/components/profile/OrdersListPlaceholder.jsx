    import { OrderPreviewPlaceholder } from "./OrderPreviewPlaceholder.jsx"

    export function OrdersListPlaceholder() {

        return (
            <>
                <div className="flex flex-row items-center align-center mx-auto gap-4 mb-4">
                        <div className="h-[1rem] w-[7rem] bg-gray-300 rounded-md"></div>
                        <div className="w-[400px]">
                        <div className="relative w-[100%] border mx-auto border-gray-300 rounded-xl grid py-2 px-3 grid-cols-2 ">
                            <button className={`p-[1rem] h-[3.5rem] text-gray-700 text-center text-[1em] bg-gray-300 font-semibold scale-97 rounded-xl z-10;`} />
                            <button className={`p-[1rem] h-[3.5rem] text-gray-700 text-center text-[1em] bg-gray-300 font-semibold scale-97 rounded-xl z-10;`} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="size-[2rem] bg-gray-300 rounded-md"></div>
                        <div className="h-[1rem] w-[7rem] bg-gray-300 rounded-md"></div>
                    </div>
                </div>
                <div className="flex flex-row md:flex-col  gap-4 h-[68vh] overflow-hidden  max-md:snap-x md:snap-y snap-mandatory ">
                    <OrderPreviewPlaceholder />
                    <OrderPreviewPlaceholder />

                </div>
            </>
        )
    }