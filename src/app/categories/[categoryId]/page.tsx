'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Pour récupérer le categoryId de l'URL
import { Produit } from '@/types/types'; // Assurez-vous d'avoir défini ce type
import prisma from '@/lib/prisma';

export default function ProductsByCategoryPage() {
  const { categoryId } = useParams();  // Récupérer l'ID de la catégorie depuis l'URL

  const [products, setProducts] = useState<Produit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // S'assurer que categoryId est bien disponible avant de lancer la requête
    if (!categoryId) return;

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/categories/${categoryId}`);
        if (!res.ok) {
          throw new Error(`Erreur : ${res.status}`);
        }

        const data: Produit[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération des produits');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId]);  // Le hook se déclenche chaque fois que categoryId change

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Produits de la catégorie {categoryId}</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-4">
              <h2 className="text-xl font-semibold">{product.nom}</h2>
              <p>{product.description}</p>
              <p className="text-green-600 font-medium mt-2">Prix : {product.prix} €</p>
              <p className="text-sm text-gray-500">Stock : {product.stock}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun produit trouvé pour cette catégorie.</p>
      )}
    </div>
  );
}
