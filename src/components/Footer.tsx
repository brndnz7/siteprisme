import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    services: [
      { name: 'Développement web', href: '#expertises' },
      { name: 'E-commerce', href: '#expertises' },
      { name: 'Applications web', href: '#expertises' },
      { name: 'Refonte de sites', href: '#expertises' }
    ],
    company: [
      { name: 'À propos', href: '#' },
      { name: 'Nos réalisations', href: '#portfolio' },
      { name: 'Notre processus', href: '#processus' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Support technique', href: '#' },
      { name: 'FAQ', href: '#' }
    ],
    legal: [
      { name: 'Mentions légales', href: '#' },
      { name: 'Politique de confidentialité', href: '#' },
      { name: 'Conditions générales', href: '#' },
      { name: 'RGPD', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-500' }
  ]

  const contactInfo = [
    { icon: Mail, text: 'contact@siteprisme.fr', href: 'mailto:contact@siteprisme.fr' },
    { icon: Phone, text: '06 21 91 83 35', href: 'tel:+33621918335' },
    { icon: MapPin, text: 'Strasbourg, France', href: '#' }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="container-custom pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-work-sans font-bold text-white mb-3">
                SitePrisme
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Nous créons des expériences digitales exceptionnelles qui transforment 
                vos idées en solutions performantes et sur mesure.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon
                return (
                  <motion.a
                    key={contact.text}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-slate-400 hover:text-violet-300 transition-colors duration-200 group"
                  >
                    <div className="w-5 h-5 mr-3 text-violet-400 group-hover:text-violet-300 transition-colors">
                      <IconComponent size={20} />
                    </div>
                    {contact.text}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-work-sans font-semibold text-white mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {links.services.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-violet-300 transition-colors duration-200 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-work-sans font-semibold text-white mb-4">
              Entreprise
            </h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-violet-300 transition-colors duration-200 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-violet-500/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 ${social.color} transition-all duration-200 hover:bg-violet-500/20 hover:scale-110`}
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                )
              })}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-400">
              <p>&copy; {currentYear} SitePrisme. Tous droits réservés.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 