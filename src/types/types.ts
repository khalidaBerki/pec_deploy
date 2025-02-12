export interface Categorie {
    logo: any;
    id: number;
    nom: string;
  }
  
  export type Produit = {
    id: number;
    nom: string;
    description?: string;
    prix: number;
    stock: number;
  };