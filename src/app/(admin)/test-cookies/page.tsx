import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cookies } from 'next/headers';

export default async function TestCookiesPage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const sessionCookie = cookieStore.get('better-auth.session_token');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Cookie Debug Page</h1>
        <p className="text-muted-foreground">
          Debug cookies and session information
        </p>
      </div>

      {/* Session Cookie Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Session Cookie Status
            <Badge variant={sessionCookie ? 'default' : 'destructive'}>
              {sessionCookie ? 'Found' : 'Not Found'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessionCookie ? (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {sessionCookie.name}
              </p>
              <p>
                <strong>Value:</strong> {sessionCookie.value.substring(0, 50)}
                ...
              </p>
              <p>
                <strong>Full Value:</strong>{' '}
                <code className="text-xs bg-muted p-1 rounded">
                  {sessionCookie.value}
                </code>
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">No session cookie found</p>
          )}
        </CardContent>
      </Card>

      {/* All Cookies */}
      <Card>
        <CardHeader>
          <CardTitle>All Cookies ({allCookies.length})</CardTitle>
          <CardDescription>
            All cookies available in this request
          </CardDescription>
        </CardHeader>
        <CardContent>
          {allCookies.length > 0 ? (
            <div className="space-y-4">
              {allCookies.map(cookie => (
                <div key={cookie.name} className="border rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <strong>{cookie.name}</strong>
                    {cookie.name === 'better-auth.session_token' && (
                      <Badge variant="default">Session</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground break-all">
                    {cookie.value.length > 100
                      ? `${cookie.value.substring(0, 100)}...`
                      : cookie.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No cookies found</p>
          )}
        </CardContent>
      </Card>

      {/* Cookie Header for API Testing */}
      <Card>
        <CardHeader>
          <CardTitle>Cookie Header for API Testing</CardTitle>
          <CardDescription>
            Copy this header value to test API endpoints manually
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessionCookie ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Cookie Header:</p>
              <code className="block text-xs bg-muted p-2 rounded break-all">
                Cookie: {sessionCookie.name}={sessionCookie.value}
              </code>
            </div>
          ) : (
            <p className="text-muted-foreground">No session cookie available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
