const { DEV, VITE_LOCAL } = import.meta.env

import { propertiesService as local } from './properties.service.local.js'
import { propertiesService as remote } from './properties.service.remote.js'
import { propertiesUtil as util } from './properties.util.js'

const propertiesServiceToUse = VITE_LOCAL === 'true' ? local : remote

export const propertiesService = {
    ...propertiesServiceToUse,
    ...util

}

if (DEV) window.propertiesService = propertiesService
