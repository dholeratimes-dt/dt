// Import the data client directly. The next-sanity barrel also registers live
// preview client components that published pages do not need to download.
import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
