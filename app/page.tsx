import { allKnowledge } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Main from './Main'

export default function Page() {
  const featured = allCoreContent(sortPosts(allKnowledge.filter((item) => !item.draft))).slice(0, 6)
  return <Main featured={featured} />
}
