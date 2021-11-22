import { SITE_URL } from "lib/constants"

export const getMediaURL = (url?: string) => {
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('//')) return url
  return `${SITE_URL}${url}`
}