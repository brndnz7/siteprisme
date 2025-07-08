import { useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  PenTool, 
  Code, 
  Rocket, 
  CheckCircle,
} from 'lucide-react'

const processSteps = [
  {
    id: 1,
    icon: MessageSquare,
    title: 'Analyse & Stratégie',
    description: 'Nous analysons vos besoins, votre marché et définissons ensemble la stratégie digitale la plus adaptée à vos objectifs.',
    details: [
      'Audit de l\'existant',
      'Analyse concurrentielle',
      'Définition des objectifs',
      'Stratégie UX/UI'
    ],
    color: 'from-violet-400 to-purple-400'
  },
  {
    id: 2,
    icon: PenTool,
    title: 'Design & Prototypage',
    description: 'Création des maquettes et prototypes interactifs en respectant votre identité visuelle et les meilleures pratiques UX.',
    details: [
      'Wireframes détaillés',
      'Design system',
      'Maquettes interactives',
      'Tests utilisateurs'
    ],
    color: 'from-purple-400 to-pink-400'
  },
  {
    id: 3,
    icon: Code,
    title: 'Développement',
    description: 'Développement sur mesure avec les technologies les plus adaptées, en respectant les standards de qualité et de performance.',
    details: [
      'Code optimisé',
      'Tests automatisés',
      'Responsive design',
      'SEO technique'
    ],
    color: 'from-indigo-400 to-blue-400'
  },
  {
    id: 4,
    icon: Rocket,
    title: 'Lancement & Suivi',
    description: 'Mise en ligne, formation et accompagnement continu pour garantir le succès de votre projet sur le long terme.',
    details: [
      'Déploiement sécurisé',
      'Formation équipe',
      'Monitoring performance',
      'Support technique'
    ],
    color: 'from-emerald-400 to-teal-400'
  }
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} id="processus" className="section-padding bg-gradient-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-work-sans font-bold mb-6 text-foreground"
          >
            Notre Processus de Développement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto text-readable"
          >
            Une méthodologie éprouvée pour transformer vos idées en solutions digitales performantes, 
            en respectant vos délais et votre budget.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="space-y-8 lg:space-y-12 mb-16 flex flex-col items-center">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0 relative flex flex-col items-center lg:items-start">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-slate-700 text-violet-300 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 border-violet-400">
                    {step.id}
                  </div>
                  
                  {/* Connecting line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 sm:top-24 left-1/2 w-px h-16 lg:h-24 bg-gradient-to-b from-violet-400/50 to-transparent transform -translate-x-1/2"></div>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 card-professional p-6 lg:p-8 hover-lift w-full max-w-lg lg:max-w-none">
                  <div className="text-center lg:text-left">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-gradient-to-r ${step.color} text-white`}>
                      Étape {step.id}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-work-sans font-bold mb-4 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-slate-300 mb-6 leading-relaxed text-sm sm:text-base">
                      {step.description}
                    </p>
                    
                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 justify-items-center lg:justify-items-start">
                      {step.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detail}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.1) + (detailIndex * 0.1) }}
                          className="flex items-center text-xs sm:text-sm text-slate-400 bg-slate-700/30 px-3 py-2 rounded-lg w-full max-w-xs lg:max-w-none"
                        >
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400 mr-2 sm:mr-3 flex-shrink-0" />
                          {detail}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="card-professional p-6 lg:p-8 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400"></div>
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-work-sans font-semibold mb-4 text-foreground">
              Prêt à démarrer votre projet ?
            </h3>
            <p className="text-slate-300 mb-6 text-sm sm:text-base">
              Discutons de vos besoins et voyons comment notre processus peut s'adapter 
              à vos objectifs spécifiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
                className="btn-professional"
              >
                Démarrer mon projet
              </button>
              <button
                onClick={() => {
                  document.getElementById('portfolio')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
                className="btn-outline-professional"
              >
                Voir nos réalisations
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 