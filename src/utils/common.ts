export const shuffle = <T>(arr: T[]): T[] =>
  [...arr].sort(() => 0.5 - Math.random())

export const buildUrl = (url: string, params: object) => {
  let urlWithParams = url

  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? '?' : '&'
    urlWithParams += `${sign}${key}=${value}`
  })

  return urlWithParams
}

export const sumBy = (arr: number[]) => arr.reduce((prev, cur) => prev + cur, 0)
