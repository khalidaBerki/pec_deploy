import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma"; // Assurez-vous que prisma est bien importé
import jwt from "jsonwebtoken";

export async function GET(req: Request, context: { params: { utilisateurId: string } }) {
  const { utilisateurId } = await context.params;  // Extraire l'ID utilisateur des paramètres

  // Récupérer le token JWT de l'utilisateur connecté
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
  }

  // Vérifier le token JWT
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "JWT secret non défini" }, { status: 500 });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    return NextResponse.json({ message: "Token invalide ou expiré" }, { status: 401 });
  }

  // Vérifier si l'utilisateur connecté est le propriétaire du panier
  if (decoded.userId !== parseInt(utilisateurId)) {
    return NextResponse.json({ message: "Accès non autorisé" }, { status: 403 });
  }

  // Convertir l'ID utilisateur en entier
  const utilisateurIdInt = parseInt(utilisateurId);

  // Vérification si l'ID utilisateur est valide
  if (isNaN(utilisateurIdInt)) {
    return NextResponse.json({ message: "ID utilisateur invalide" }, { status: 400 });
  }

  try {
    // Récupérer tous les éléments du panier pour cet utilisateur
    const cartItems = await prisma.cart.findMany({
      where: {
        utilisateurId: utilisateurIdInt,  // Filtrer les éléments du panier pour l'utilisateur donné
      },
      include: {
        produit: true,  // Inclure les informations du produit lié à chaque élément du panier
      },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ message: "Aucun produit dans le panier." }, { status: 404 });
    }

    return NextResponse.json(cartItems, { status: 200 });  // Retourner les éléments du panier avec les produits
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur lors de la récupération du panier" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { utilisateurId: string } }) {
  const { utilisateurId } = await context.params;
  const { productId, removeAll } = await req.json();

  // Récupérer le token JWT de l'utilisateur connecté
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
  }

  // Vérifier le token JWT
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "JWT secret non défini" }, { status: 500 });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    return NextResponse.json({ message: "Token invalide ou expiré" }, { status: 401 });
  }

  // Vérifier si l'utilisateur connecté est le propriétaire du panier
  if (decoded.userId !== parseInt(utilisateurId)) {
    return NextResponse.json({ message: "Accès non autorisé" }, { status: 403 });
  }

  // Convertir l'ID utilisateur et produit en entier
  const utilisateurIdInt = parseInt(utilisateurId);
  const productIdInt = parseInt(productId);

  // Vérification si les ID sont valides
  if (isNaN(utilisateurIdInt) || isNaN(productIdInt)) {
    return NextResponse.json({ message: "ID utilisateur ou produit invalide" }, { status: 400 });
  }

  try {
    const cartItem = await prisma.cart.findFirst({
      where: {
        utilisateurId: utilisateurIdInt,
        produitId: productIdInt,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ message: "Produit non trouvé dans le panier." }, { status: 404 });
    }

    if (removeAll || cartItem.quantite === 1) {
      // Supprimer l'élément du panier
      await prisma.cart.delete({
        where: { id: cartItem.id },
      });
    } else {
      // Décrémenter la quantité
      await prisma.cart.update({
        where: { id: cartItem.id },
        data: { quantite: cartItem.quantite - 1 },
      });
    }

    return NextResponse.json({ message: "Produit mis à jour dans le panier." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur lors de la mise à jour du produit dans le panier" }, { status: 500 });
  }
}
