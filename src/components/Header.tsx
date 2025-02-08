import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo ou Titre */}
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-300">
            Mon Application
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-4">
          <Link href="/categories" className="hover:text-gray-300">
            Catégories
          </Link>
          <Link href="/products" className="hover:text-gray-300">
            Produits
          </Link>
          <Link href="/login" className="hover:text-gray-300">
            Se connecter
          </Link>
          <Link href="/auth/signup" className="hover:text-gray-300">
            S'inscrire
          </Link>
          <Link href="/ia-shopper" className="hover:text-gray-300">
            IA Shopper
          </Link>
        </nav>
      </div>
    </header>
  );
}
