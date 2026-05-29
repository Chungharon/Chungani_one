'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Eye, Download, Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  const isAnyMenuOpen = isResumeOpen || isMobileMenuOpen

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false)
    setIsResumeOpen(false)
  }

  useEffect(() => {
    closeAllMenus()
  }, [pathname])

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  const handleResumeMouseEnter = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    setIsResumeOpen(true)
  }

  const handleResumeMouseLeave = () => {
    resumeTimeoutRef.current = setTimeout(() => setIsResumeOpen(false), 150)
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }
    },
    exit: {
      opacity: 0,
      y: 8,
      scale: 0.96,
      transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] as const }
    }
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeInOut' as const }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.25, ease: 'easeInOut' as const }
    }
  }

  const accordionVariants = {
    hidden: { height: 0, opacity: 0, marginTop: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      marginTop: 8,
      transition: { duration: 0.2, ease: 'easeOut' as const }
    },
    exit: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      transition: { duration: 0.15, ease: 'easeIn' as const }
    }
  }

  const navLinks = [
    { label: 'Posts', href: '/posts' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Backdrop overlay */}
      <AnimatePresence>
        {isAnyMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='fixed inset-0 bg-black/45 backdrop-blur-[3px] z-40 cursor-pointer'
            onClick={closeAllMenus}
            aria-hidden='true'
          />
        )}
      </AnimatePresence>

      <header className='fixed inset-x-0 top-0 z-50 bg-background/80 border-b border-border/20 py-4 backdrop-blur-md transition-all duration-300'>
        <nav className='container flex max-w-4xl items-center justify-between mx-auto px-4'>

          {/* Brand */}
          <Link
            href='/'
            className='font-serif text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity'
          >
            HN
          </Link>

          {/* Desktop nav */}
          <ul className='hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground'>
            {navLinks.map(({ label, href }) => (
              <li key={href} className={cn(
                'transition-colors hover:text-foreground',
                pathname.startsWith(href) && 'text-foreground'
              )}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>

          {/* Right side — Resume dropdown + theme toggle + mobile button */}
          <div className='flex items-center gap-2 sm:gap-4'>

            {/* Resume / CV dropdown — desktop only */}
            <div
              className='relative hidden md:block py-2'
              onMouseEnter={handleResumeMouseEnter}
              onMouseLeave={handleResumeMouseLeave}
            >
              <button
                type='button'
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                className={cn(
                  'flex items-center gap-1 text-xs font-semibold bg-secondary/80 hover:bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg border border-border/30 transition-all cursor-pointer focus:outline-none hover:shadow-sm',
                  isResumeOpen && 'bg-secondary ring-1 ring-ring/10'
                )}
                aria-haspopup='true'
                aria-expanded={isResumeOpen ? 'true' : 'false'}
              >
                Resume / CV
                <ChevronDown className={cn('size-3.5 transition-transform duration-300', isResumeOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {isResumeOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className='absolute right-0 top-full mt-3 w-48 rounded-xl border border-border/40 bg-zinc-950 p-1.5 shadow-2xl z-50 font-sans'
                  >
                    <ul className='flex flex-col gap-0.5'>
                      <li>
                        <Link
                          href='/resume'
                          target='_blank'
                          className='flex items-center gap-2 rounded-lg p-2 text-xs font-medium hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all group'
                        >
                          <Eye className='size-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors' />
                          View Online
                        </Link>
                      </li>
                      <li>
                        <a
                          href='/cv.pdf'
                          download='cv.pdf'
                          className='flex items-center gap-2 rounded-lg p-2 text-xs font-medium hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all group'
                        >
                          <Download className='size-3.5 text-zinc-500 group-hover:text-blue-400 transition-colors' />
                          Download PDF
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              type='button'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='flex md:hidden items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus:outline-none cursor-pointer'
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? <X className='size-5' /> : <Menu className='size-5' />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='md:hidden absolute top-full inset-x-0 border-b border-border/30 bg-background/95 backdrop-blur-lg shadow-2xl overflow-hidden'
            >
              <div className='container max-w-4xl mx-auto px-6 py-6 flex flex-col gap-5'>
                <ul className='flex flex-col gap-4 text-base font-medium text-muted-foreground'>
                  {navLinks.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={cn(
                          'block py-1 hover:text-foreground transition-colors',
                          pathname.startsWith(href) && 'text-foreground'
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}

                  {/* Resume / CV accordion — mobile */}
                  <li className='border-t border-border/10 pt-4'>
                    <button
                      type='button'
                      onClick={() => setIsResumeOpen(!isResumeOpen)}
                      className='flex items-center justify-between w-full py-1 hover:text-foreground text-left cursor-pointer focus:outline-none'
                    >
                      Resume / CV
                      <ChevronDown className={cn('size-4 transition-transform duration-300', isResumeOpen && 'rotate-180')} />
                    </button>

                    <AnimatePresence>
                      {isResumeOpen && (
                        <motion.div
                          variants={accordionVariants}
                          initial='hidden'
                          animate='visible'
                          exit='exit'
                          className='overflow-hidden border-l border-border/30 pl-4 flex flex-col gap-3 mt-2'
                        >
                          <Link
                            href='/resume'
                            target='_blank'
                            className='flex items-center gap-2 text-sm hover:text-foreground transition-colors py-0.5'
                          >
                            <Eye className='size-4 text-emerald-400' />
                            View Online
                          </Link>
                          <a
                            href='/cv.pdf'
                            download='cv.pdf'
                            className='flex items-center gap-2 text-sm hover:text-foreground transition-colors py-0.5'
                          >
                            <Download className='size-4 text-blue-400' />
                            Download PDF
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}