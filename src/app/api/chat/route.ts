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
    const { messages, displayStyle } = await request.json()

    if (!Array.isArray(messages) || messages.length === 0 || !messages.every((m) => m.role && m.content)) {
      return NextResponse.json({ error: "Format de messages invalide" }, { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
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
            - Utilisez des emojis appropriés pour rendre la conversation plus engageante.
            - Adaptez votre réponse en fonction du style d'affichage demandé (shopping_list ou recipe).

            Format JSON pour la réponse :
            {
              "message": "Votre message convivial ici",
              "products": ["Nom du produit 1", "Nom du produit 2", ...],
              "recipe": {
                "name": "Nom de la recette",
                "ingredients": ["quantité ingrédient1", "quantité ingrédient2", ...],
                "instructions": ["étape 1", "étape 2", ...]
              }
            }
          `,
        },
        ...messages,
        {
          role: "user",
          content: `Répondez en utilisant le style d'affichage : ${displayStyle || "recipe"}`,
        },
      ],
      // max_tokens: 1000,
    })

    const content = response.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json({ error: "Aucune réponse valide de l'API OpenAI" }, { status: 500 })
    }

    // Parse the JSON response
    const parsedContent = JSON.parse(content)

    return NextResponse.json(parsedContent)
  } catch (error) {
    console.error("❌ Erreur dans le chat :", error)
    return NextResponse.json({ error: "Erreur lors du traitement de la requête de chat" }, { status: 500 })
  }
}

