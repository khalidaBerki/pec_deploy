import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Fonction pour vérifier si l'utilisateur est connecté et si son email est vérifié
export default function useAuth() {
  const [user, setUser] = useState<any>(null);  // L'état de l'utilisateur
  const [loading, setLoading] = useState(true); // L'état de chargement
  const [isVerified, setIsVerified] = useState(false); // Vérifie si l'email est validé
  const router = useRouter();

  useEffect(() => {
    // Vérifier la session de l'utilisateur ou le token JWT
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check-session');  // Tu devras créer cette API
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setIsVerified(data.user.emailVerified);  // Si l'email est vérifié
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Si l'utilisateur est connecté et n'a pas vérifié son email, on le redirige
  useEffect(() => {
    if (!loading && user && !isVerified) {
      router.push('/auth/verify-email');  // Redirige vers une page de vérification si non vérifié
    }
  }, [loading, user, isVerified, router]);

  return { user, isVerified, loading };
}
