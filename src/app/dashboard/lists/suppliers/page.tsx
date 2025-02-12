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