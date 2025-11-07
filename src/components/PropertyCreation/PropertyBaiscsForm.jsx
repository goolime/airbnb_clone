import { ContriesDropdown } from "./ContriesDropdown";
import { TypeDropdown } from "./TypeDropdown";



export function PropertyBaiscsForm({ property, onChange }) { 

    function onLocationChange(value){
        onChange('loc', {
            ...property.loc,
            ...value
        });
    }

    return <>
        <div className="border-1 w-[95%] border-gray-300 rounded-lg mt-4">
            <div className="grid grid-rows-[3rem_3rem_3rem_3rem_3rem_3rem]">
                <input 
                    value={property.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    type="text" 
                    placeholder="Property Name" 
                    className="w-full row-start-1 row-end-2 h-[3rem] bg-white px-2 focus:outline-none rounded-t-lg focus:rounded-lg focus:ring-2 focus:ring-gray-800 focus:scale-101" 
                />
                <input 
                    value={property.summary}
                    onChange={(e) => onChange('summary', e.target.value)}
                    type="text" 
                    placeholder="Summary" 
                    className="w-full row-start-2 row-end-3 h-[3rem] border-t border-b border-gray-300 px-2 bg-white  focus:outline-none focus:ring-2 focus:rounded-lg focus:ring-gray-800 focus:border-transparent focus:scale-101" 
                />
                <TypeDropdown 
                    selectedOption={property.type} 
                    onSelect={(option) => onChange('type', option)} 
                    className="w-full row-start-3 row-end-4 h-[3rem]  border-b border-gray-300 px-2 bg-white  focus:outline-none focus:ring-2 focus:rounded-lg focus:ring-gray-800 focus:border-transparent focus:scale-101" 
                    placeholder="Type" 
                />
                <input 
                    value={property.loc.address}
                    onChange={(e) => onLocationChange({address: e.target.value})}
                    type="text" 
                    placeholder="Address" 
                    className="w-full row-start-4 row-end-5 h-[3rem]  border-b border-gray-300 px-2 bg-white  focus:outline-none focus:ring-2 focus:rounded-lg focus:ring-gray-800 focus:border-transparent focus:scale-101" 
                />
                <input 
                    value={property.loc.city}
                    onChange={(e) => onLocationChange({city: e.target.value})}
                    type="text" 
                    placeholder="City" 
                    className="w-full row-start-5 row-end-6 h-[3rem]  border-b border-gray-300 px-2 bg-white  focus:outline-none focus:ring-2 focus:rounded-lg focus:ring-gray-800 focus:border-transparent focus:scale-101" 
                />
                <ContriesDropdown 
                    location={property.loc}
                    placeholder="Country"
                    selectedCountry={property.country} 
                    onSelect={ onLocationChange}
                    className="w-full row-start-6 row-end-7 h-[3rem] px-2 bg-white focus:outline-none rounded-b-lg focus:ring-2 focus:rounded-lg focus:ring-gray-800 focus:border-transparent focus:scale-101" 
                />
            </div>
        </div>
    </>
}






