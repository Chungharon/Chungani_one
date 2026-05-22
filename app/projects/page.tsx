import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

interface ProjectsPageProps {
  searchParams: Promise<{ filter?: string }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { filter } = await searchParams
  const allProjects = await getProjects()

  // Filter projects dynamically based on category
  const filteredProjects = filter
    ? allProjects.filter(project => project.category === filter)
    : allProjects

  // Determine a nice heading dynamically based on the category filter
  const headingTitle = filter
    ? filter === 'case-studies'
      ? 'Case Studies'
      : filter === 'design-concepts'
      ? 'Design Concepts'
      : 'Projects'
    : 'Projects'

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl px-4'>
        <h1 className='title mb-12'>{headingTitle}</h1>

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