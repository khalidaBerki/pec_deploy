<<<<<<< HEAD
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/lists/categories";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Liste rayons" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
=======
"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/lists/categories";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import

const TablesPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/checkAuth");
      if (res.status !== 200) {
        router.push("/");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Liste rayons" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
