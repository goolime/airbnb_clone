import { property } from "../templates/property.js"
import { AppHeader } from "./components/AppHeader.jsx"
import { TownPreview } from "./components/preview/town.jsx"

function App() {


  return (
    <>
      <section className="">
        <AppHeader />
        <div className="grid grid-cols-[5px_minmax(0,_1fr)_5px] sm:grid-cols-[1rem_minmax(0,_1fr)_1rem] xl:grid-cols-[1fr_1393px_1fr] w-100%">
          <div className="col-start-2 col-span-2 sm:col-span-1 sm:col-start-2">
            <TownPreview idx={0} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
            <TownPreview idx={1} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
            <TownPreview idx={2} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
            <TownPreview idx={3} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
            <TownPreview idx={4} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
            <TownPreview idx={5} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
            <TownPreview idx={6} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
