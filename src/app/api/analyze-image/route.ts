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
          content:
            "Vous êtes un assistant spécialisé dans l'analyse d'images de nourriture. Votre tâche est d'identifier les ingrédients visibles dans l'image et de les lister.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Identifiez les ingrédients visibles dans cette image de nourriture." },
            { type: "image_url", image_url: { url: image } },
          ],
        },
      ],
      max_tokens: 300,
    })

    const content = response.choices[0]?.message?.content

    if (!content) {
      console.warn("⚠️ Aucune réponse valide de l'API OpenAI.")
      return NextResponse.json({ error: "Aucune réponse reçue de l'IA." }, { status: 500 })
    }

    console.log("✅ Réponse reçue :", content)

    // Extraction des ingrédients depuis la réponse
    const ingredients = content
      .split("\n")
      .filter((item) => item.trim() !== "" && item.startsWith("-"))
      .map((item) => ({ name: item.replace(/^-\s*/, "").trim() }))

    return NextResponse.json({ ingredients })
  } catch (error: any) {
    console.error("❌ Erreur lors de l'analyse de l'image :", error)
    return NextResponse.json({ error: "Erreur lors de l'analyse de l'image" }, { status: 500 })
  }
}

