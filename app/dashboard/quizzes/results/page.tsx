"use client";

import { Suspense } from "react";
import ResultsContent from "./ResultsContent";

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Chargement...</div>}>
      <ResultsContent />
    </Suspense>
  );
}


