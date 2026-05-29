import { getBlogPosts } from '@/lib/blog'
import Posts from '@/components/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Personal stories, thoughts, and reflections from Haron Ngaira.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Blog</h1>
        {posts.length > 0 ? (
          <Posts posts={posts} />
        ) : (
          <p className='text-sm text-muted-foreground'>No blog posts yet. Check back soon.</p>
        )}
      </div>
    </section>
  )
}