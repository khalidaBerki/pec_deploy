import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { productId: string } }) {
  const { productId } = await context.params;  // Utilisation de `await` pour accéder correctement à `params`

  // Vérification si productId est un entier valide
  const productIdInt = parseInt(productId);
  if (isNaN(productIdInt)) {
    return NextResponse.json({ message: "ID produit invalide" }, { status: 400 });
  }

  try {
    // Recherche du produit par son ID
    const product = await prisma.produit.findUnique({
      where: {
        id: productIdInt, // Utilisation de l'ID valide
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Produit non trouvé" }, { status: 404 });
    }

    return NextResponse.json(product);  // Retourner le produit complet ou vous pouvez spécifier un `select`
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown error occurred");
    }
    return NextResponse.json({ message: "Erreur lors de la récupération du produit" }, { status: 500 });
  }
}
