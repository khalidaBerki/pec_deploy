'use client';  // Assure-toi que ce composant est exécuté côté client

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const UserCartPage = () => {
  const { utilisateurId } = useParams(); // Récupérer l'ID utilisateur à partir des paramètres d'URL
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const res = await fetch(`/api/cart/${utilisateurId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCartItems(data);
      } else {
        const errorData = await res.json();
        setError(errorData.message);
        if (res.status === 403) {
          router.push('/auth/login');
        }
      }
      setLoading(false);
    };

    fetchCartItems();
  }, [utilisateurId, router]);

  const handleRemoveItem = async (productId: number, removeAll: boolean = false) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const res = await fetch(`/api/cart/${utilisateurId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, removeAll }),
      });

      if (res.ok) {
        if (removeAll) {
          setCartItems((prevItems) => prevItems.filter((item) => item.produitId !== productId));
        } else {
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item.produitId === productId ? { ...item, quantite: item.quantite - 1 } : item
            ).filter((item) => item.quantite > 0)
          );
        }
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit du panier:', error);
      setError('Erreur lors de la suppression du produit du panier');
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Panier de l'utilisateur {utilisateurId}</h1>
      {cartItems.length === 0 ? (
        <p>Aucun produit dans le panier.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div>
                <img src={item.image} alt={item.produit.nom} width="100" />
                <h3>{item.produit.nom}</h3>
                <p>Quantité : {item.quantite}</p>
                <p>Prix : {item.prix}€</p>
                <button onClick={() => handleRemoveItem(item.produitId)}>Diminuer la quantité</button>
                <button onClick={() => handleRemoveItem(item.produitId, true)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserCartPage;
