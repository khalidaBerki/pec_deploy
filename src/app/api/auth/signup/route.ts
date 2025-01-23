import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Expression régulière pour valider un email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const { email, password, nom, adresse, telephone, role } = await req.json();

  // Vérifier les champs obligatoires
  const missingFields = [];
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (!role) missingFields.push("role");

  // Validation de l'email
  if (email && !emailRegex.test(email)) {
    return NextResponse.json(
      { error: `L&apos;email fourni n&apos;est pas valide.` },
      { status: 400 }
    );
  }

  // Validation pour le rôle client
  if (role === 'client') {
    if (!nom) missingFields.push("nom");
    if (!telephone) {
      missingFields.push("telephone");
    } else if (!/^\d{10}$/.test(telephone)) { // Format de 10 chiffres
      return NextResponse.json(
        { error: `Le numéro de téléphone doit contenir exactement 10 chiffres.` },
        { status: 400 }
      );
    }
  }

  // Retourner une erreur si des champs sont manquants
  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Les champs suivants sont obligatoires : ${missingFields.join(', ')}.` },
      { status: 400 }
    );
  }
  // Vérifier si l'email existe déjà
  const existingUser = await prisma.utilisateur.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: `Cet email est déjà utilisé.` }, { status: 400 });
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer l'utilisateur
  const user = await prisma.utilisateur.create({
    data: {
      email,
      passwordHash: hashedPassword,
      nom,
      adresse,
      phone: telephone,
      type: {
        connect: { id: role === 'client' ? 1 : 2 }, // En supposant que les rôles sont définis par ID
      },
    },
  });

  return NextResponse.json(user);
}
