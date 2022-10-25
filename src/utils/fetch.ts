import { merge } from 'lodash'

const queryString = (params: object) => {
  const s = Object.keys(params)
    .map((key) =>
      [key, params[key as keyof typeof params]]
        .map(encodeURIComponent)
        .join('='),
    )
    .join('&')
  return s ? `?${s}` : ''
}

type FetchOptions = Omit<RequestInit, 'body'> & {
  // headers?: { [key: string]: string | undefined }
  params?: { [key: string]: number | string | undefined }
}

export const get = async (
  url: string,
  { params = {}, ...options }: FetchOptions = {},
) => {
  const args = merge(
    {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    },
    options,
  )

  const response = await fetch(url + queryString(params), args)

  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()

  return data
}

export const post = async (
  url: string,
  { params = {}, ...options }: FetchOptions = {},
) => {
  const args = merge(
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(params),
    },
    options,
  )

  const response = await fetch(url, args)

  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()

  return data
}
