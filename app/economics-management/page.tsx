import { allKnowledge } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Main from '../Main'

export default function Page() {
  const published = allKnowledge.filter((item) => !item.draft)
  const featured = allCoreContent(sortPosts(published)).slice(0, 6)
  return <Main featured={featured} totalCount={published.length} />
}
