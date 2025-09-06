'use client';

import { authClient } from '@/lib/auth-client';

export default function Page() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <h1 className="text-2xl font-bold text-red-600">
            Authentication Error
          </h1>
          <p className="text-gray-600">
            Unable to authenticate. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium `}>
              {session.user.role}
            </div>
          </div>

          <p className="text-gray-700 mb-2">
            <span className="font-medium">Welcome:</span> {session.user.name}
          </p>

          <p className="text-gray-700 mb-2">
            <span className="font-medium">Email:</span> {session.user.email}
          </p>

          <p className="text-gray-700 mb-4">
            <span className="font-medium">Role:</span>{' '}
            {session.user.role || 'user'}
          </p>

          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
              Session Details (Click to expand)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60">
              {JSON.stringify(session, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
}
