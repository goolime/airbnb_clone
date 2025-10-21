import { ListPreview } from "../components/preview/list"
import { property } from "../../templates/property.js"
import { AppMap } from "../components/AppMap.jsx"
import { getTownsPreviews } from "../actions/explore.actions.js"
import { useEffect, useState } from "react"

export function SearchPage() {
    const properties = [property, property, property, property, property, property, property, property, property, property, property, property, property, property, property, property, property, property]
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {

        getTownsPreviews().then(results => {
            setSearchResults(results);
        });

    }, []);


    return (
        <div className="grid grid-cols-2">
            <div className="px-12 py-5">
                <span className="font-semibold my-5">Over 1,000 homes</span>
                <ListPreview properties={properties} />
            </div>
            <div className="sticky top-0 h-screen py-5">
                <AppMap searchResults={searchResults} />
            </div>
        </div>
    )

}