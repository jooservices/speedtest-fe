/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getLatestDownload = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/latest-download-speed`,
  }

  return httpRequest.get(obj)
}

const getLatestUpload = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/latest-upload-speed`,
  }

  return httpRequest.get(obj)
}

const ping = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}`,
  }

  return httpRequest.get(obj)
}

export { getLatestDownload, getLatestUpload, ping }
