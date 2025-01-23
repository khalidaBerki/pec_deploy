"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SelectCategorie from "@/components/FormElements/SelectGroup/SelectCategorie";
import SelectProduct from "@/components/FormElements/SelectGroup/SelectProduct";
import DeletProduct from "@/components/Popups/DeletProduct";
import ModifyProduct from "@/components/Popups/ModifyProduct";

const FormElements = () => {
  // État pour chaque popup
  const [isModifyPopupOpen, setModifyPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  // Gestion des popups
  const handleModifyClick = () => setModifyPopupOpen(true);
  const handleDeleteClick = () => setDeletePopupOpen(true);
  const handleClosePopup = () => {
    setModifyPopupOpen(false);
    setDeletePopupOpen(false);
  };

  // Actions pour chaque confirmation
  const handleConfirmModify = () => {
    alert("Modification Confirmée !");
    setModifyPopupOpen(false);
  };

  const handleConfirmDelete = () => {
    alert("Rayon Supprimé !");
    setDeletePopupOpen(false);
  };


  return (
    <>
      <Breadcrumb pageName="Gérer les produits" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Ajout produit --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                 Ajouter un Produit
              </h3>
            </div>
           <form action="#">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nom du Produit
                </label>
                <input
                  type="text"
                  placeholder="Nom du Produit"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Logo du Produit
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white"
                />
              </div>

              <div>
                <SelectCategorie />
              </div>

              <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                  Enregister
                </button>

            </div>
           </form>
          </div>


          {/* <!-- Modif Produit --> */}

          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                 Modifer un Produit
              </h3>
            </div>
           <form action="#">
            <div className="flex flex-col gap-5.5 p-6.5">

              <div>
                <SelectCategorie />
              </div>

              <div>
                <SelectProduct/>
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nouveau Nom du Produit
                </label>
                <input
                  type="text"
                  placeholder="Nom du Produit"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nouveau Logo du Produit
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white"
                />
              </div>

              <button
                  type="button"
                  onClick={handleModifyClick} // Ouvre le popup de modification
                  className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                >
                  Modifier
                </button>
              </div>
            </form>

              {/* Afficher le popup de modification */}
               {isModifyPopupOpen && (
                 <ModifyProduct
                   onClose={handleClosePopup}
                   onConfirm={handleConfirmModify}
                 />
               )}
          </div>

           {/* <!-- Supprim Produit --> */}
           <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Supprimer un Produit
              </h3>
            </div>
            <form action="#">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <SelectCategorie />
                </div>

                <div>
                  <SelectProduct />
                </div>

                <button
                  type="button" 
                  onClick={handleDeleteClick} // Appel de la fonction pour afficher le popup
                  className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                >
                  Supprimer
                </button>
              </div>
            </form>

                    {/* Afficher le popup de suppression si isDeletePopupOpen est vrai */}
              {isDeletePopupOpen && (
                <DeletProduct
                  onClose={handleClosePopup}
                  onConfirm={handleConfirmDelete}
                />
              )}
        
          </div>
        </div>
      </div>

      
    </>
  );
};

export default FormElements;
