export default function NewsLoading() {
  return (
    <div className="flex-1 w-full bg-slate-100 space-y-4 py-4">
      <div className="max-w-2xl mx-auto px-4 space-y-4">
        {/* StartThreadForm skeleton */}
        <div className="flex shadow-lg border border-slate-200 bg-white rounded-lg animate-pulse p-3 items-center">
          <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0" />
          <div className="flex-1 px-4 py-3">
            <div className="bg-slate-200 rounded-xl h-6 w-full mr-auto" />
          </div>
        </div>

        {/* Thread cards skeleton */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse"
          >
            <div className="flex gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-slate-200"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-1/4"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
