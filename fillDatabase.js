import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchAndInsertData() {
  try {
    const response = await fetch('https://world.openfoodfacts.org/cgi/search.pl?search_terms=food&action=process&json=true');
    const data = await response.json();

    if (data && Array.isArray(data.products)) {
      console.log(`Nombre de produits récupérés : ${data.products.length}`);

      for (const product of data.products) {
        if (!product.product_name || !product.categories) continue;

        // Gérer les catégories multiples
        const categoryNames = product.categories.split(',').map(cat => cat.trim());
        let lastCategory = null;

        for (const categoryName of categoryNames) {
          lastCategory = await prisma.categorie.upsert({
            where: { nom: categoryName },
            update: {},
            create: { nom: categoryName },
          });
        }

        // Ajouter le produit
        await prisma.produit.create({
          data: {
            nom: product.product_name || 'Nom non disponible',
            description: product.ingredients_text_fr || 'Description non disponible',
            prix: Math.random() * 100,
            stock: Math.floor(Math.random() * 100) + 1,
            categorieId: lastCategory ? lastCategory.id : null,
          },
        });

        console.log(`Produit "${product.product_name}" ajouté.`);
      }
    } else {
      console.error('Erreur : La réponse API ne contient pas de tableau "products".');
    }
  } catch (error) {
    console.error('Erreur lors de l\'insertion dans la base de données', error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAndInsertData();
