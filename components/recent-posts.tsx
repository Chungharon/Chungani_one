import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import Posts from '@/components/posts'
import { Button } from '@/components/ui/button'

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