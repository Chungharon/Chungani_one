import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import MDXContent from '@/components/mdx-content'
import { formatDate } from '@/lib/utils'
import { ProjectMetadata } from '@/lib/projects'

interface CaseStudyLayoutProps {
  metadata: ProjectMetadata
  content: string
}

export default function CaseStudyLayout({ metadata, content }: CaseStudyLayoutProps) {
  const { title, summary, image, author, publishedAt, tags } = metadata

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>

        {/* Back link */}
        <Link
          href='/projects'
          className='mb-10 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-4 w-4' />
          Back to projects
        </Link>

        {/* Category + date bar */}
        <div className='mb-4 flex items-center gap-3'>
          <Badge variant='secondary' className='rounded-full text-xs font-medium'>
            Case Study
          </Badge>
          <span className='text-xs text-muted-foreground'>
            {author} · {formatDate(publishedAt ?? '')}
          </span>
        </div>

        {/* Title */}
        <h1 className='title mb-4'>{title}</h1>

        {/* Summary as lead */}
        {summary && (
          <p className='mb-6 border-l-2 border-primary pl-4 text-base font-light leading-relaxed text-muted-foreground'>
            {summary}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className='mb-8 flex flex-wrap gap-2'>
            {tags.map(tag => (
              <Badge
                key={tag}
                variant='secondary'
                className='cursor-default transition-colors hover:bg-foreground hover:text-background'
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Hero image */}
        {image && (
          <div className='relative mb-10 h-80 w-full overflow-hidden rounded-xl'>
            <Image
              src={image}
              alt={title || ''}
              className='object-cover'
              fill
              sizes='(max-width: 768px) 100vw, 768px'
              priority
            />
          </div>
        )}

        <Separator className='mb-10' />

        {/* Long-form prose content */}
        <main className='prose prose-neutral dark:prose-invert max-w-none
          prose-headings:font-semibold
          prose-h2:mt-10 prose-h2:text-xl
          prose-h3:mt-6 prose-h3:text-base
          prose-p:leading-relaxed
          prose-li:leading-relaxed
          prose-blockquote:border-primary
          prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
        '>
          <MDXContent source={content} />
        </main>

      </div>
    </section>
  )
}
