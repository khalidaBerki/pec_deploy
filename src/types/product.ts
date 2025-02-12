<<<<<<< HEAD
export type Product = {
  image: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  profit: number;
};
=======
export interface Product {
  id: number
  nom: string
  description: string
  prix: number
  stock: number
  categorieId: number
  image: string | null
}

>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
