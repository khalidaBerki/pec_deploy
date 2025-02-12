"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Products from "@/components/lists/products";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
      <Breadcrumb pageName="Liste produits" />
      <div className="flex flex-col gap-10">
        <Products />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
