import React from 'react'

const queryString = (params: {}) => {
  const s = Object.keys(params)
    .map((key) => [key, params[key]].map(encodeURIComponent).join('='))
    .join('&')
  return s ? `?${s}` : ''
}

const get = async (url: string, params: {}) => {
  const response = await fetch(url + queryString(params), {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()

  return data
}

const post = async (url: string, params: {}) => {
  const response = await fetch(url + queryString(params), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()

  return data
}

export const useSignin = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [data, setData] = React.useState<{ token: string }>()

  const signin = React.useCallback(async (email: string, password: string) => {
    setError(false)
    setLoading(true)
    setData(undefined)

    try {
      const response: typeof data = await post(
        'https://api2.gettoby.com/v2/users/login',
        { email, password },
      )

      setData(response)
      setLoading(false)

      return response
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }, [])

  return { signin, data, loading, error }
}
