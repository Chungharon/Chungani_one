import ContactForm from '@/components/contact-form'
import { Separator } from '@/components/ui/separator'
import { Mail, MapPin, Clock, Github, type LucideIcon } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Haron Ngaira — open to new projects, collaborations, and conversations.',
}

type ContactDetail = {
  icon: LucideIcon
  label: string
  value: string
  href: string | null
}

const contactDetails: ContactDetail[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ngairaharon@gmail.com',
    href: 'mailto:ngairaharon@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kiambu, Kenya',
    href: null,
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Usually within 24 hours',
    href: null,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Chungharon',
    href: 'https://github.com/Chungharon',
  },
]

const services = [
  'Fullstack web application development',
  'CI/CD pipeline setup & automation',
  'Cloud infrastructure & deployment',
  'Monitoring & observability stacks',
  'Code reviews & technical consulting',
]

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='text-sm font-semibold uppercase tracking-widest text-muted-foreground'>
      {children}
    </h2>
  )
}

function ContactHeader() {
  return (
    <div className='mb-16 max-w-xl'>
      <h1 className='title mb-4'>Let&apos;s work together</h1>
      <p className='text-base font-light leading-relaxed text-muted-foreground'>
        Whether you have a project in mind, a question about my work, or just
        want to say hello — I&apos;d love to hear from you. Fill out the form or
        reach out directly.
      </p>

      <div className='mt-6 inline-flex items-center rounded-full border border-border/40 bg-muted/50 px-4 py-2 text-sm'>
        <span className='relative flex h-2 w-2'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full opacity-75' />
          <span className='relative inline-flex h-2 w-2 rounded-full' />
        </span>
        <span className='text-muted-foreground'>Available for new projects</span>
      </div>
    </div>
  )
}

function ContactDetailItem({ icon: Icon, label, value, href }: ContactDetail) {
  const isExternal = href?.startsWith('http')

  return (
    <li className='flex items-start gap-4'>
      <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted'>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </div>
      <div>
        <p className='text-xs text-muted-foreground'>{label}</p>
        {href ? (
          <a
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
          >
            {value}
          </a>
        ) : (
          <p className='text-sm font-medium'>{value}</p>
        )}
      </div>
    </li>
  )
}

export default function ContactPage() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-4xl'>
        <ContactHeader />

        <div className='grid grid-cols-1 gap-16 lg:grid-cols-2'>
          {/* Left — contact details */}
          <div className='flex flex-col gap-8'>
            <div>
              <SectionHeading>Contact details</SectionHeading>
              <ul className='mt-6 flex flex-col gap-6'>
                {contactDetails.map(detail => (
                  <ContactDetailItem key={detail.label} {...detail} />
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <SectionHeading>What I can help with</SectionHeading>
              <ul className='mt-3 flex flex-col gap-2 text-sm text-muted-foreground'>
                {services.map(item => (
                  <li key={item} className='flex items-center gap-2'>
                    <span className='h-1 w-1 rounded-full bg-muted-foreground' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — contact form */}
          <div>
            <SectionHeading>Send a message</SectionHeading>
            <div className='mt-6'>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}