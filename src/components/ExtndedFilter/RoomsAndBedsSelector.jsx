import { useState, useEffect } from "react";
import { FilterCounter } from "./FilterCounter.jsx";

export function RoomsAndBedsSelector({ rooms, beds, bathrooms, onChange }) {
  const [roomsCount, setRoomsCount] = useState(rooms);
  const [bedsCount, setBedsCount] = useState(beds);
  const [bathroomsCount, setBathroomsCount] = useState(bathrooms);

  useEffect(() => {
    onChange('bedrooms', roomsCount);
  }, [roomsCount]);

  useEffect(() => {
    onChange('beds', bedsCount);
  }, [bedsCount]);

  useEffect(() => {
    onChange('bathrooms', bathroomsCount);
  }, [bathroomsCount]);

  return <>
    <FilterCounter label="Rooms" count={roomsCount} onChange={setRoomsCount} />
    <FilterCounter label="Beds" count={bedsCount} onChange={setBedsCount} />
    <FilterCounter label="Bathrooms" count={bathroomsCount} onChange={setBathroomsCount} />
  </>
}