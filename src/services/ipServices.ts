/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'
import { buildSearchParams } from 'utils/helper'
import { TableParams } from 'routes/SitePage'

const getIps = (params: TableParams): Promise<any> => {
  const { current, pageSize } = params?.pagination || {}

  const mappedParams = {
    offset: current ? (current - 1) * (pageSize || 10) : 0,
    limit: pageSize,
  }

  const searchParams = buildSearchParams(mappedParams)

  const obj = {
    url: `https://jsonplaceholder.typicode.com/posts?${searchParams}`,
  }

  return httpRequest.get(obj)
}

export { getIps }
