import { ListPreview } from "../components/preview/list"
import { property } from "../../templates/property.js"
import { useSearchParams } from "react-router"
import { useEffect,useState } from "react"
import { propertiesService } from "../services/properties.service.js"
import { getProperties } from "../actions/explore.actions.js"

export function SearchPage(){
    const [searchParams,setSearchParams] = useSearchParams()
    const [filterData, setFilterData] = useState(null)
    const [properties, setProperties] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const filter = propertiesService.getFilterFromSearchParams(searchParams)
        setFilterData(filter)
    },[searchParams])

    useEffect(()=>{
        if (!filterData) return
        getProperties(filterData, 1).then(({newProperties, newMaxPage})=>{
            setPage(1)
            setProperties(newProperties)
            setMaxPage(newMaxPage)
            setLoading(false)
        })
    },[filterData])

    if (loading) return <div>Loading...</div>
    return <div>
        <ListPreview properties={properties} />
    </div>
}