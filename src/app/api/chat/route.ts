import { NextResponse } from "next/server"
import OpenAI from "openai"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("❌ Clé API OpenAI manquante. Assurez-vous de l'ajouter dans votre fichier .env !")
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const response = await openai.chat.completions.create({
      model: "gpt-4-o",
      messages: [
        {
          role: "system",
          content: `
            Vous êtes un assistant culinaire intelligent pour un service de livraison de courses. Vos tâches incluent :
            1. Suggérer des idées de repas basées sur les préférences de l'utilisateur.
            2. Fournir des recettes détaillées avec ingrédients et quantités.
            3. Aider à créer des listes de courses basées sur les recettes ou les ingrédients manquants.
            4. Répondre aux questions sur la cuisine et les aliments.

            Règles importantes :
            - Soyez toujours poli et amical dans vos réponses.
            - Si on vous demande une recette, fournissez toujours les ingrédients avec leurs quantités et les étapes de préparation.
            - À la fin de chaque réponse, suggérez à l'utilisateur de consulter la page des produits pour les ingrédients manquants.
            - Utilisez des emojis appropriés pour rendre la conversation plus engageante.
          `,
        },
        ...messages,
      ],
      max_tokens: 500,
    })

    const content = response.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json({ error: "Aucune réponse valide de l'API OpenAI" }, { status: 500 })
    }

    return NextResponse.json({ message: content })
  } catch (error) {
    console.error("❌ Erreur dans le chat :", error)
    return NextResponse.json({ error: "Erreur lors du traitement de la requête de chat" }, { status: 500 })
  }
}

