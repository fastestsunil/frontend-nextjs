'use client';

import { authClient } from '@/lib/auth-client';

export default function Page() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1>Dashboard</h1>
        <p>Welcome {session.user.name}</p>
        {JSON.stringify(session, null, 2)}
      </div>
    </div>
  );
}
