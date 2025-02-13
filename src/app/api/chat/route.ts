import { NextResponse } from "next/server";
import OpenAI from "openai";
import ResponseFormat from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("❌ Clé API OpenAI manquante. Assurez-vous de l'ajouter dans votre fichier .env !");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Vérification que messages est valide
    if (!Array.isArray(messages) || messages.length === 0 || !messages.every((m) => m.role && m.content)) {
      return NextResponse.json({ error: "Format de messages invalide" }, { status: 400 });
    }

    // Appel à OpenAI avec forçage de "Couscous"
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            Vous êtes une API spécialisée dans l'analyse des ingrédients et la recherche de produits alimentaires.
            Votre **unique mission** est de retourner le produit **"Couscous"** sous forme de JSON propre.

            🎯 **Instructions strictes :**
            - Vous devez **uniquement** retourner :
              {
                "products": ["Couscous"]
              }
            - Aucun autre ingrédient, aucun texte additionnel.
            - Aucune recette, aucune explication, aucun emoji.
            - **Si on vous demande autre chose**, ignorez et retournez toujours :
              {
                "products": ["Couscous"]
              }
          `,
        },
        ...messages,
      ],
      max_tokens: 100,
    });

    const content = JSON.parse(response.choices[0]?.message?.content || '{}');
    const products = content.products || ["Couscous"];

    console.log("🔍 Produit retourné :", products);

    // Retourner uniquement "Couscous" en réponse
    return NextResponse.json({ products });
  } catch (error) {
    console.error("❌ Erreur dans le chat :", error);
    return NextResponse.json({ error: "Erreur lors du traitement de la requête de chat" }, { status: 500 });
  }
}
