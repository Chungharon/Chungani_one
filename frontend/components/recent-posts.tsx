import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import Posts from '@/components/posts'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default async function RecentPosts() {
  const posts = await getPosts(4)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Recent posts</h2>
        <Posts posts={posts} />

        <Button
          variant='link'
          asChild
          className='mt-8 p-0 text-muted-foreground hover:text-foreground'
        >
          <Link href='/posts'>All posts</Link>
        </Button>
      </div>
    </section>
  )
}

export function RecentPostsSkeleton() {
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