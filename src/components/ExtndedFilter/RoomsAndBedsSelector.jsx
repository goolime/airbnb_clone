import { useState, useEffect } from "react";
import { FilterCounter } from "./FilterCounter.jsx";

export function RoomsAndBedsSelector({filter, onChange }) {
  const [roomsCount, setRoomsCount] = useState(filter.bedrooms);
  const [bedsCount, setBedsCount] = useState(filter.beds);
  const [bathroomsCount, setBathroomsCount] = useState(filter.bathrooms);

  // console.log('RoomsAndBedsSelector render with filter:', filter, 'roomsCount:', roomsCount, 'bedsCount:', bedsCount, 'bathroomsCount:', bathroomsCount);

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
    setRoomsCount(filter.bedrooms);
    setBedsCount(filter.beds);
    setBathroomsCount(filter.bathrooms);
  }, [filter]);

  return <>
    <FilterCounter label="Rooms" count={roomsCount} onChange={setRoomsCount} />
    <FilterCounter label="Beds" count={bedsCount} onChange={setBedsCount} />
    <FilterCounter label="Bathrooms" count={bathroomsCount} onChange={setBathroomsCount} />
  </>
}