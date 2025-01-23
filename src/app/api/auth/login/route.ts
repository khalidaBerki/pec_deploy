import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Rechercher l'utilisateur par email
  const user = await prisma.utilisateur.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }

  // Vérifier que la clé secrète est présente
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('JWT_SECRET est manquant dans le fichier .env');
  }

  // Générer un token JWT
  const token = jwt.sign({ userId: user.id, role: user.typeId }, secretKey, {
    expiresIn: '1h',
  });

  // Stocker la session dans la base de données (des que session est ajoutée)
  
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Expire dans 1 heure
    },
 });

  return NextResponse.json({ token }, { status: 200 });
}
