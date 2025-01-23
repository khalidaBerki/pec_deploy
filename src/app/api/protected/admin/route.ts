import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Token manquant' }, { status: 401 });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Vérifier si 'decoded' est un objet et contient la propriété 'role'
    if (typeof decoded !== 'string' && (decoded as JwtPayload).role === 'admin') {
      return NextResponse.json({ message: 'Accès autorisé aux admins' });
    } else {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
  }
}
