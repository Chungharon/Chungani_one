import { getProjectBySlug, getProjects } from '@/lib/projects'
import CaseStudyLayout from '@/components/case-study-layout'
import DesignConceptLayout from '@/components/design-concept-layout'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(project => ({ slug: project.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.metadata.title,
    description: project.metadata.summary,
  }
}

export default async function ProjectPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const { metadata, content } = project

  if (metadata.category === 'case-studies') {
    return <CaseStudyLayout metadata={metadata} content={content} />
  }

  return <DesignConceptLayout metadata={metadata} content={content} />
}
