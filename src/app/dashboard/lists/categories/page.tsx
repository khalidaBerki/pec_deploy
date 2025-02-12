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
