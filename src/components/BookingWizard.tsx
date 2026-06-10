import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { ServiceTypeStep } from "./steps/ServiceTypeStep";
import { PetInfoStep } from "./steps/PetInfoStep";
import { OwnerInfoStep } from "./steps/OwnerInfoStep";
import { AddressStep } from "./steps/AddressStep";
import { ScheduleStep } from "./steps/ScheduleStep";
import { AddonsStep } from "./steps/AddonsStep";
import { ReviewStep } from "./steps/ReviewStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";

export interface FormData {
  petType: "dog" | "cat" | null;
  service: "bath" | "bath_cut" | null;
  size: "small" | "medium" | "large" | null;
  coat: "normal" | "knotted" | null;
  date: string | null;
  timeRange: "9-11" | "11-14" | null;
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
  petNotes: string;
}

const STEPS = [
  ServiceTypeStep,
  PetInfoStep,
  OwnerInfoStep,
  AddressStep,
  ScheduleStep,
  AddonsStep,
  ReviewStep,
  ConfirmationStep,
] as const;

const STEP_LABELS = [
  "Tipo de mascota",
  "Servicio",
  "Tamaño",
  "Pelaje",
  "Fecha",
  "Horario",
  "Tus datos",
  "Resumen",
];

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    petType: null,
    service: null,
    size: null,
    coat: null,
    date: null,
    timeRange: null,
    ownerName: "",
    ownerPhone: "",
    ownerAddress: "",
    petNotes: "",
  });

  const StepComponent = STEPS[currentStep];
  const totalSteps = STEPS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                Paso {currentStep + 1} de {totalSteps}
              </span>
              <span>{STEP_LABELS[currentStep]}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <StepComponent
            formData={formData}
            update={update}
            onNext={handleNext}
            onBack={handleBack}
          />

          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="mt-8 flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
              Volver atrás
            </button>
          )}
        </div>
      </div>
    </div>
  );
}