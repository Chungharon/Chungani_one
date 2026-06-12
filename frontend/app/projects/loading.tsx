import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectsLoading() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl px-4'>
        <Skeleton className='mb-12 h-10 w-32' />
        <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i}>
              <Skeleton className='h-60 w-full rounded-lg' />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
