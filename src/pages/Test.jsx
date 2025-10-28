import {  FilterIcon } from "../components/util/Icons";
import { useState } from "react";
import { showLoginModal, showExtendedFilter } from "../services/event-bus.service.js";
import { AppearOnURL } from "../components/util/AppearOnURL.jsx";
import { propertiesService } from "../services/properties.service.js";
import { UserLogin } from "../components/UserLogin.jsx";
import { useNavigate } from "react-router";




export  function Test() {
  const [filterData, setFilterData] = useState(propertiesService.getDefaultFilter());
  const navigate = useNavigate()

  return (
    <div>
      <h1>Test Page</h1>
      
      {/* Go to Header - change to "/search" */}
      <AppearOnURL pathName="/test">
        <button onClick={() => showExtendedFilter() } className="p-2 rounded-full hover:bg-gray-100 hover:scale-110 duration-300 ">
          <FilterIcon className="h-6 w-6 text-gray-500 " />
        </button>
      </AppearOnURL>

      <button onClick={() => showLoginModal() } className="p-2 rounded-full hover:bg-gray-100 hover:scale-110 duration-300 "> Login </button>
      <button onClick={()=> navigate('/profile')} className="p-2 rounded-full hover:bg-gray-100 hover:scale-110 duration-300 "> Profile Page </button>

      
    </div>
  )
}













