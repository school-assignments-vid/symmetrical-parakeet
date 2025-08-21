export default function VercelNotFound() {
  return (
    <main className="w-full h-full bg-white text-gray-900 flex items-center justify-center">
      <div className="text-center min-w-md">
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <div className="flex gap-2 items-center mb-4">
            <span className="text-black text-lg font-bold">404:</span>
            <span className="text-gray-500 text-lg">DEPLOYMENT_NOT_FOUND</span>
          </div>
          <div className="text-left">
            <div className="text-gray-500 text-sm mb-1">Deployment:</div>
            <div className="font-mono text-sm text-blue-600">
              julianmaggio.me
            </div>
          </div>
        </div>
        <div className="mt-8 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 Press
            <kbd className="px-1 py-0.5 bg-blue-100 rounded text-xs">F12</kbd>
            or
            <kbd className="px-1 py-0.5 bg-blue-100 rounded text-xs">
              Ctrl+Shift+I
            </kbd>
            to open developer tools
          </p>
        </div>
      </div>
    </main>
  );
}
