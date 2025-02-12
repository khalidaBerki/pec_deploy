<<<<<<< HEAD
import React from "react";
import FormElements from "@/components/FormElements/products";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <FormElements />
    </DefaultLayout>
  );
};

=======
"use client";
import React, { useEffect, useState } from "react";
import FormElements from "@/components/FormElements/products";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useRouter } from "next/navigation";

const FormElementsPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Replace with actual authentication check
      const authCheck = false; 
      if (!authCheck) {
        router.push("/");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <DefaultLayout>
      <FormElements />
    </DefaultLayout>
  );
};

>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
export default FormElementsPage;