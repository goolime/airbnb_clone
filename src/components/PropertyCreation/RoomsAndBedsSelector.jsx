import { useState, useEffect } from "react";
import { PropertyCounter } from "./PropertyCounter.jsx";

export function RoomsAndBedsSelector({ property, onChange }) {
  const [roomsCount, setRoomsCount] = useState(property.bedrooms);
  const [bedsCount, setBedsCount] = useState(property.beds);
  const [bathroomsCount, setBathroomsCount] = useState(property.bathrooms);

  //console.log('RoomsAndBedsSelector render with filter:', property, 'roomsCount:', roomsCount, 'bedsCount:', bedsCount, 'bathroomsCount:', bathroomsCount);

  useEffect(() => {
    onChange('bedrooms', roomsCount);
  }, [roomsCount]);

  useEffect(() => {
    onChange('beds', bedsCount);
  }, [bedsCount]);

  useEffect(() => {
    onChange('bathrooms', bathroomsCount);
  }, [bathroomsCount]);

  useEffect(() => {
    setRoomsCount(property.bedrooms);
    setBedsCount(property.beds);
    setBathroomsCount(property.bathrooms);
  }, [property]);

  return <>
    <PropertyCounter label="Rooms" count={roomsCount} onChange={setRoomsCount} min={1} />
    <PropertyCounter label="Beds" count={bedsCount} onChange={setBedsCount} min={1} />
    <PropertyCounter label="Bathrooms" count={bathroomsCount} onChange={setBathroomsCount} min={1} />
  </>
}