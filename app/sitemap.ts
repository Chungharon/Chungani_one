import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/posts'
import { getProjects } from '@/lib/projects'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://haronngaira.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const projects = await getProjects()

  const postUrls: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
  }))

  const projectUrls: MetadataRoute.Sitemap = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.publishedAt
      ? new Date(project.publishedAt)
      : new Date(),
  }))

  return [
    { url: baseUrl },
    { url: `${baseUrl}/posts` },
    { url: `${baseUrl}/projects` },
    { url: `${baseUrl}/contact` },
    ...postUrls,
    ...projectUrls,
  ]
}
