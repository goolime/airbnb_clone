import { property } from "../templates/property.js"
import { AppHeader } from "./components/AppHeader.jsx"
import { TownPreview } from "./components/preview/town.jsx"

function App() {


  return (
    <>
      <section className="">
        <AppHeader />
        <div>
          <TownPreview idx={0} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
          <TownPreview idx={1} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
          <TownPreview idx={2} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
          <TownPreview idx={3} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
          <TownPreview idx={4} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
          <TownPreview idx={5} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
          <TownPreview idx={6} name="Tel-Aviv" properties={[property,property,property,property,property,property,property,property]}/>
        </div>
      </section>
    </>
  )
}

export default App
