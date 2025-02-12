import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ingredients = searchParams.get("ingredients")

  try {
    let products

    if (ingredients) {
      const ingredientList = ingredients.split(",").map((i) => i.trim().toLowerCase())
      products = await prisma.produit.findMany({
        where: {
          OR: [
            {
              nom: {
                contains: ingredientList[0],
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: ingredientList[0],
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          categorie: true,
        },
      })
    } else {
      products = await prisma.produit.findMany({
        include: {
          categorie: true,
        },
      })
    }

    return NextResponse.json(products)
  } catch (error: any) {
    console.error("Erreur API produits:", error.message || error)
    return NextResponse.json({ error: "Erreur lors de la récupération des produits" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { productId } = await request.json()
    const product = await prisma.produit.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 })
    }

    // Logique pour ajouter le produit au panier (à implémenter selon votre structure de données)
    // Par exemple, ajouter le produit à une table "cart" dans la base de données

    return NextResponse.json({ message: "Produit ajouté au panier" })
  } catch (error) {
    console.error("Erreur API ajout au panier:", error)
    return NextResponse.json({ error: "Erreur lors de l'ajout au panier" }, { status: 500 })
  }
}
