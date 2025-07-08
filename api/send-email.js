import { Resend } from 'resend'

const resend = new Resend('re_GdQ1HYTX_Jh1TiXF5BtNw9S9azWdq8cK2')

export default async function handler(req, res) {
  console.log('API appelée avec méthode:', req.method)
  console.log('Body reçu:', req.body)

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    console.log('Méthode non autorisée:', req.method)
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { nom, email, telephone, entreprise, typeProjet, description } = req.body

  if (!nom || !email || !telephone || !typeProjet || !description) {
    console.log('Champs manquants:', { nom: !!nom, email: !!email, telephone: !!telephone, typeProjet: !!typeProjet, description: !!description })
    return res.status(400).json({ error: 'Champs requis manquants' })
  }

  try {
    console.log('Tentative d\'envoi email...')
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'nrb5867@gmail.com',
      subject: `Nouveau message de ${nom} via le formulaire`,
      html: `
        <h2>Nouveau message du formulaire de contact</h2>
        <p><b>Nom :</b> ${nom}</p>
        <p><b>Email :</b> ${email}</p>
        <p><b>Téléphone :</b> ${telephone}</p>
        <p><b>Entreprise :</b> ${entreprise || '-'}</p>
        <p><b>Type de projet :</b> ${typeProjet}</p>
        <p><b>Description :</b><br/>${description.replace(/\n/g, '<br/>')}</p>
      `
    })

    if (error) {
      console.error('Erreur Resend:', error)
      return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email', details: error })
    }

    console.log('Email envoyé avec succès:', data)
    return res.status(200).json({ success: true, data })
  } catch (error) {
    console.error('Erreur API:', error)
    console.error('Stack trace:', error.stack)
    return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email', details: error.message })
  }
} 