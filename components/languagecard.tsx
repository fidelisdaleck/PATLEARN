type LanguageCardProps = {
  name: string;
  progress: number; // entre 0 et 100
  lessonsDone: number;
  totalLessons: number;
};

export default function LanguageCard({
  name,
  progress,
  lessonsDone,
  totalLessons,
}: LanguageCardProps) {
  return (
    <div className="border-2 border-blue-400 rounded-xl p-6 bg-gray-100 max-w-xl">
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-bold text-gray-900">{name}</h2>

        <div className="flex-1">
          <div className="w-full h-5 bg-gray-300 rounded-full overflow-hidden">
            <div
                className="h-full bg-green-600 transition-all duration-500"
                style={{ width: `${progress}%`, display: "block" }}
            />
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-700">
        {lessonsDone} leçons sur {totalLessons}.
      </p>
    </div>
  );
}