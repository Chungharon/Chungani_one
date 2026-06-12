import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import Projects from '@/components/projects'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

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

export function RecentProjectsSkeleton() {
  return (
    <section className='pb-24'>
      <Skeleton className='mb-12 h-8 w-40' />
      <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
        {Array.from({ length: 2 }).map((_, i) => (
          <li key={i}>
            <Skeleton className='h-60 w-full rounded-lg' />
          </li>
        ))}
      </ul>
    </section>
  )
}