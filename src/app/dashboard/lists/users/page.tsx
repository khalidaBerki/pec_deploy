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
