import { Suspense } from 'react'
import Intro from "@/components/intro";
import RecentPosts from "@/components/recent-posts";
import RecentProjects from "@/components/recent-projects";
import { Skeleton } from '@/components/ui/skeleton'

function RecentPostsSkeleton() {
  return (
    <section className='pb-24'>
      <Skeleton className='mb-12 h-8 w-36' />
      <ul className='flex flex-col gap-8'>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className='flex flex-col gap-2'>
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </li>
        ))}
      </ul>
    </section>
  )
}

function RecentProjectsSkeleton() {
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

export default function Home() {
  return (
    <section className="py-10">
      <div className="container max-w-3xl px-4 py-8">
        <Intro />
        <Suspense fallback={<RecentPostsSkeleton />}>
          <RecentPosts />
        </Suspense>
        <Suspense fallback={<RecentProjectsSkeleton />}>
          <RecentProjects />
        </Suspense>
      </div>
    </section>
  )
}