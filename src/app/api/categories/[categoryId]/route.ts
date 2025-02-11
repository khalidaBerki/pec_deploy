import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { categoryId: string } }) {
  const { categoryId } = await context.params;

  try {
    const categoryIdInt = parseInt(categoryId);
    if (isNaN(categoryIdInt)) {
      return NextResponse.json({ message: 'ID de catégorie invalide' }, { status: 400 });
    }

    const category = await prisma.categorie.findUnique({
      where: { id: categoryIdInt },
    });

    if (!category) {
      return NextResponse.json({ message: 'Catégorie non trouvée' }, { status: 404 });
    }

    const products = await prisma.produit.findMany({
      where: {
        categorieId: categoryIdInt,
      },
    });

    if (products.length === 0) {
      return NextResponse.json({ message: 'Aucun produit trouvé pour cette catégorie' }, { status: 404 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erreur lors de la récupération des produits' }, { status: 500 });
  }
}
