'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Categorie } from '@/types/types';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) {
          throw new Error(`Erreur: ${res.status}`);
        }
        const data: Categorie[] = await res.json();
        setCategories(data);
      } catch (err: any) {
        console.error('Erreur lors de la récupération des catégories:', err.message);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Catégories</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(categories) && categories.map((category) => (
          <li
            key={category.id}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <Link href={`/categories/${category.id}`} passHref>
              <div className="block w-full h-full">
                <h3 className="text-sm text-gray-700">{category.nom}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
