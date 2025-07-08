import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Utensils, 
  ShoppingCart, 
  ChefHat, 
  Coffee,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users,
  MessageSquare
} from 'lucide-react'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const expertises = [
  {
    id: 'fast-food',
    icon: Utensils,
    title: 'Fast-Food',
    subtitle: 'Solutions de commande rapide',
    description: 'Systèmes de commande en ligne optimisés pour la restauration rapide avec gestion des menus, options de livraison et paiement sécurisé.',
    features: [
      'Commande en ligne',
      'Menu dynamique',
      'Géolocalisation',
      'Paiement intégré'
    ],
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    color: 'from-orange-400 to-red-400'
  },
  {
    id: 'e-commerce',
    icon: ShoppingCart,
    title: 'E-commerce',
    subtitle: 'Plateformes de vente en ligne',
    description: 'Boutiques en ligne complètes avec gestion avancée des stocks, catalogue produits, processus de commande et tableau de bord administrateur.',
    features: [
      'Catalogue produits',
      'Gestion stocks',
      'Processus commande',
      'Analytics ventes'
    ],
    technologies: ['Next.js', 'Prisma', 'Shopify', 'GraphQL'],
    color: 'from-blue-400 to-indigo-400'
  },
  {
    id: 'restaurant',
    icon: ChefHat,
    title: 'Restaurant Gastronomique',
    subtitle: 'Expérience culinaire premium',
    description: 'Sites vitrines élégants pour restaurants gastronomiques avec réservation en ligne, présentation du chef et menus saisonniers.',
    features: [
      'Réservation en ligne',
      'Galerie photos',
      'Menus saisonniers',
      'Événements privés'
    ],
    technologies: ['Gatsby', 'Contentful', 'Calendly', 'GSAP'],
    color: 'from-purple-400 to-pink-400'
  },
  {
    id: 'cafe',
    icon: Coffee,
    title: 'Café / Coffee-Shop',
    subtitle: 'Ambiance et convivialité',
    description: 'Plateformes modernes pour coffee shops avec commande à emporter, programme de fidélité et espace communautaire.',
    features: [
      'Commande à emporter',
      'Programme fidélité',
      'Événements culturels',
      'Espace communauté'
    ],
    technologies: ['React', 'Sanity', 'PWA', 'Vue.js'],
    color: 'from-amber-400 to-yellow-400'
  }
]

export default function Expertises() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.expertise-card')
      
      // Animation optimisée des cartes
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="expertises" className="section-padding bg-gradient-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-work-sans font-bold mb-6 text-foreground"
          >
            Nos Domaines d'Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto text-readable"
          >
            Nous développons des solutions web spécialisées pour différents secteurs d'activité, 
            avec une expertise technique adaptée à chaque domaine.
          </motion.p>
        </div>

        {/* Expertise Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {expertises.map((expertise, index) => {
            const IconComponent = expertise.icon
            return (
              <motion.div
                key={expertise.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="expertise-card card-professional p-8 hover-lift group relative overflow-hidden"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${expertise.color}`}></div>
                
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-violet-500/20 rounded-xl flex items-center justify-center group-hover:bg-violet-500 group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-violet-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-work-sans font-semibold text-foreground">
                        {expertise.title}
                      </h3>
                      <p className="text-violet-300 text-sm font-medium">
                        {expertise.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                  {expertise.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-work-sans font-medium text-foreground mb-3 text-sm">
                    Fonctionnalités clés :
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {expertise.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center text-xs text-slate-400"
                      >
                        <CheckCircle className="w-3 h-3 text-violet-400 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-work-sans font-medium text-foreground mb-3 text-sm">
                    Technologies utilisées :
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {expertise.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs font-medium hover:bg-violet-500/20 hover:text-violet-300 transition-colors duration-200 border border-slate-600/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Value Propositions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Zap,
              title: 'Performance optimisée',
              description: 'Sites rapides et bien référencés pour une expérience utilisateur optimale',
              color: 'text-yellow-400'
            },
            {
              icon: Shield,
              title: 'Sécurité renforcée',
              description: 'Protection des données clients et transactions sécurisées',
              color: 'text-green-400'
            },
            {
              icon: Users,
              title: 'Support continu',
              description: 'Accompagnement technique et maintenance évolutive',
              color: 'text-blue-400'
            }
          ].map((value, index) => {
            const IconComponent = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center card-professional p-6 hover-lift"
              >
                <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className={`w-6 h-6 ${value.color}`} />
                </div>
                <h3 className="font-work-sans font-semibold mb-2 text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="card-professional p-8 max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-xl font-work-sans font-semibold mb-4 text-foreground">
              Votre secteur ne figure pas dans la liste ?
            </h3>
            <p className="text-slate-300 mb-6">
              Nous adaptons nos solutions à tous types d'activités. 
              Parlons de vos besoins spécifiques.
            </p>
            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
              className="btn-professional"
            >
              Discuter de mon projet
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 