import Link from 'next/link'
import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'
import { cn } from '@/lib/utils'

const filters = [
  { label: 'All', value: null },
  { label: 'Case Studies', value: 'case-studies' },
  { label: 'Design Concepts', value: 'design-concepts' },
]

interface ProjectsPageProps {
  searchParams: Promise<{ filter?: string }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { filter } = await searchParams
  const allProjects = await getProjects()

  const filteredProjects = filter
    ? allProjects.filter(project => project.category === filter)
    : allProjects

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl px-4'>
        <h1 className='title mb-6'>Projects</h1>

        {/* Filter pills */}
        <div className='mb-10 flex flex-wrap gap-2'>
          {filters.map(({ label, value }) => {
            const isActive = value === null ? !filter : filter === value
            const href = value ? `/projects?filter=${value}` : '/projects'
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {filteredProjects.length > 0 ? (
          <Projects projects={filteredProjects} />
        ) : (
          <p className='text-sm text-muted-foreground'>
            No projects found under this category yet.
          </p>
        )}
      </div>
    </section>
  )
}