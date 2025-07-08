import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { Button } from './ui/button'
import portfolioData from '@/data/portfolio.json'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  // Extraire tous les témoignages des projets
  const testimonials = portfolioData.projects
    .filter(project => project.testimonial)
    .map(project => ({
      ...project.testimonial!,
      projectTitle: project.title,
      category: project.category
    }))

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextTestimonial, 5000)
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlaying])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  if (testimonials.length === 0) return null

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-work-sans font-bold mb-6 text-slate-900 dark:text-slate-100"
          >
            Témoignages Clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-readable"
          >
            Découvrez les retours de nos clients sur nos réalisations 
            et notre accompagnement.
          </motion.p>
        </div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative card-professional p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-primary/20">
              <Quote className="w-12 h-12" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed italic">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="space-y-2">
                  <div className="font-work-sans font-semibold text-slate-900 dark:text-slate-100">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    {currentTestimonial.role}
                  </div>
                  <div className="text-sm text-primary">
                    Projet : {currentTestimonial.projectTitle}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="hover-lift"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex 
                        ? 'bg-primary' 
                        : 'bg-slate-300 dark:bg-slate-600 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="hover-lift"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Technologies Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-work-sans font-semibold mb-4 text-slate-900 dark:text-slate-100">
              Technologies et plateformes
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Nous maîtrisons un large éventail de technologies pour répondre à tous vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center card-professional p-6 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-primary rounded text-white text-xs font-bold flex items-center justify-center">R</div>
              </div>
              <h4 className="font-work-sans font-semibold mb-2 text-slate-900 dark:text-slate-100">
                React & Next.js
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Applications web modernes et performantes sur mesure
              </p>
            </div>

            <div className="text-center card-professional p-6 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-primary rounded text-white text-xs font-bold flex items-center justify-center">S</div>
              </div>
              <h4 className="font-work-sans font-semibold mb-2 text-slate-900 dark:text-slate-100">
                Shopify
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                E-commerce professionnel avec thèmes personnalisés
              </p>
            </div>

            <div className="text-center card-professional p-6 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-primary rounded text-white text-xs font-bold flex items-center justify-center">W</div>
              </div>
              <h4 className="font-work-sans font-semibold mb-2 text-slate-900 dark:text-slate-100">
                WordPress
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sites vitrines et blogs avec gestion de contenu intuitive
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="card-professional p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-work-sans font-semibold mb-4 text-slate-900 dark:text-slate-100">
              Prêt à rejoindre nos clients satisfaits ?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Parlons de votre projet et voyons comment nous pouvons vous accompagner 
              dans votre transformation digitale.
            </p>
            <Button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
              className="btn-professional"
            >
              Discuter de mon projet
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 