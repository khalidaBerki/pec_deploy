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
    const body = await request.json()
    const { image } = body

    if (!image) {
      return NextResponse.json({ error: "❌ Aucun URL d'image fourni." }, { status: 400 })
    }

    console.log("📸 Analyse de l'image en cours...")

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            Tu es une API d'intelligence artificielle utilisée par un Drive alimentaire, spécialisée dans la reconnaissance d'images et la génération de recettes de cuisine.

            🎯 **Tes capacités :**
            - Identifier les **ingrédients** d'un plat à partir d'une **photo** envoyée par l'utilisateur.
            - Proposer des **recettes adaptées** en fonction des ingrédients détectés ou demandés par l'utilisateur.
            - Si un ingrédient **manque** dans la base de produits, envoyer une **alerte à l'administrateur**.
            - Permettre à l'utilisateur d'écrire ce qu'il **a envie de manger aujourd'hui** et suggérer des plats correspondants.
            - Présenter les recettes sous une **forme attrayante**, avec des **étapes numérotées et des instructions bien structurées**.

            📌 **Règles pour tes réponses :**
            - Pour chaque **recette générée**, mets en évidence les **verbes d'action** en les entourant d'un \`<span class="font-bold text-blue-500"></span>\`.
            - Rends tes explications **claires**, avec un **ton amical et engageant**.
            - Si l'utilisateur mentionne un plat sans donner d'ingrédients, devine la recette en fonction de plats populaires et propose plusieurs options.
          `,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Quels ingrédients peux-tu identifier dans cette image ?" },
            { type: "image_url", image_url: { url: image } },
          ],
        },
      ],
      response_format: { type: "json_object" },
    })

    const content = response.choices[0]?.message?.content

    if (!content) {
      console.warn("⚠️ Aucune réponse valide de l'API OpenAI.")
      return NextResponse.json({ error: "Aucune réponse reçue de l'IA." }, { status: 500 })
    }

    console.log("✅ Réponse reçue :", content)

    const parsedContent = JSON.parse(content)

    return NextResponse.json(parsedContent)
  } catch (error: any) {
    console.error("❌ Erreur lors de l'analyse de l'image :", error)

    let errorMessage = "Erreur inconnue."
    if (error.response) {
      errorMessage = `Erreur OpenAI: ${error.response.data.error.message || "Réponse invalide."}`
    } else if (error.message) {
      errorMessage = `Erreur: ${error.message}`
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

