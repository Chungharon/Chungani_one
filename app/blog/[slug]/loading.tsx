import { Skeleton } from '@/components/ui/skeleton'

export default function BlogPostLoading() {
  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Skeleton className='mb-6 h-4 w-24' />
        <Skeleton className='mb-4 h-10 w-3/4' />
        <Skeleton className='mb-12 h-4 w-40' />
        <Skeleton className='mb-12 h-72 w-full rounded-lg' />
        <div className='flex flex-col gap-4'>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className={`h-4 ${i % 5 === 4 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}