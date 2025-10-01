import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, X, Filter, Utensils, Coffee, ShoppingCart, Store } from 'lucide-react'
import { Dialog, DialogContent } from './ui/dialog'
import portfolioData from '@/data/portfolio.json'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const categories = [
  { name: 'Fast Food', value: 'fast-food', icon: Utensils },
  { name: 'Restaurant', value: 'restaurant', icon: Utensils },
  { name: 'Café', value: 'cafe', icon: Coffee },
  { name: 'E-commerce', value: 'e-commerce', icon: ShoppingCart }
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('Fast Food')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ecommerceStack, setEcommerceStack] = useState<'shopify' | 'wordpress'>('shopify')
  const gridRef = useRef<HTMLDivElement>(null)

  const getCategoryIcon = (categoryValue: string) => {
    const category = categories.find(cat => cat.value === categoryValue)
    return category?.icon || Filter
  }

  const getCategoryName = (categoryValue: string) => {
    const category = categories.find(cat => cat.value === categoryValue)
    return category?.name || categoryValue
  }

  const filteredProjects = selectedCategory === 'E-commerce'
    ? portfolioData.projects.filter(project => project.category === 'e-commerce' && project.stack === ecommerceStack)
    : portfolioData.projects.filter(project => project.category === categories.find(cat => cat.name === selectedCategory)?.value)

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.project-card')
      
      // Animation optimisée des cartes
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }
  }, [filteredProjects])

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category !== 'E-commerce') {
      setEcommerceStack('shopify') // Reset to default
    }
  }

  return (
    <section id="portfolio" className="section-padding bg-gradient-main">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-work-sans font-bold mb-6 text-foreground"
          >
            Nos Réalisations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto text-readable"
          >
            Découvrez une sélection de nos projets les plus récents, 
            alliant design moderne et performances techniques.
          </motion.p>
        </div>

        {/* Filter Buttons Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center backdrop-blur-lg shadow-sm ${
                selectedCategory === category.name
                  ? 'bg-sky-500/90 text-white shadow-lg border border-sky-400/30'
                  : 'bg-white/60 text-slate-700 hover:bg-white/80 hover:text-sky-600 border border-slate-200/50'
              }`}
            >
              {(() => {
                const IconComponent = category.icon
                return <IconComponent className="w-4 h-4 mr-2" />
              })()}
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* E-commerce Stack Toggle Glassmorphism */}
        {selectedCategory === 'E-commerce' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="flex flex-col md:flex-row glass-medium rounded-full p-3 shadow-lg gap-3 md:gap-4 items-center min-w-[320px] sm:min-w-[400px]">
              <button
                onClick={() => setEcommerceStack('shopify')}
                className={`px-6 py-3 w-full md:min-w-[160px] lg:min-w-[180px] rounded-full font-semibold text-sm sm:text-base flex items-center justify-center transition-all duration-300 relative overflow-hidden
                  ${ecommerceStack === 'shopify'
                    ? 'bg-sky-500/90 text-white shadow-xl scale-105 z-10 border border-sky-400/30'
                    : 'bg-transparent text-slate-700 hover:bg-white/60 hover:text-sky-600'}
                `}
              >
                <Store className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Shopify
              </button>
              <button
                onClick={() => setEcommerceStack('wordpress')}
                className={`px-6 py-3 w-full md:min-w-[160px] lg:min-w-[180px] rounded-full font-semibold text-sm sm:text-base flex items-center justify-center transition-all duration-300 relative overflow-hidden
                  ${ecommerceStack === 'wordpress'
                    ? 'bg-sky-500/90 text-white shadow-xl scale-105 z-10 border border-sky-400/30'
                    : 'bg-transparent text-slate-700 hover:bg-white/60 hover:text-sky-600'}
                `}
              >
                <Store className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                WordPress
              </button>
            </div>
          </motion.div>
        )}

        {/* Projects Grid - Centered Single Project */}
        <motion.div
          ref={gridRef}
          layout
          className="grid grid-cols-1 gap-8 justify-items-center max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="project-card card-professional p-0 overflow-hidden hover-lift group w-full max-w-sm lg:max-w-2xl xl:max-w-2xl 2xl:max-w-xl shadow-sm"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-96 xl:h-[28rem] 2xl:h-96 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="glass-button text-slate-700 hover:text-sky-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 mr-2 inline" />
                          Voir le site
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 lg:p-8 xl:p-10 text-center">
                  <div className="flex flex-col items-center justify-center mb-3 gap-2">
                    <span className="text-xs sm:text-xs font-medium text-slate-700 glass-badge px-3 py-1 rounded-full flex items-center justify-center shadow-sm">
                      {(() => {
                        const IconComponent = getCategoryIcon(project.category)
                        return <IconComponent className="w-4 h-4 mr-2 text-sky-500" />
                      })()}
                      {getCategoryName(project.category)}
                    </span>
                    <span className="text-xs text-slate-500">
                      {project.year}
                    </span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-work-sans font-semibold text-foreground mb-2 group-hover:text-slate-700 transition-colors text-center">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 mb-4 leading-relaxed text-center">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 glass-light text-slate-700 rounded-md shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-xs px-2 py-1 bg-white/60 text-slate-700 rounded-md border border-slate-200/50 backdrop-blur-sm shadow-sm">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Glassmorphism */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-strong shadow-2xl">
          {selectedProject && (
            <div className="space-y-6">
              <button
                onClick={closeModal}
                                  className="absolute top-4 right-4 p-2 rounded-full glass-button text-slate-700 hover:text-sky-600 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-700 glass-badge px-3 py-1 rounded-full flex items-center backdrop-blur-md shadow-sm">
                      {(() => {
                        const IconComponent = getCategoryIcon(selectedProject.category)
                        return <IconComponent className="w-4 h-4 mr-2 text-sky-500" />
                      })()}
                      {getCategoryName(selectedProject.category)}
                    </span>
                    <span className="text-sm text-slate-500">
                      {selectedProject.year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-work-sans font-bold text-foreground">
                    {selectedProject.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-work-sans font-semibold text-foreground">
                      Technologies utilisées :
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="text-sm px-3 py-1 glass-light text-slate-700 rounded-md backdrop-blur-sm shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    {selectedProject.url && (
                      <a 
                        href={selectedProject.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-professional"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Voir le site
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
} 