export function PriceSelector({price, onChange}) {

    function handlePriceChange(e) {
        const newPrice = Math.max(0, Number(e.target.value) );
        onChange((Math.round(newPrice * 100) / 100).toFixed(2));
    }

    return <>
        <div className="border-1 w-[95%] border-gray-300 rounded-lg mt-4">
            <div className="grid grid-rows-[3rem]">
                <div className="w-full row-start-1 row-end-2 rounded-lg flex flex-row justify-between items-center">
                    <input 
                        type="number" 
                        value={price}
                        onChange={handlePriceChange}
                        className="w-[85%] rounded-lg h-[3rem] px-2 bg-white focus:outline-none  focus:ring-2 focus:rounded-lg focus:ring-gray-800 focus:border-transparent focus:scale-101" 
                    />
                    <div className="text-gray-500 text-md mt-1 px-1 w-auto">$ per night</div>      
                </div>
            </div>
        </div>
    </>
}