import { useState } from "react";
import { ChevronDown, ChevronUp } from "../util/Icons.jsx";
import { eventBusService } from '../../services/event-bus.service.js'
import { PropertyTypeSelector } from "./PropertyTypeSelector.jsx";
import { RoomsAndBedsSelector } from "./RoomsAndBedsSelector.jsx";
import { AmenitiesSelector } from "./AmenetiesSelector.jsx";
import { BookingOptionsSelector } from "./BookingOptionsSelector.jsx";
import { UserInteruction } from "../util/UserInteruaction.jsx";
import { StandoutStaysSelector } from "./StandoutStaysSelector.jsx";
import { PropertyTypesSelector } from "./PropertyTypesSelector.jsx";

export function ExtendedFilter({ filter }) {
  const [isExtendedFilterOpen, setIsExtendedFilterOpen] = useState(false);
  const [localFilter, setLocalFilter] = useState({ ...filter });

  function handleFilterChange(field, value) {
    console.log('Field changed:', field, 'New value:', value);
    setLocalFilter((prevFilter) => ({
      ...prevFilter,
      [field]: value,
    }));
  }
  
  eventBusService.on('show-extended-filter', () => {
    setIsExtendedFilterOpen(true);
  });

  return <>
  <UserInteruction mobileHeight="95%" isOpen={isExtendedFilterOpen} onClose={() => setIsExtendedFilterOpen(false)} className="!p-0">
    <div className="grid grid-cols-[1rem_1fr_1rem]">
      <div className="w-[100%] col-span-full font-semibold text-xl text-gray-800 text-center border-b border-gray-300"> Filter </div>
      <div className="col-start-2 col-end-4 overflow-y-scroll max-h-[80vh] sm:max-h-[65vh] pr-[1rem] flex flex-col">
        <FilterSection title="Type of place " >
          <PropertyTypeSelector selectedType={localFilter.type} onChange={(newTypes) => handleFilterChange('type', newTypes)} />
        </FilterSection>
        <FilterSection title="Price Range" >
          <div> place holder</div>
        </FilterSection>
        <FilterSection title="Rooms and beds" >
          <RoomsAndBedsSelector
            rooms={localFilter.bedrooms}
            beds={localFilter.beds}
            bathrooms={localFilter.bathrooms}
            onChange={handleFilterChange}
          />
        </FilterSection>
        <FilterSection title="Amenities" >
          <AmenitiesSelector
            selectedAmenities={localFilter.amenities || []}
            onChange={(newAmenities) => handleFilterChange('amenities', newAmenities)}
          />
        </FilterSection>
        <FilterSection title="Booking options" >
          <BookingOptionsSelector 
            selectedAmenities={localFilter.amenities || []}
            onChange={(newAmenities) => handleFilterChange('amenities', newAmenities)}
          />
        </FilterSection>
        <FilterSection title="Standout stays" >
          <StandoutStaysSelector
            selectedStands={localFilter.standouts || []}
            onChange={(newStands) => handleFilterChange('standouts', newStands)}
          />
        </FilterSection>
        <FilterColapsable title="Property Type" >
          <PropertyTypesSelector
            selectedTypes={localFilter.types || []}
            onChange={(newTypes) => handleFilterChange('types', newTypes)}
          />
        </FilterColapsable>
        <FilterColapsable title="Accessibility features" className="!border-none">
          <div> place holder</div>
        </FilterColapsable>
      </div>
      <div className="w-[100%] col-span-full font-semibold text-xl text-gray-800 text-center border-t border-gray-300 flex justify-between items-center px-4 py-2">
        <button className="text-gray-700 hover:bg-gray-200 p-2 rounded-lg text-lg duration-300">Clear all</button>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg mb-4 mt-2 hover:bg-gray-950 duration-300">Show places</button>
      </div>
    </div>
  </UserInteruction>
  </>
}

function FilterSection({title,className , children}) {
  return <div className={`${className} border-b border-gray-300 py-5`}>
      <h2 className="font-semibold text-lg mb-3">{title}</h2>
      <div className="pb-4">{children}</div>
    </div>
}

function FilterColapsable({className,title, children}) {
  const [isOpen, setIsOpen] = useState(false);

  return <>
    <div className={`${className} border-b border-gray-300 py-5`}>
      <div className="flex justify-between items-center" onClick={() => setIsOpen((currentState) => !currentState)}>
        <h2 className="font-semibold text-lg mb-3">{title}</h2>
        {isOpen ? <ChevronUp className="size-[1.3rem]"/> : <ChevronDown className="size-[1.3rem]" />}
      </div>
      <div className={`${isOpen ? '' : 'hidden'}`}>
        {children}
      </div>
    </div>
  </>
}