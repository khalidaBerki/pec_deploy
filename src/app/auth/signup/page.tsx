'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Changed from motDePasse to password for consistency
  const [prenom, setprenom] = useState(''); // Changed from prenom to prenom
  const [nom, setnom] = useState(''); // Changed from nom to nom
  const [address, setAddress] = useState(''); // Changed from adresse to address
  const [telephone, settelephone] = useState(''); // Changed from telephone to phone
  const [role, setRole] = useState('client'); // Default role
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche la soumission du formulaire par défaut
  
    // Log des données envoyées pour le débogage
    console.log({
      email,
      password,
      prenom,
      nom,
      address,
      telephone,
      role,
    });
  
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          prenom,
          nom,
          address,
          telephone,
          role,
        }),
      });
  
      if (res.ok) {
        // Succès : redirection vers la page de connexion
        router.push('/auth/login');
      } else {
        // Vérifie si la réponse est en JSON
        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          alert(errorData.error || 'Une erreur est survenue.');
        } else {
          // Si la réponse n'est pas en JSON
          alert('Erreur inattendue. Veuillez réessayer.');
        }
      }
    } catch (err) {
      // Gestion des erreurs réseau ou autres exceptions
      console.error('Erreur lors de la requête:', err);
      alert('Impossible de contacter le serveur. Vérifiez votre connexion.');
    }
  };
  
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
          width={40}
          height={40}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          S'inscrire
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSignUp}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Mot de passe
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* First Name Field */}
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium leading-6 text-gray-900">
              Prénom
            </label>
            <div className="mt-2">
              <input
                id="prenom"
                name="prenom"
                type="text"
                value={prenom}
                onChange={(e) => setprenom(e.target.value)}
                placeholder="Prénom"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Last Name Field */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium leading-6 text-gray-900">
              Nom
            </label>
            <div className="mt-2">
              <input
                id="nom"
                name="nom"
                type="text"
                value={nom}
                onChange={(e) => setnom(e.target.value)}
                placeholder="Nom"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Adresse
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Adresse"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* telephone Field */}
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium leading-6 text-gray-900">
              Téléphone
            </label>
            <div className="mt-2">
              <input
                id="telephone"
                name="telephone"
                type="text"
                value={telephone}
                onChange={(e) => settelephone(e.target.value)}
                placeholder="Téléphone"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
              Rôle
            </label>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit" // Ensure this button submits the form
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
