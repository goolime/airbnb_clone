export function getLocationString({ countryCode, city, maxLat, minLat, maxLng, minLng }) {
    if (city !== '') return city;
    if (maxLat != 90 && minLat != -90 && maxLng != 180 && minLng != -180) return 'Homes in map area';
    return "I'm flexible";
}

export function getDatesString({ from, to }) {

    if (from === null || to === null) return 'Add dates';
    if (from.getYear() === to.getYear()) {
        if (from.getMonth() === to.getMonth()) {
            return `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${to.toLocaleDateString('en-US', { day: 'numeric' })}`;
        }
        else {
            return `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        }
    }
    else {
        return `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${to.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
}

export const guestStringLength = Object.freeze({
    SHORT: 'short',
    LONG: 'long',
})

export function getGuestsString({ adults, kids, infants, pets }, length) {
    if (adults + kids + infants + pets === 0) return 'Add guests';
    const guests = adults + kids;
    switch (length) {
        case guestStringLength.SHORT:
            return `${guests === 16 ? `${guests}+` : guests} guest`;
        case guestStringLength.LONG:
            return `${guests === 16 ? `${guests}+` : guests} guests${infants > 0 ? `, ${infants} infant${infants > 1 ? 's' : ''}` : ''}${pets > 0 ? `, ${pets} pet${pets > 1 ? 's' : ''}` : ''}`;
    }
}