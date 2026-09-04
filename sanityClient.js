import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'co6c4i1n',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export async function getSermons() {
  return await client.fetch(`*[_type == "sermon"] | order(date desc) {
    _id,
    title,
    speaker,
    date,
    driveUrl,
    summary
  }`)
}

export async function getEvents() {
  return await client.fetch(`*[_type == "event"] | order(date asc) {
    _id,
    title,
    date,
    location,
    description,
    "imageUrl": image.asset->url
  }`)
}

export async function getSermonsPageHero() {
  return await client.fetch(`*[_type == "sermonsPage"][0]{
    heroSubtitle,
    heroTitle,
    heroDescription
  }`)
}