import { AppHeader } from "./components/AppHeader.jsx"
import { Routes, Route , HashRouter, BrowserRouter } from 'react-router'
import { ExpolorePage } from "./pages/explorePage.jsx"

const Router =  BrowserRouter

function App() {


  return (
    <>
      <Router>
        <section className="">
          <AppHeader />
          <div className="grid grid-cols-[5px_minmax(0,_1fr)_5px] sm:grid-cols-[1rem_minmax(0,_1fr)_1rem] xl:grid-cols-[1fr_1393px_1fr] w-100%">
            <div className="col-start-1 col-span-3 sm:col-span-1 sm:col-start-2">
              <Routes>
                <Route path="/" element={<ExpolorePage />} />
              </Routes>
            </div>
          </div>
        </section>
      </Router>
    </>
  )
}

export default App
