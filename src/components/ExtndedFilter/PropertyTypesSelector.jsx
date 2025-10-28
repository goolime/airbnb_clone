import { FilterButton } from "./FilterButton";
import { HouseIcon, ApartmentIcon, GuesthouseIcon, HotelIcon } from "../util/Icons.jsx";

export function PropertyTypesSelector({ selectedTypes, onChange }) {
    const propertyTypes = [{key:'House', icon:<HouseIcon className="size-[2rem]" hexColor="#364153"/> }, {key:'Apartment', icon:<ApartmentIcon className="size-[2rem]" hexColor="#364153"/> }, {key:'Guesthouse', icon:<GuesthouseIcon className="size-[2rem]" hexColor="#364153"/> }, {key:'Hotel', icon:<HotelIcon className="size-[2rem]" hexColor="#364153"/> }];

    function handleTypeToggle(type) {
      if (selectedTypes.includes(type)) {
        onChange(selectedTypes.filter((t) => t !== type));
      } else {
        onChange([...selectedTypes, type]);
      }
    }
    return <>
        <div className="flex flex-wrap gap-2">
            {
            propertyTypes.map(({key, icon}) => <FilterButton
                key={key}
                isActive={selectedTypes.includes(key)}
                onClick={() => handleTypeToggle(key)}
            >
                <div className="flex items-center gap-1">
                    {icon}
                    {key}
                </div>
            </FilterButton>
            )}
        </div>
    </>
}
