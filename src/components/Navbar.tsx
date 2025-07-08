import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Accueil', href: '#', id: 'home' },
  { name: 'Expertises', href: '#expertises', id: 'expertises' },
  { name: 'Processus', href: '#processus', id: 'processus' },
  { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Detect active section
      const sections = navigation.map(nav => nav.id)
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string, id: string) => {
    setIsOpen(false)
    setActiveSection(id)
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-900/95 backdrop-blur-lg border-b border-violet-500/20 shadow-lg shadow-violet-500/10' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-14 xs:h-16 sm:h-20 mt-2 xs:mt-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 ml-2 sm:ml-0"
          >
            <div className="w-20 h-16 rounded-xl flex items-center justify-center overflow-hidden">
              <img src="/img/logo.png" alt="SitePrisme" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 sm:space-x-8">
            {navigation.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href, item.id)}
                className={`relative text-sm xs:text-base sm:text-lg font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-violet-400'
                    : 'text-slate-300 hover:text-violet-300'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-4 mr-2 sm:mr-0">
            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-violet-500/20 text-slate-300 hover:text-violet-300 transition-all duration-200 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-900/98 backdrop-blur-lg border-t border-violet-500/20 overflow-hidden"
          >
            <div className="container-custom py-4 px-2 sm:px-4">
              <div className="space-y-1">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href, item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base xs:text-lg font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'text-violet-400 bg-violet-500/10 border-l-2 border-violet-400'
                        : 'text-slate-300 hover:text-violet-300 hover:bg-violet-500/5'
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
              
              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 pt-4 border-t border-violet-500/20"
              >
                <button
                  onClick={() => scrollToSection('#contact', 'contact')}
                  className="w-full btn-professional py-3 text-base xs:text-lg"
                >
                  Démarrer un projet
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}