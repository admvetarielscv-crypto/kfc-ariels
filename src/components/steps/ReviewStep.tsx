import type { FormData } from "../BookingWizard";

interface ReviewStepProps {
  formData: FormData;
  update: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ReviewStep({ formData, update, onNext }: ReviewStepProps) {
  const isValid =
    formData.ownerName.trim() !== "" &&
    formData.ownerPhone.trim() !== "";

  return (
    <div>
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
        Tus datos
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.ownerName}
            onChange={(e) => update("ownerName", e.target.value)}
            placeholder="Ej: Juan Pérez"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.ownerPhone}
            onChange={(e) => update("ownerPhone", e.target.value)}
            placeholder="Ej: 555-123-4567"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Dirección
          </label>
          <input
            type="text"
            value={formData.ownerAddress}
            onChange={(e) => update("ownerAddress", e.target.value)}
            placeholder="Ej: Av. Central 123, Col. Centro"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Observaciones de la mascota
          </label>
          <textarea
            rows={4}
            value={formData.petNotes}
            onChange={(e) => update("petNotes", e.target.value)}
            placeholder="Ej: Mi perro se pone nervioso con la rasuradora..."
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          onClick={onNext}
          disabled={!isValid}
          className={`w-full rounded-xl py-3 text-lg font-semibold text-white transition-all ${
            isValid
              ? "cursor-pointer bg-blue-600 shadow-md hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-300"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}