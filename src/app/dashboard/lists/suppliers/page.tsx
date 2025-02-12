<<<<<<< HEAD
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Suppliers from "@/components/lists/suppliers";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Liste fournisseurs" />

      <div className="flex flex-col gap-10">
        <Suppliers />

      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
=======
'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Suppliers from "@/components/lists/suppliers";

import DefaultLayout from "@/components/Layouts/DefaultLaout";

const TablesPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/checkAuth");
      if (res.status === 200) {
        setIsAuthenticated(true);
      } else {
        router.push("/");
      }
    };
    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Liste fournisseurs" />
      <div className="flex flex-col gap-10">
        <Suppliers />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
