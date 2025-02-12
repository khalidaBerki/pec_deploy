<<<<<<< HEAD
// Popups/DeletProduct.tsx
import React from "react";

interface DeletProductProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeletCategorie: React.FC<DeletProductProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">Êtes-vous sûr de vouloir supprimer ce Produit ?</h2>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={onConfirm}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletCategorie;
=======
import React from "react";

interface DeleteProductProps {
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeletProduct: React.FC<DeleteProductProps> = ({ onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold">Confirmer la suppression</h2>
        <p className="mb-6">Êtes-vous sûr de vouloir supprimer ce Produit ?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
            disabled={isLoading}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletProduct;
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
