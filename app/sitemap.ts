import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/posts'
import { getProjects } from '@/lib/projects'
import { getBlogPosts } from '@/lib/blog'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://haronngaira.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const projects = await getProjects()
  const blogPosts = await getBlogPosts()

  const postUrls: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
  }))

  const projectUrls: MetadataRoute.Sitemap = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.publishedAt ? new Date(project.publishedAt) : new Date(),
  }))

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
  }))

  return [
    { url: baseUrl },
    { url: `${baseUrl}/posts` },
    { url: `${baseUrl}/blog` },
    { url: `${baseUrl}/projects` },
    { url: `${baseUrl}/contact` },
    ...postUrls,
    ...blogUrls,
    ...projectUrls,
  ]
}
