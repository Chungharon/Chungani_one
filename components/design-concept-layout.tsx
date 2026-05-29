import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import MDXContent from '@/components/mdx-content'
import { formatDate } from '@/lib/utils'
import { ProjectMetadata } from '@/lib/projects'

interface DesignConceptLayoutProps {
  metadata: ProjectMetadata
  content: string
}

export default function DesignConceptLayout({ metadata, content }: DesignConceptLayoutProps) {
  const { title, summary, image, author, publishedAt, tags } = metadata

  return (
    <section className='pb-24'>

      {/* Full-width immersive hero */}
      {image && (
        <div className='relative h-[60vh] w-full overflow-hidden'>
          <Image
            src={image}
            alt={title || ''}
            className='object-cover object-center'
            fill
            priority
          />
          {/* Gradient fade to background */}
          <div className='absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent' />
        </div>
      )}

      <div className='container max-w-3xl pt-8'>

        {/* Back link */}
        <Link
          href='/projects'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-4 w-4' />
          Back to projects
        </Link>

        {/* Title */}
        <h1 className='title mb-3'>{title}</h1>

        {/* Summary */}
        {summary && (
          <p className='mb-6 text-base font-light text-muted-foreground'>
            {summary}
          </p>
        )}

        {/* Tags + date on same row */}
        <div className='mb-10 flex flex-wrap items-center gap-2'>
          {tags?.map((tag) => (
            <Badge
              key={tag}
              variant='secondary'
              className='cursor-default transition-colors hover:bg-foreground hover:text-background'
            >
              {tag}
            </Badge>
          ))}
          <span className='ml-auto text-xs text-muted-foreground'>
            {author} · {formatDate(publishedAt ?? '')}
          </span>
        </div>

        {/* Minimal prose */}
        <main className='prose prose-neutral dark:prose-invert max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-h2:mt-8 prose-h2:text-lg
          prose-p:leading-relaxed prose-p:text-muted-foreground
          prose-li:text-muted-foreground
          prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
        '>
          <MDXContent source={content} />
        </main>

      </div>
    </section>
  )
}