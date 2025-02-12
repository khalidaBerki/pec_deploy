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
