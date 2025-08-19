/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'
import { buildSearchParams } from 'utils/helper'

const getSpeedtest = (params: {}): Promise<any> => {

  const searchParams = buildSearchParams(params)

  const obj = {
    url: `${ENDPOINT}/speedtest?${searchParams}`,
  }

  return httpRequest.get(obj)
}

const executeSpeedtest = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/speedtest`,
    method: 'POST',
  }

  return httpRequest.post(obj)
}

const getMyIp = (): Promise<any> => {
  const obj = {
    url: `${ENDPOINT}/speedtest/requestIp`,
  }

  return httpRequest.get(obj)
}

export { getSpeedtest, executeSpeedtest, getMyIp }
