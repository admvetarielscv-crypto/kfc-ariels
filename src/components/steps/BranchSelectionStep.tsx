import { MapPin } from "lucide-react";
import type { FormData } from "../BookingWizard";

interface BranchSelectionStepProps {
  formData: FormData;
  update: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onNext: () => void;
}

const BRANCHES = [
  { value: "san_martin" as const, label: "Sede San Martín de Porres" },
  { value: "los_olivos" as const, label: "Sede Los Olivos" },
  { value: "san_miguel" as const, label: "Sede San Miguel" },
];

export function BranchSelectionStep({ formData, update, onNext }: BranchSelectionStepProps) {
  const selected = formData.branch;

  return (
    <div>
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
        Seleccione su sede más cercana
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {BRANCHES.map(({ value, label }) => {
          const isSelected = selected === value;
          return (
            <button
              key={value}
              onClick={() => update("branch", value)}
              className={`flex cursor-pointer flex-col items-center gap-5 rounded-2xl border-2 p-10 transition-all duration-200 ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                  : "border-gray-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md hover:shadow-gray-200"
              }`}
            >
              <MapPin
                className={`h-14 w-14 transition-colors ${
                  isSelected ? "text-blue-600" : "text-gray-600"
                }`}
              />
              <span
                className={`text-center text-xl font-semibold leading-tight ${
                  isSelected ? "text-blue-700" : "text-gray-700"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <button
        onClick={onNext}
        disabled={!selected}
        className={`mt-10 w-full cursor-pointer rounded-xl py-4 text-lg font-bold text-white shadow-md transition-all ${
          selected
            ? "bg-blue-600 hover:bg-blue-700"
            : "cursor-not-allowed bg-blue-300"
        }`}
      >
        Iniciar Reserva
      </button>
    </div>
  );
}