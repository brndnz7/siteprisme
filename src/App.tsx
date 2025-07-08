import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Expertises from './components/Expertises'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/toaster'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Configure GSAP for better performance
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    })

    // Optimize ScrollTrigger
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150,
    })

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <Expertises />
          <Process />
          <Portfolio />
          <ContactForm />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App 