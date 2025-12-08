import { AppHeader } from "./components/AppHeader.jsx"
import { Routes, Route, HashRouter, BrowserRouter } from 'react-router'
import { ExplorePage } from "./pages/explorePage.jsx"
import { SearchPage } from "./pages/SearchPage.jsx"
import { AppFooter } from "./components/AppFooter.jsx"
import { useEffect } from "react"
import { setDemoData } from "./services/demo-data.service.js"
import { Test } from "./pages/Test.jsx"
import { ServiceAnimalInfo } from "./components/ServiceAnimalInfo.jsx"
import { ProfilePage } from "./pages/ProfilePage.jsx"
import { PropertyDetails } from "./pages/PropertyDetails.jsx"
import { Reservation } from "./pages/Reservation.jsx"
import { UserData } from "./components/profile/UserData.jsx"
import { PropertyOrders } from "./components/profile/PropertyOrders.jsx"
import { UserProperties } from "./components/profile/UserProperties.jsx"
import { UserOrders } from "./components/profile/UserOrders.jsx"

const Router = BrowserRouter

function App() {

  useEffect(() => {
    document.title = "Airdnd"
    setDemoData()
  }, [])

  return (
    <>
      <ServiceAnimalInfo />
      <Router>
        <section className="flex flex-col min-h-screen">
          <AppHeader />
          <div className="grid grid-cols-[5px_minmax(0,_1fr)_5px] sm:grid-cols-[1rem_minmax(0,_1fr)_1rem] xl:grid-cols-[1fr_1393px_1fr] w-100%">
            <div className="col-start-1 col-span-3 md:col-span-1 md:col-start-2">
              <Routes>
                <Route path="/" element={<ExplorePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/rooms/:propertyId" element={<PropertyDetails />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/reservation/:propertyId" element={<Reservation />}/>
                <Route path="/profile" element={<ProfilePage />}>
                  <Route path="/profile/user" element={<UserData />} />
                  <Route path="/profile/orders" element={<PropertyOrders />} />
                  <Route path="/profile/properties" element={<UserProperties />} />
                  <Route path="/profile/myorders" element={<UserOrders />} />
                </Route>

                <Route path="/test" element={<Test />} />
              </Routes>
            </div>
          </div>
          <AppFooter />
        </section>
      </Router>
      
    </>
  )
}

export default App
