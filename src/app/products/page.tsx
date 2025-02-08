"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Produit } from "@prisma/client";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode v4.0.0

export default function ProductsPage() {
  const [products, setProducts] = useState<Produit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Produit[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error(`Erreur: ${res.status}`);
        }
        const data: Produit[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors de la récupération des produits");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    // Decode JWT to retrieve user ID
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token); // Using jwtDecode correctly
        setUserId(decoded.userId);
      } catch (err) {
        console.error("Erreur de décodage du token", err);
      }
    }
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  const addToCart = async (product: Produit) => {
    if (!userId) {
      alert("Veuillez vous connecter pour ajouter des produits au panier.");
      return;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ utilisateurId: userId, productId: product.id }),
      });

      if (!res.ok) {
        throw new Error(`Erreur: ${res.status}`);
      }

      const { cartItem } = await res.json();
      setCart((prevCart) => [...prevCart, cartItem.produit]);
    } catch (err: any) {
      console.error("Erreur lors de l'ajout au panier:", err.message);
    }
  };

  if (loading) return <div className="text-center p-4">Chargement...</div>;
  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Tous les produits</h1>

      {products.length > 0 ? (
        <ul className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {products.map((product) => (
            <li
              key={product.id}
              className="w-72 rounded shadow-lg mx-auto border border-gray-200 p-4 bg-white"
            >
              <Link href={`/products/${product.id}`} className="block">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.nom}
                    className="w-full h-48 object-cover rounded-lg shadow mb-3"
                  />
                ) : null}
                <h3 className="text-xl font-semibold mb-1">{product.nom}</h3>
                <p className="text-gray-600 text-sm mb-1">{product.description}</p>
                <p className="text-green-600 font-medium text-lg">Prix : {product.prix} €</p>
                <p className="text-sm text-gray-500">Stock : {product.stock}</p>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Ajouter au panier
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">Aucun produit trouvé.</p>
      )}
    </div>
  );
}
