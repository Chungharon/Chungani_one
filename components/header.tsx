'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  Github, 
  Palette, 
  Eye, 
  Download, 
  Menu, 
  X,
  Briefcase
} from 'lucide-react'
import ThemeToggle from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  
  const portfolioTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  // Track if any menu/dropdown is active
  const isAnyMenuOpen = isPortfolioOpen || isResumeOpen || isMobileMenuOpen

  // Helper to close all active menus
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false)
    setIsPortfolioOpen(false)
    setIsResumeOpen(false)
  }

  // Auto-close open menus when route changes
  useEffect(() => {
    closeAllMenus()
  }, [pathname])

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (portfolioTimeoutRef.current) clearTimeout(portfolioTimeoutRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  // Desktop Hover Controls
  const handlePortfolioMouseEnter = () => {
    if (portfolioTimeoutRef.current) clearTimeout(portfolioTimeoutRef.current)
    setIsPortfolioOpen(true)
  }

  const handlePortfolioMouseLeave = () => {
    portfolioTimeoutRef.current = setTimeout(() => {
      setIsPortfolioOpen(false)
    }, 150)
  }

  const handleResumeMouseEnter = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    setIsResumeOpen(true)
  }

  const handleResumeMouseLeave = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      setIsResumeOpen(false)
    }, 150)
  }

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: 8, 
      scale: 0.96,
      transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.25, ease: 'easeInOut' }
    }
  }

  const accordionVariants = {
    hidden: { height: 0, opacity: 0, marginTop: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      marginTop: 8,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      marginTop: 0,
      transition: { duration: 0.15, ease: 'easeIn' }
    }
  }

  return (
    <>
      {/* Global Background Dim & Blur Overlay */}
      <AnimatePresence>
        {isAnyMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/45 backdrop-blur-[3px] z-40 transition-all cursor-pointer"
            onClick={closeAllMenus}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className='fixed inset-x-0 top-0 z-50 bg-background/80 border-b border-border/20 py-4 backdrop-blur-md transition-all duration-300'>
        <nav className='container flex max-w-4xl items-center justify-between mx-auto px-4'>
          {/* Brand / Logo */}
          <div>
            <Link href='/' className='font-serif text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity'>
              HN
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className='hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground'>
            <li className={cn(
              'transition-colors hover:text-foreground',
              pathname === '/posts' && 'text-foreground'
            )}>
              <Link href='/posts'>Posts</Link>
            </li>

            {/* Portfolio Dropdown */}
            <li 
              className='relative py-2'
              onMouseEnter={handlePortfolioMouseEnter}
              onMouseLeave={handlePortfolioMouseLeave}
            >
              <button 
                onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                className={cn(
                  'flex items-center gap-1 transition-colors hover:text-foreground cursor-pointer focus:outline-none',
                  (pathname.startsWith('/projects') || isPortfolioOpen) && 'text-foreground'
                )}
                aria-haspopup="true"
                aria-expanded={isPortfolioOpen}
              >
                Portfolio
                <ChevronDown className={cn('size-4 transition-transform duration-300', isPortfolioOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {isPortfolioOpen && (
                  <motion.div 
                    variants={dropdownVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className='absolute left-1/2 -translate-x-1/2 top-full mt-3 w-68 rounded-xl border border-border/40 bg-zinc-950 p-2 shadow-2xl z-50 font-sans'
                  >
                    <ul className='flex flex-col gap-1'>
                      <li>
                        <Link 
                          href='/projects?filter=case-studies' 
                          className='flex items-start gap-3 rounded-lg p-2.5 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all group'
                        >
                          <div className='bg-zinc-900 text-zinc-300 rounded-md p-1.5 size-8 flex items-center justify-center group-hover:bg-zinc-800 transition-colors shrink-0'>
                            <Briefcase className='size-4 text-emerald-400' />
                          </div>
                          <div>
                            <p className='text-xs font-semibold'>Case Studies</p>
                            <p className='text-[10px] text-zinc-500 mt-0.5 line-clamp-1'>Deep-dive project breakdowns</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href='https://github.com' 
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-start gap-3 rounded-lg p-2.5 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all group'
                        >
                          <div className='bg-zinc-900 text-zinc-300 rounded-md p-1.5 size-8 flex items-center justify-center group-hover:bg-zinc-800 transition-colors shrink-0'>
                            <Github className='size-4 text-violet-400' />
                          </div>
                          <div className='flex-1'>
                            <p className='text-xs font-semibold'>Open Source</p>
                            <p className='text-[10px] text-zinc-500 mt-0.5 line-clamp-1'>GitHub contributions & repos</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href='/projects?filter=design-concepts' 
                          className='flex items-start gap-3 rounded-lg p-2.5 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all group'
                        >
                          <div className='bg-zinc-900 text-zinc-300 rounded-md p-1.5 size-8 flex items-center justify-center group-hover:bg-zinc-800 transition-colors shrink-0'>
                            <Palette className='size-4 text-amber-400' />
                          </div>
                          <div>
                            <p className='text-xs font-semibold'>Design Concepts</p>
                            <p className='text-[10px] text-zinc-500 mt-0.5 line-clamp-1'>UI/UX & frontend experiments</p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li className={cn(
              'transition-colors hover:text-foreground',
              pathname === '/contact' && 'text-foreground'
            )}>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>

          {/* Right side Actions (CV Dropdown & Theme Toggle & Mobile Menu button) */}
          <div className='flex items-center gap-2 sm:gap-4'>
            
            {/* CV / Resume Dropdown - Desktop Only */}
            <div 
              className='relative hidden md:block py-2'
              onMouseEnter={handleResumeMouseEnter}
              onMouseLeave={handleResumeMouseLeave}
            >
              <button 
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                className={cn(
                  'flex items-center gap-1 text-xs font-semibold bg-secondary/80 hover:bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg border border-border/30 transition-all cursor-pointer focus:outline-none hover:shadow-sm',
                  isResumeOpen && 'bg-secondary ring-1 ring-ring/10'
                )}
                aria-haspopup="true"
                aria-expanded={isResumeOpen}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='flex md:hidden items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus:outline-none cursor-pointer'
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? <X className='size-5' /> : <Menu className='size-5' />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
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
                  <li>
                    <Link 
                      href='/posts'
                      className={cn('block py-1 hover:text-foreground transition-colors', pathname === '/posts' && 'text-foreground')}
                    >
                      Posts
                    </Link>
                  </li>

                  {/* Portfolio Accordion in Mobile */}
                  <li>
                    <button 
                      onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                      className={cn(
                        'flex items-center justify-between w-full py-1 hover:text-foreground text-left cursor-pointer focus:outline-none',
                        pathname.startsWith('/projects') && 'text-foreground'
                      )}
                    >
                      Portfolio
                      <ChevronDown className={cn('size-4 transition-transform duration-300', isPortfolioOpen && 'rotate-180')} />
                    </button>
                    
                    <AnimatePresence>
                      {isPortfolioOpen && (
                        <motion.div
                          variants={accordionVariants}
                          initial='hidden'
                          animate='visible'
                          exit='exit'
                          className='overflow-hidden border-l border-border/30 pl-4 flex flex-col gap-3 mt-2'
                        >
                          <Link 
                            href='/projects?filter=case-studies'
                            className='flex items-center gap-2 text-sm hover:text-foreground transition-colors py-0.5'
                          >
                            <Briefcase className='size-4 text-emerald-400' />
                            Case Studies
                          </Link>
                          <Link 
                            href='https://github.com'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-2 text-sm hover:text-foreground transition-colors py-0.5'
                          >
                            <Github className='size-4 text-violet-400' />
                            Open Source
                          </Link>
                          <Link 
                            href='/projects?filter=design-concepts'
                            className='flex items-center gap-2 text-sm hover:text-foreground transition-colors py-0.5'
                          >
                            <Palette className='size-4 text-amber-400' />
                            Design Concepts
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  <li>
                    <Link 
                      href='/contact'
                      className={cn('block py-1 hover:text-foreground transition-colors', pathname === '/contact' && 'text-foreground')}
                    >
                      Contact
                    </Link>
                  </li>

                  {/* CV Accordion in Mobile */}
                  <li className='border-t border-border/10 pt-4'>
                    <button 
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
