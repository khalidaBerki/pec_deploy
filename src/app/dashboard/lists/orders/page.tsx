"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrderTable from "@/components/lists/OrderTable";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
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
      <Breadcrumb pageName="Liste des Commandes" />

      <div className="flex flex-col gap-10">
        <OrderTable />
      </div>
    </DefaultLayout>
  );
};

export default OrdersPage;

