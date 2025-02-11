import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.categorie.findMany();

    if (categories.length === 0) {
      return NextResponse.json({ message: 'Aucune catégorie trouvée' }, { status: 404 });
    }

    return NextResponse.json(categories);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erreur API catégories:', error.message);
    } else {
      console.error("Unknown error occurred");
    }
    return NextResponse.json({ error: 'Erreur lors de la récupération des catégories' }, { status: 500 });
  }
}
