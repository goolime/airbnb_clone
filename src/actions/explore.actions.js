import { propertiesService } from "../services/properties.service.js";
import { reduceList } from "../services/util.service.js"


const citys=[{ countryCode: 'US', city: 'New York', minLat: 40.4774, maxLat: 40.9176, minLng: -74.2591, maxLng: -73.7004 },
             { countryCode: 'FR', city: 'Paris', minLat: 48.8156, maxLat: 48.9022, minLng: 2.2241, maxLng: 2.4699 },
             { countryCode: 'JP', city: 'Tokyo', minLat: 35.5285, maxLat: 35.8395, minLng: 139.6100, maxLng: 139.9100 },
             { countryCode: 'AU', city: 'Sydney', minLat: -34.1183, maxLat: -33.5781, minLng: 150.5209, maxLng: 151.3430 },
             { countryCode: 'BR', city: 'Rio de Janeiro', minLat: -23.0827, maxLat: -22.7468, minLng: -43.7955, maxLng: -43.0900 },
             { countryCode: 'ZA', city: 'Cape Town', minLat: -34.2580, maxLat: -33.7900, minLng: 18.3554, maxLng: 18.7034 },
             { countryCode: 'IT', city: 'Rome', minLat: 41.7690, maxLat: 42.0092, minLng: 12.3959, maxLng: 12.8555 },
             { countryCode: 'CA', city: 'Toronto', minLat: 43.5810, maxLat: 43.8555, minLng: -79.6393, maxLng: -79.1152 },
             { countryCode: 'IN', city: 'Mumbai', minLat: 18.8920, maxLat: 19.2710, minLng: 72.7754, maxLng: 72.9860 },
             { countryCode: 'GB', city: 'London', minLat: 51.2868, maxLat: 51.6919, minLng: -0.5103, maxLng: 0.3340 },
             { countryCode: 'DE', city: 'Berlin', minLat: 52.3383, maxLat: 52.6755, minLng: 13.0884, maxLng: 13.7611 },
             { countryCode: 'ES', city: 'Barcelona', minLat: 41.3200, maxLat: 41.4690, minLng: 2.0520, maxLng: 2.2280 },
             { countryCode: 'NL', city: 'Amsterdam', minLat: 52.3396, maxLat: 52.5000, minLng: 4.8342, maxLng: 5.1000 },
             { countryCode: 'MX', city: 'Mexico City', minLat: 19.2041, maxLat: 19.5926, minLng: -99.3633, maxLng: -99.0421 },
             { countryCode: 'RU', city: 'Moscow', minLat: 55.4500, maxLat: 55.9500, minLng: 37.3000, maxLng: 37.8000 },
             { countryCode: 'KR', city: 'Seoul', minLat: 37.4133, maxLat: 37.7151, minLng: 126.7341, maxLng: 127.1022 },
             { countryCode: 'ISR', city: 'Tel Aviv', minLat: 32.0150, maxLat: 32.1500, minLng: 34.7500, maxLng: 34.9000 },
             { countryCode: 'TR', city: 'Istanbul', minLat: 40.8500, maxLat: 41.2000, minLng: 28.7000, maxLng: 29.3000 },
             { countryCode: 'SE', city: 'Stockholm', minLat: 59.2000, maxLat: 59.4500, minLng: 17.8000, maxLng: 18.2000 },
             { countryCode: 'CH', city: 'Zurich', minLat: 47.3200, maxLat: 47.4500, minLng: 8.4500, maxLng: 8.6500 }
]

export async function getTownsPreviews(){
    const selectedCitys=reduceList(citys,7)
    const ans=[]
    for (let i = 0; i < selectedCitys.length; i++) {
        const cityProperties = await propertiesService.getPropertiesByCity(selectedCitys[i])
        ans.push({city: selectedCitys[i], properties: cityProperties})
    }
    return ans
}