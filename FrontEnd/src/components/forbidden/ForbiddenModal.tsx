import { useAuthStorage } from "@/hooks/useAuthStorage";
import image403 from "@/assets/403-03.png";

export default function ForbiddenModal() {
  const forbiddenOpen = useAuthStorage((s) => s.forbiddenOpen);
  const hideForbidden = useAuthStorage((s) => s.hideForbidden);

  if (!forbiddenOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 dark:bg-black/70">
      <div className="bg-white dark:bg-[#192733] rounded-xl shadow-lg w-full max-w-md m-4">
        <div className="p-6 text-center">
          <img src={image403} alt="Acceso denegado" className="w-32 h-32 mx-auto mb-4 object-contain" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Acceso denegado</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">No tienes permisos para ver esta página.</p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={hideForbidden}
              className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-medium shadow-sm hover:bg-primary/90"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
