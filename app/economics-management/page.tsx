import DisciplinePage from '@/components/DisciplinePage'
import { getDisciplineArticles } from '@/data/disciplineArticles'
import { disciplines } from '@/data/disciplines'
import { genPageMetadata } from '@/app/seo'

const discipline = disciplines['economics-management']

export const metadata = genPageMetadata({
  title: '经管论文选题、实证方法、Stata与写作研究中心',
  description: `${discipline.statement}${discipline.audience}`,
})

export default function EconomicsManagementPage() {
  return (
    <DisciplinePage
      discipline={discipline}
      articles={getDisciplineArticles('economics-management')}
    />
  )
}
