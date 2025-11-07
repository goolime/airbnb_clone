import axios from 'axios';

const API_KEY = '690c605f72582180913065exz99364a'; // Please replace with your actual API key if needed
const GEOCODING_API_URL = 'https://geocode.maps.co/search';

export async function getCordinates(location) {
    try {
        const locForQuery={street: location.address, city: location.city, country: location.countryCode, api_key: API_KEY};
        const response = await axios.get(GEOCODING_API_URL, { params: locForQuery });
        if (response.data.length === 0) {
            throw new Error('No coordinates found for the given location');
        }
        return {...location, lat: parseFloat(response.data[0].lat), lng: parseFloat(response.data[0].lon) };
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}
