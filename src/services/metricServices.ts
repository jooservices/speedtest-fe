/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getLatestDownload = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/latest-download-speed`,
  }

  return httpRequest.get(obj)
}

const getSpeedtestLatest = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/speedtest/latest`,
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

const getCharts = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/speedtest`,
  } as any

  return httpRequest.get(obj)
}

const executeSpeedtest = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/speedtest`,
    method: 'POST',
  }

  return httpRequest.post(obj)
}

export { getLatestDownload, getLatestUpload, ping, getCharts, getSpeedtestLatest, executeSpeedtest }
