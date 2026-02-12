"use client";

export default function Sidebar({ history, setSelected }) {
  return (
    <div className="w-80 bg-white/50 backdrop-blur-xl border-r border-white/20 h-full p-6 overflow-y-auto hidden md:block shadow-xl">
      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          📂 Previous Projects
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
      </div>

      {history.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-sm text-gray-500 font-medium">
            No projects generated yet.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Start creating your first project!
          </p>
        </div>
      )}

      <div className="space-y-3">
        {history.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item)}
            className="group relative p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl cursor-pointer border border-gray-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg transform hover:scale-102"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate group-hover:text-purple-600 transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Click to view details
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}