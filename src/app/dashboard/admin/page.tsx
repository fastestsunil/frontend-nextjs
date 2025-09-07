export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium `}
            ></div>
          </div>

          <p className="text-gray-700 mb-2"></p>

          <p className="text-gray-700 mb-4"></p>

          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
              Session Details (Click to expand)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60"></pre>
          </details>
        </div>
      </div>
    </div>
  );
}
