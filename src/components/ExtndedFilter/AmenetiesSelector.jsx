import { useState } from "react";
import { FilterButton } from "../ExtndedFilter/FilterButton";
import { AirConditioner, Tv, Kitchen, HotTub, Heating, WorkSpace, Wifi, Washer, Dryer, HairDryer, Iron, Pool, EvCharger, Parking, Crib, KingSizeBed, Gym, BBQGrill, Breakfast, FirePlace, Smoking, Beachfront, Waterfront, SmokeAlarm, CarbonMonoxideAlarm, ChevronDown, ChevronUp } from "../util/Icons.jsx";

const amenityList = {
    'popular': {
        "A/C": { icon: <AirConditioner className="size-[1.5rem]" />, label: "Air conditioning" },
        "TV": { icon: <Tv className="size-[1.5rem]" />, label: "TV" },
        "Kitchen": { icon: <Kitchen className="size-[1.5rem]" />, label: "Kitchen" },
        "Hot tub": { icon: <HotTub className="size-[1.5rem]" />, label: "Hot tub"},
        "Heating": { icon: <Heating className="size-[1.5rem]" />, label: "Heating" },
        "Workspace": { icon: <WorkSpace className="size-[1.5rem]" />, label: "Dedicated workspace" },
    },
    'all':{
      "Esentials":{
        "Wifi": {icon: <Wifi className="size-[1.5rem]" />, label: "Wifi"},
        "Washer": {icon: <Washer className="size-[1.5rem]" />, label: "Washer"},
        "Dryer": {icon: <Dryer className="size-[1.5rem]" />, label: "Dryer"},
        "Hairdryer": {icon: <HairDryer className="size-[1.5rem]" />, label: "Hair dryer"},
        "Iron": {icon: <Iron className="size-[1.5rem]" />, label: "Iron"},
      },
      "Features":{
        "Pool":{icon:<Pool className="size-[1.5rem]" />, label: "Pool"},
        "EV charger":{icon:<EvCharger className="size-[1.5rem]" />, label: "EV charger"},
        "Free Parking":{icon:<Parking className="size-[1.5rem]" />, label: "Free parking"},
        "Crib":{icon:<Crib className="size-[1.5rem]" />, label: "Crib"},
        "King bed":{icon:<KingSizeBed className="size-[1.5rem]" />, label: "King bed"},
        "Gym":{icon:<Gym className="size-[1.5rem]" />, label: "Gym"},
        "Grill":{icon:<BBQGrill className="size-[1.5rem]" />, label: "BBQ Grill"},
        "Breakfast":{icon:<Breakfast className="size-[1.5rem]" />, label: "Breakfast"},
        "FirePlace":{icon:<FirePlace className="size-[1.5rem]" />, label: "Indoor fireplace"},
        "Smoking allowed":{icon:<Smoking className="size-[1.5rem]" />, label: "Smoking allowed"},
      },
      "Location":{
        "Beachfront":{icon:<Beachfront className="size-[1.5rem]" />, label: "Beachfront"},
        "Waterfront":{icon:<Waterfront className="size-[1.5rem]" />, label: "Waterfront"}
      },
      "Safety":{
        "Smoke alarm":{icon:<SmokeAlarm className="size-[1.5rem]" />, label: "Smoke alarm"},
        "Carbon monoxide alarm":{icon:<CarbonMonoxideAlarm className="size-[1.5rem]" />, label: "Carbon monoxide alarm"},
      }
    }
  };

export function AmenitiesSelector({ selectedAmenities, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(amenity) {
    if (selectedAmenities.includes(amenity)) {
      onChange(selectedAmenities.filter((a) => a !== amenity));
    } else {
      onChange([...selectedAmenities, amenity]);
    }
  }

  function isActive(amenity) {
    return selectedAmenities.includes(amenity);
  }

  

  function AmenityButton({ amenity, icon, label }) {
    return <FilterButton isActive={isActive(amenity)} onClick={() => handleChange(amenity)}>
      <div className="flex items-center gap-2 p-1">
        {icon}{label}
      </div>
    </FilterButton>
  }


  return <>
    <div className="text-gray-800">
      {isOpen && <div className="font-semibold  text-lg mt-3 mb-2">Popular</div>}
      <div className="flex flex-wrap gap-2" >
        {Object.keys(amenityList.popular).map((key) => {
          const amenity = amenityList.popular[key];
          return <AmenityButton key={amenity.label} amenity={key} icon={amenity.icon} label={amenity.label} />
        }
        )}
      </div>
      {isOpen && <div>
        {Object.keys(amenityList.all).map((category) => (
          <div key={category}>
            <div className="font-semibold text-lg mt-3 mb-2">{category}</div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(amenityList.all[category]).map((key) => {
                const amenity = amenityList.all[category][key];
                return <AmenityButton key={amenity.label} amenity={key} icon={amenity.icon} label={amenity.label} />
              })}
            </div>
          </div>
        ))}
      </div>}
      <div className="flex gap-2 items-center pt-5 text-gray-700 hover:cursor-pointer hover:text-gray-900" onClick={() => setIsOpen((prev) => !prev)}>
        <span className="font-semibold underline">{isOpen ? 'Show less' : 'Show more'}</span>
        {isOpen ? <ChevronUp className="size-[1.3rem]"/> : <ChevronDown className="size-[1.3rem]" />}
      </div>
    </div>
  </>
}