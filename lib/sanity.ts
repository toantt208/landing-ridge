import { createClient } from '@sanity/client'

// Server-side Sanity client with write permissions (only use on server)
export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false, // Use fresh data for uploads
})
