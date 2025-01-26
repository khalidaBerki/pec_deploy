// Popups/DeletCategorie.tsx
import type React from "react"

interface DeleteCategorieProps {
  onClose: () => void
  onConfirm: () => Promise<void>
  isLoading: boolean
}

const DeletCategorie: React.FC<DeleteCategorieProps> = ({ onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold">Confirmer la suppression</h2>
        <p className="mb-6">Êtes-vous sûr de vouloir supprimer ce rayon?</p>
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
  )
}

export default DeletCategorie

