/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'
import { buildSearchParams } from 'utils/helper'
import { TableParams } from 'routes/SitePage'

const getSites = (params: TableParams): Promise<any> => {
  const { current, pageSize } = params?.pagination || {}

  const mappedParams = {
    offset: current ? (current - 1) * (pageSize || 10) : 0,
    limit: pageSize,
  }

  const searchParams = buildSearchParams(mappedParams)

  const obj = {
    // url: `${ENDPOINT}/speedtest?${searchParams}`,
    url: `https://pokeapi.co/api/v2/ability?${searchParams}`,
  }

  return httpRequest.get(obj)
}

export { getSites }
