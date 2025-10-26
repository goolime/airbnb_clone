import { FilterButton } from "./FilterButton.jsx";
import { SelfCheckIn, FreeCancellation, Pet } from "../../components/util/Icons.jsx";

export function BookingOptionsSelector({ selectedAmenities, onChange }) {
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
    <div className="flex flex-wrap gap-2" >
      <AmenityButton amenity="Self check-in" icon={<SelfCheckIn className="size-[1.5rem]" />} label="Self check-in" />
      <AmenityButton amenity="free cancellation" icon={<FreeCancellation className="size-[1.5rem]" />} label="Free cancellation" />
      <AmenityButton amenity="Pets allowed" icon={<Pet className="size-[1.5rem]" />} label="Pets allowed" />
    </div>
  </>
}