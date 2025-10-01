import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, AlertCircle, MessageSquare, FileText, Rocket } from 'lucide-react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { useToast } from '@/hooks/use-toast'

interface FormData {
  nom: string
  email: string
  telephone: string
  entreprise: string
  typeProjet: string
  description: string
}

const typesProjet = [
  { value: 'vitrine', label: 'Site vitrine' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'application', label: 'Application web' },
  { value: 'refonte', label: 'Refonte de site' },
  { value: 'autre', label: 'Autre projet' }
]

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    typeProjet: '',
    description: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis'
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }
    if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis'
    if (!formData.typeProjet) newErrors.typeProjet = 'Le type de projet est requis'
    if (!formData.description.trim()) {
      newErrors.description = 'La description du projet est requise'
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Veuillez détailler davantage votre projet (minimum 20 caractères)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/mjkrqeba", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          entreprise: formData.entreprise,
          typeProjet: formData.typeProjet,
          description: formData.description
        })
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi")
      }
      
      toast({
        title: "Message envoyé !",
        description: "Nous vous recontacterons dans les plus brefs délais.",
      })
      
      // Reset form
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        entreprise: '',
        typeProjet: '',
        description: ''
      })
      
    } catch (error) {
      toast({
        title: "Erreur d'envoi",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="contact" className="section-padding bg-gradient-main">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-work-sans font-bold mb-6 text-foreground"
            >
              Discutons de votre projet
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto text-readable"
            >
              Partagez-nous vos besoins et nous vous proposerons une solution sur mesure 
              parfaitement adaptée à vos objectifs.
            </motion.p>
          </div>

          {/* Form Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="card-professional p-8 space-y-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400/60 via-cyan-500/60 to-sky-600/60"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom */}
                <div className="space-y-2">
                  <Label htmlFor="nom" className="font-medium text-foreground">
                    Nom complet *
                  </Label>
                  <Input
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    placeholder="Votre nom et prénom"
                    className={`form-input-professional ${errors.nom ? 'border-red-400 focus:border-red-400' : ''}`}
                  />
                  {errors.nom && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.nom}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium text-foreground">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre@email.com"
                    className={`form-input-professional ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Téléphone */}
                <div className="space-y-2">
                  <Label htmlFor="telephone" className="font-medium text-foreground">
                    Téléphone *
                  </Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    placeholder="06 12 34 56 78"
                    className={`form-input-professional ${errors.telephone ? 'border-red-400 focus:border-red-400' : ''}`}
                  />
                  {errors.telephone && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.telephone}
                    </p>
                  )}
                </div>

                {/* Entreprise */}
                <div className="space-y-2">
                  <Label htmlFor="entreprise" className="font-medium text-foreground">
                    Entreprise
                  </Label>
                  <Input
                    id="entreprise"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={(e) => handleInputChange('entreprise', e.target.value)}
                    placeholder="Nom de votre entreprise"
                    className="form-input-professional"
                  />
                </div>
              </div>

              {/* Type de projet */}
              <div className="space-y-2">
                <Label className="font-medium text-foreground">Type de projet *</Label>
                <Select 
                  name="typeProjet"
                  value={formData.typeProjet} 
                  onValueChange={(value) => handleInputChange('typeProjet', value)}
                >
                  <SelectTrigger className={`form-input-professional ${errors.typeProjet ? 'border-red-400' : ''}`}>
                    <SelectValue placeholder="Sélectionnez le type de projet" />
                  </SelectTrigger>
                  <SelectContent className="glass-strong">
                    {typesProjet.map((type) => (
                                              <SelectItem key={type.value} value={type.value} className="text-slate-700 hover:glass-light focus:glass-light">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.typeProjet && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.typeProjet}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium text-foreground">
                  Description du projet *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Décrivez votre projet : objectifs, fonctionnalités souhaitées, cible, contraintes particulières..."
                  rows={5}
                  className={`form-input-professional resize-none ${errors.description ? 'border-red-400 focus:border-red-400' : ''}`}
                />
                <div className="flex justify-between items-center">
                  {errors.description ? (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.description}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-500">
                      Minimum 20 caractères
                    </p>
                  )}
                  <span className="text-sm text-slate-500">
                    {formData.description.length}/500
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-professional py-4 text-lg group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-sm text-slate-500 text-center mt-4">
                  Nous vous recontacterons dans les 24h pour discuter de votre projet.
                </p>
              </div>
            </form>
          </motion.div>

          {/* Additional Info Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'Échange initial',
                description: 'Discussion de vos besoins et objectifs',
                icon: MessageSquare,
                color: 'text-slate-600'
              },
              {
                title: 'Proposition technique',
                description: 'Solution adaptée avec technologies recommandées',
                icon: FileText,
                color: 'text-gray-600'
              },
              {
                title: 'Démarrage projet',
                description: 'Planning et mise en place de l\'équipe',
                icon: Rocket,
                color: 'text-slate-700'
              }
            ].map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center card-professional p-6 hover-lift shadow-sm"
                >
                  <div className="w-12 h-12 glass-icon rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <IconComponent className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <h4 className="font-work-sans font-semibold mb-2 text-foreground">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 