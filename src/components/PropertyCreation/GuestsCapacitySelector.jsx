import { useEffect, useState } from "react";
import { PropertyCounter } from "./PropertyCounter.jsx";

export function GuestsCapacitySelector({ capacity, onChange }) {
  const [adultsCount, setAdultsCount] = useState(capacity.adults);
  const [kidsCount, setKidsCount] = useState(capacity.kids);
  const [infantsCount, setInfantsCount] = useState(capacity.infants);
  const [petsCount, setPetsCount] = useState(capacity.pets);

  console.log('GuestsCapacitySelector render with filter:', capacity, 'adultsCount:', adultsCount, 'kidsCount:', kidsCount, 'infantsCount:', infantsCount, 'petsCount:', petsCount);

  useEffect(() => {
    onChange({ adults: adultsCount, kids: kidsCount, infants: infantsCount, pets: petsCount });
  }, [adultsCount, kidsCount, infantsCount, petsCount]);

  useEffect(() => {
    setAdultsCount(capacity.adults);
    setKidsCount(capacity.kids);
    setInfantsCount(capacity.infants);
    setPetsCount(capacity.pets);
  }, [capacity]);

  return <>
    <PropertyCounter label="Adults" count={adultsCount} onChange={setAdultsCount} min={1} />
    <PropertyCounter label="Kids" count={kidsCount} onChange={setKidsCount} min={0} />
    <PropertyCounter label="Infants" count={infantsCount} onChange={setInfantsCount} min={0} />
    <PropertyCounter label="Pets" count={petsCount} onChange={setPetsCount} min={0} />
  </>
}