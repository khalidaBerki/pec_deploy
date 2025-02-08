import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.split(' ')[1];  // On récupère le token JWT du header Authorization

  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    // Décode le token JWT pour récupérer l'ID de l'utilisateur
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'JWT secret non défini' }, { status: 500 });
    }
    const decoded: any = jwt.verify(token, secret);
    
    // Récupère l'utilisateur dans la base de données
    const user = await prisma.utilisateur.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 401 });
  }
}