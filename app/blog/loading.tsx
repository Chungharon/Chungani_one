import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <Skeleton className='mb-12 h-10 w-20' />
        <ul className='flex flex-col gap-8'>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i}>
              <div className='flex flex-col justify-between gap-y-2 sm:flex-row'>
                <div className='flex flex-col gap-2 max-w-lg w-full'>
                  <Skeleton className='h-5 w-3/4' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-2/3' />
                </div>
                <Skeleton className='h-6 w-20 shrink-0' />
              </div>
              {i < 3 && <Skeleton className='mt-8 h-px w-full' />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}