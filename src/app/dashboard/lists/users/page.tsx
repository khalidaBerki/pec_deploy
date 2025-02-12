<<<<<<< HEAD
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Users from "@/components/lists/users";


import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Liste utilisateurs" />

      <div className="flex flex-col gap-10">
        <Users />

      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
=======
"use client";
"use strict";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Users from "@/components/lists/users";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import DefaultLayout from "@/components/Layouts/DefaultLaout";

const TablesPage = () => {
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
      <Breadcrumb pageName="Liste utilisateurs" />
      <div className="flex flex-col gap-10">
        <Users />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
