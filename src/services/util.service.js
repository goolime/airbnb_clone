export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS
}

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color' ,'of nature', 'tuned', 'to', 'a live channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)]
        if (size >= 1 ) txt += ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function animateCSS(el, animation, options = {}) {
    
    const { isRemoveClass = true } = options

    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)

        function handleAnimationEnd(event) {
            event.stopPropagation()
            if (isRemoveClass) el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}


export function debounce(func, delay) {
    let timeoutId

    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}


export function getExistingProperties(obj) {
    const truthyObj = {}
    for (const key in obj) {
        const val = obj[key]
        if (val || typeof val === 'boolean') {
            truthyObj[key] = val
        }
    }
    return truthyObj
}

export function calculateRating(reviews) {
    if (!reviews || !reviews.length) return 'New'
    const rating = reviews.reduce((acc, curr) => acc + curr.rate, 0) / reviews.length
    return rating.toFixed(1)
}

export function reduceList(list, num){
    const lis = [...list]
    for (let i = lis.length - 1; i >= num; i--) {
        const number = Math.floor(Math.random() * lis.length);
        lis.splice(number, 1);    
    }
    return lis
}

