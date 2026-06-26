import { useState, useEffect } from 'react'
import './App.css'
import Navbar from '@/components/Navbar'
import { HeroGeometric } from '@/components/ui/shape-landing-hero'
import About from '@/components/About'
import FeaturedProjects from '@/components/Projects'
import Strengths from '@/components/Strengths'
import ContactFooter from '@/components/ContactFooter'
import ScrollProgress from '@/components/ScrollProgress'
import Threads from '@/components/ui/Threads'
import DanacolCaseStudy from '@/components/DanacolCaseStudy'
import VWCaseStudy from '@/components/VWCaseStudy'

type Page = 'home' | 'about' | 'projects' | 'strengths' | 'contact' | 'danacol' | 'volkswagen'

function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#', '')
  if (['about', 'projects', 'strengths', 'contact', 'danacol', 'volkswagen'].includes(hash)) return hash as Page
  return 'home'
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash)

  useEffect(() => {
    const onHash = () => {
      setPage(getPageFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (p: Page) => {
    window.location.hash = p === 'home' ? '' : `#${p}`
    window.scrollTo(0, 0)
  }

  const renderPage = () => {
    switch (page) {
      case 'danacol':
        return <DanacolCaseStudy onBack={() => navigate('projects')} />
      case 'volkswagen':
        return <VWCaseStudy onBack={() => navigate('projects')} />
      case 'about':
        return (<><div style={{ height: 80 }} /><About /></>)
      case 'projects':
        return (<><div style={{ height: 80 }} /><FeaturedProjects onDanacolClick={() => navigate('danacol')} onVWClick={() => navigate('volkswagen')} /></>)
      case 'strengths':
        return (<><div style={{ height: 80 }} /><Strengths /></>)
      case 'contact':
        return <ContactFooter />
      case 'home':
      default:
        return (
          <div id="hero">
            <HeroGeometric badge="MSc Marketing Management · Business Development" photoSrc="/photo-nobg.png" />
          </div>
        )
    }
  }

  const isCaseStudy = page === 'danacol' || page === 'volkswagen'

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 1 }}>
        <Threads color={[0.9, 0.7, 0.35]} amplitude={1.5} distance={0.5} enableMouseInteraction={false} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ScrollProgress />
        {!isCaseStudy && <Navbar />}
        {renderPage()}
      </div>
    </>
  )
}
