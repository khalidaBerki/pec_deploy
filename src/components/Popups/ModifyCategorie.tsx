// Popups/ModifyCategorie.tsx


import type React from "react"

interface ModifyCategorieProps {
  onClose: () => void
  onConfirm: () => Promise<void>
  isLoading: boolean
}

const ModifyCategorie: React.FC<ModifyCategorieProps> = ({ onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold">Confirmer la modification</h2>
        <p className="mb-6">Êtes-vous sûr de vouloir modifier ce rayon ?</p>
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
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Modification..." : "Modifier"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModifyCategorie

