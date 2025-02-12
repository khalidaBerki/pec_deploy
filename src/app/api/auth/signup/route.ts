import { NextResponse } from 'next/server';
<<<<<<< HEAD
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
=======
import { PrismaClient, Role } from '@prisma/client'; 
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const { email, password, nom, adresse, telephone } = await req.json();

  // Check for missing fields
  const missingFields: string[] = [];
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (!nom) missingFields.push("nom");
  if (!telephone) {
    missingFields.push("telephone");
  } else if (!/^\d{10}$/.test(telephone)) { // Validate 10-digit phone number
    return NextResponse.json(
      { error: `Le numéro de téléphone doit contenir exactement 10 chiffres.` },

>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
      { status: 400 }
    );
  }

<<<<<<< HEAD
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
=======

  // Return error if fields are missing

>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Les champs suivants sont obligatoires : ${missingFields.join(', ')}.` },
      { status: 400 }
    );
  }
<<<<<<< HEAD
  // Vérifier si l'email existe déjà
=======

  // Validate email format
  if (email && !emailRegex.test(email)) {
    return NextResponse.json(
      { error: `L'email fourni n'est pas valide.` },
      { status: 400 }
    );
  }

  // Check if the email already exists

>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
  const existingUser = await prisma.utilisateur.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: `Cet email est déjà utilisé.` }, { status: 400 });
  }

<<<<<<< HEAD
  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer l'utilisateur
=======
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user with 'CLIENT' role

>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
  const user = await prisma.utilisateur.create({
    data: {
      email,
      passwordHash: hashedPassword,
      nom,
      adresse,
      phone: telephone,
<<<<<<< HEAD
      type: {
        connect: { id: role === 'client' ? 1 : 2 }, // En supposant que les rôles sont définis par ID
      },
    },
  });

=======
      role: Role.CLIENT, // Set role to CLIENT
    },
  });

  // Vérifie que la clé secrète JWT pour la vérification est présente
  const secretKey = process.env.JWT_SECRET_Mail;
  if (!secretKey) {
    return NextResponse.json({ error: 'Clé secrète de vérification manquante' }, { status: 500 });
  }

  // Générer un token de vérification
  const verificationToken = jwt.sign({ userId: user.id }, secretKey, {
    expiresIn: '1d', // Le token expire dans 1 jour
  });

  // URL de vérification
  const verificationUrl = `http://localhost:3000/auth/verify-email?token=${verificationToken}`;

  // Créer un transporteur nodemailer pour l'envoi de l'email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Ton email d'envoi
      pass: process.env.EMAIL_PASS, // Ton mot de passe ou mot de passe d'application
    },
  });

  // Contenu de l'email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Vérification de votre email',
    html: `
      <p>Bonjour ${user.nom},</p>
      <p>Merci de vous être inscrit sur notre site. Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
      <a href="${verificationUrl}">Vérifier mon email</a>
    `,
  };

  // Envoyer l'email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de vérification envoyé');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de vérification:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email de vérification.' }, { status: 500 });
  }

>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
  return NextResponse.json(user);
}
