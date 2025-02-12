<<<<<<< HEAD
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";

export const metadata: Metadata = {
  title:
    "Smart Drive",
  description: "This is Smart Drive Dashboard for Admin",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
=======
'use client'; // Directive pour indiquer que le fichier est un composant client

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { loading, isAdmin } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const path = window.location.pathname; // Récupère l'URL actuelle

    // Si l'utilisateur est en cours de chargement, on ne fait rien
    if (loading) return;

    // Si l'utilisateur n'est pas admin et tente d'accéder au dashboard, on le redirige
    if (path.startsWith("/dashboard") && !isAdmin) {
      router.push("/");
    } else {
      setAuthorized(true);
    }
  }, [loading, isAdmin, router]);

  if (loading || !authorized) {
    return <p>Chargement...</p>; // Empêche l'affichage du contenu du dashboard
  }

  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
