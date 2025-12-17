import { propertiesService } from "../services/properties/index.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInteruction } from "./util/UserInteruaction.jsx";
import { AmenitiesSelector } from "./ExtndedFilter/AmenetiesSelector.jsx";
import { eventBusService } from "../services/event-bus.service.js";
import { AccessibilityFeaturesSelector } from "./ExtndedFilter/AccessibilityFeaturesSelector.jsx";
import { BookingOptionsSelector } from "./ExtndedFilter/BookingOptionsSelector.jsx";
import { PropertyBaiscsForm } from "./PropertyCreation/PropertyBaiscsForm.jsx";
import { RoomsAndBedsSelector } from "./PropertyCreation/RoomsAndBedsSelector.jsx"
import { GuestsCapacitySelector } from "./PropertyCreation/GuestsCapacitySelector.jsx";
import { PriceSelector } from "./PropertyCreation/PriceSelector.jsx";
import { usersService } from "../services/users/index.js";
import { store } from "../store/store.js";
import { getPictures } from "../services/demo-data.service.js";
import { getCordinates } from "../actions/property.actions.js";

export function PropertyCreation() {
  const [isPropertyCreationOpen, setIsPropertyCreationOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({ ...propertiesService.getEmptyProperty() });
  const navigate = useNavigate();

  function handlePropertyChange(field, value) {
    //console.log('Field changed:', field, 'New value:', value);
    setNewProperty((prevProperty) => ({
      ...prevProperty,
      [field]: value,
    }));
  }

  function handleAmenitiesChange(amenities) {
    const isPetsAllowed = amenities.includes('Pets allowed');
    if (isPetsAllowed && newProperty.capacity.pets === 0) {
      setNewProperty((prevProperty) => ({
        ...prevProperty,
        amenities: amenities,
        capacity: {
          ...prevProperty.capacity,
          pets: 1,
        },
      }));
    } else if (!isPetsAllowed) {
      setNewProperty((prevProperty) => ({
        ...prevProperty,
        capacity: {
          ...prevProperty.capacity,
          pets: 0,
        },
        amenities: amenities,
      }));
    }
    else {
      setNewProperty((prevProperty) => ({
        ...prevProperty,
        amenities: amenities,
      }));
    }
  }

  function handleCapacityChange(capacity) {
    const isPetsAllowed = newProperty.amenities.includes('Pets allowed');
    if (capacity.pets > 0 && !isPetsAllowed) {
      setNewProperty((prevProperty) => ({
        ...prevProperty,
        amenities: [...prevProperty.amenities, 'Pets allowed'],
        capacity: capacity,
      }));
    } else if (capacity.pets === 0) {
      setNewProperty((prevProperty) => ({
        ...prevProperty,
        amenities: [...prevProperty.amenities.filter(am => am !== 'Pets allowed')],
        capacity: capacity,
      }));
    }
    else {
      setNewProperty((prevProperty) => ({
        ...prevProperty,
        capacity: capacity,
      }));
    }
  }

  eventBusService.on('show-property-creation', () => {
    setIsPropertyCreationOpen(true);
  });

  async function createProperty() {
    const propertyToSave = {
      ...newProperty,
      host: usersService.getHost(store.getState().userModule.loggedInUser),
      imgUrls: getPictures(Math.ceil(Math.random() * 5) + 3), // Assign random pictures for demo purposes
      loc: await getCordinates(newProperty.loc)
    };
    propertiesService.save(propertyToSave).then((savedProperty) => {
      usersService.setNewPropertyToHost(savedProperty._id, store.getState().userModule.loggedInUser._id);
      navigate({ pathname: `/rooms/${savedProperty._id}` });
      setIsPropertyCreationOpen(false);
    }).catch((err) => {
      console.error('Error saving property:', err);
    });
  }

  console.log('New Property State:', newProperty);

  return <>
    <UserInteruction mobileHeight="95%" isOpen={isPropertyCreationOpen} onClose={() => setIsPropertyCreationOpen(false)} className="!p-0 sm:h-[81%]">
      <div className="grid grid-cols-[1rem_1fr_1rem]">
        <div className="w-[100%] col-span-full font-semibold text-xl text-gray-800 text-center border-b border-gray-300 pb-2"> List New Property </div>
        <div className="col-start-2 col-end-4 overflow-y-scroll max-h-[80vh] sm:max-h-[64vh] pr-[1rem] flex flex-col">
          <PropertySection title="Basic Information">
            <div className="w-full flex flex-col items-center">
              <PropertyBaiscsForm property={newProperty} onChange={handlePropertyChange} />
            </div>
            {/* name, type, summary, location */}
          </PropertySection>
          <PropertySection title="Photos">
            <div> place holder for property creation form</div>
          </PropertySection>
          <PropertySection title="Property Details">
            <RoomsAndBedsSelector onChange={handlePropertyChange} property={newProperty} />
          </PropertySection>
          <PropertySection title="Guests Capacity">
            <GuestsCapacitySelector onChange={handleCapacityChange} capacity={newProperty.capacity} />
          </PropertySection>
          <PropertySection title="Pricing Information">
            <div className="w-full flex flex-col items-center">
              <div className="relative  text-sm text-gray-500 ">All prices must include all taxes and fees</div>
              <PriceSelector onChange={(price) => handlePropertyChange('price', price)} price={newProperty.price} />
            </div>
          </PropertySection>
          <PropertySection title="Amenities">
            <AmenitiesSelector onChange={handleAmenitiesChange} selectedAmenities={newProperty.amenities} />
            {/* amenities */}
          </PropertySection>
          <PropertySection title="House Rules" >
            <BookingOptionsSelector onChange={handleAmenitiesChange} selectedAmenities={newProperty.amenities} />
            {/* rules */}
          </PropertySection>
          <PropertySection title="Accessibility" >
            <AccessibilityFeaturesSelector onChange={(value) => handlePropertyChange('accessibility', value)} selectedFeatures={newProperty.accessibility} />
            {/* accessibility options */}
          </PropertySection>

        </div>
        <div className="w-[100%] col-span-full font-semibold text-xl text-gray-800 text-center border-t border-gray-300 flex justify-between items-center px-4 py-2">
          <button className="text-gray-700 hover:bg-gray-200 p-2 rounded-lg text-lg duration-300" onClick={() => setNewProperty({ ...propertiesService.getEmptyProperty() })}>Clear all</button>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg mb-4 mt-2 hover:bg-gray-950 duration-300" onClick={createProperty}>Register Property</button>
        </div>
      </div>
    </UserInteruction>
  </>
}

function PropertySection({ title, className, children }) {
  return <div className={`${className} border-b border-gray-300 py-5`}>
    <h2 className="font-semibold text-lg mb-3">{title}</h2>
    <div className="pb-4">{children}</div>
  </div>
}