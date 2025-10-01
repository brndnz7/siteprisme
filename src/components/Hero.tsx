import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { smoothScrollTo } from '@/lib/utils'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      // Animations optimisées pour la performance
      const tl = gsap.timeline()
      
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
    }
  }, [])

  const scrollToPortfolio = () => {
    smoothScrollTo('portfolio')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-main py-12 sm:py-20 md:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 sm:opacity-40" />
      
      {/* Floating glassmorphism orbs */}
      <div className="absolute top-8 left-4 w-40 h-40 sm:top-20 sm:left-20 sm:w-72 sm:h-72 glass-orb rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-4 w-40 h-40 sm:top-40 sm:right-20 sm:w-72 sm:h-72 glass-orb rounded-full animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-40 h-40 sm:w-72 sm:h-72 glass-orb rounded-full animate-pulse animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl px-2 sm:px-4 md:px-8 text-center mx-auto pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge professionnel glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center rounded-full glass-badge px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 mb-4 sm:mb-8 hidden xs:inline-flex shadow-sm"
          >
            <CheckCircle className="w-4 h-4 mr-2 text-sky-500" />
            SitePrisme - Agence de développement web spécialisée
          </motion.div>

          {/* Titre principal */}
          <h1
            ref={titleRef}
            className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-work-sans font-bold mb-6 text-foreground"
          >
            Créons ensemble votre
            <span className="block gradient-text">
              présence digitale
            </span>
          </h1>
          
          <p
            ref={subtitleRef}
            className="text-base sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-8 text-readable font-normal"
          >
            Nous développons des sites web professionnels et performants avec 
            <span className="text-slate-900 font-semibold"> React, Shopify et WordPress</span>, 
            adaptés aux besoins spécifiques de votre entreprise.
          </p>

          {/* Points forts glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="hidden sm:flex flex-col md:flex-row flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-10 text-xs sm:text-sm text-slate-600"
          >
            {[
              'Développement sur mesure',
              'Technologies modernes',
              'Design responsive',
              'Support technique'
            ].map((feature, index) => (
              <motion.div 
                key={feature} 
                className="flex items-center glass-badge px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              >
                <CheckCircle className="w-4 h-4 text-sky-500 mr-2" />
                <span className="text-slate-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto"
          >
            <button
              onClick={scrollToPortfolio}
              className="btn-professional group w-full sm:w-auto px-8 py-4"
            >
              <span className="flex items-center justify-center">
                Voir nos réalisations
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            
            <button
              onClick={() => smoothScrollTo('contact')}
              className="btn-outline-professional w-full sm:w-auto"
            >
              Discuter de votre projet
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 