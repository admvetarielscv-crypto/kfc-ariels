import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CheckCircle } from "lucide-react";
import type { FormData } from "../BookingWizard";

interface ConfirmationStepProps {
  formData: FormData;
  onBack?: () => void;
}

const PET_TYPE_LABELS: Record<string, string> = { dog: "Perro", cat: "Gato" };
const SERVICE_LABELS: Record<string, string> = { bath: "Baño", bath_cut: "Baño + Corte" };
const SIZE_LABELS: Record<string, string> = { small: "Pequeño", medium: "Mediano", large: "Grande" };
const COAT_LABELS: Record<string, string> = { normal: "Normal / Sin nudos", knotted: "Con nudos / Enmarañado" };
const TIME_LABELS: Record<string, string> = { "9-11": "9:00 am – 11:00 am", "11-14": "11:00 am – 2:00 pm" };

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return format(d, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
}

export function ConfirmationStep({ formData, onBack: _onBack }: ConfirmationStepProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6 py-10">
        <CheckCircle className="h-24 w-24 text-green-500" />
        <h2 className="text-3xl font-bold text-gray-800">
          ¡Solicitud enviada con éxito!
        </h2>
        <p className="text-center text-gray-500">
          Te contactaremos pronto para confirmar la cita.
        </p>
      </div>
    );
  }

  const rows: { label: string; value: string }[] = [
    { label: "Mascota", value: PET_TYPE_LABELS[formData.petType ?? ""] ?? "-" },
    { label: "Servicio", value: SERVICE_LABELS[formData.service ?? ""] ?? "-" },
    { label: "Tamaño", value: SIZE_LABELS[formData.size ?? ""] ?? "-" },
    { label: "Pelaje", value: COAT_LABELS[formData.coat ?? ""] ?? "-" },
    { label: "Fecha", value: formData.date ? formatDate(formData.date) : "-" },
    { label: "Horario", value: TIME_LABELS[formData.timeRange ?? ""] ?? "-" },
    { label: "Nombre", value: formData.ownerName || "-" },
    { label: "Teléfono", value: formData.ownerPhone || "-" },
    { label: "Dirección", value: formData.ownerAddress || "-" },
  ];

  return (
    <div>
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Resumen de tu solicitud
      </h2>

      <div className="mb-6 space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800 capitalize">{value}</span>
          </div>
        ))}

        {formData.petNotes && (
          <div className="border-t border-gray-200 pt-3">
            <span className="block text-sm text-gray-500">Observaciones</span>
            <p className="mt-1 text-gray-800">{formData.petNotes}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setSubmitted(true)}
        className="w-full cursor-pointer rounded-xl bg-green-600 py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-green-700"
      >
        Confirmar Solicitud
      </button>
    </div>
  );
}