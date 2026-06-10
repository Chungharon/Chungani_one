import { Suspense } from 'react'
import Intro from '@/components/intro'
import RecentPosts, { RecentPostsSkeleton } from '@/components/recent-posts'
import RecentProjects, {
  RecentProjectsSkeleton,
} from '@/components/recent-projects'

export default function Home() {
  return (
    <section className='py-10'>
      <div className='container max-w-3xl px-4 py-8'>
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
