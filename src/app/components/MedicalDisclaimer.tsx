import { AlertTriangle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-yellow-900 mb-1">
            Medical Disclaimer
          </h3>
          <p className="text-sm text-yellow-800">
            This assessment is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. 
            Always consult qualified healthcare professionals for medical decisions. In case of emergency, contact medical services immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
