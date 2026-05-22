import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import Projects from '@/components/projects'
import { Button } from '@/components/ui/button'

export default async function RecentProjects() {
  const projects = await getProjects(2)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Recent projects</h2>
        <Projects projects={projects} />

        <Button
          variant='link'
          asChild
          className='mt-8 p-0 text-muted-foreground hover:text-foreground'
        >
          <Link href='/projects'>All projects</Link>
        </Button>
      </div>
    </section>
  )
}