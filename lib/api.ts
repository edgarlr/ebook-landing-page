import jsonResponse from './data.json'

export function getAllEbooks() {
  return jsonResponse
}

export function getEbookBySlug(slug?: string) {
  const [ebook] = jsonResponse.filter(ebook => ebook.slug === slug)
  return ebook ?? {}
}