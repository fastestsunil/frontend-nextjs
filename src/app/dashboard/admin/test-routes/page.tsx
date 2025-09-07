import { TestRouteButtons } from '@/components/test-route-buttons';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCurrentUser } from '@/lib/server-actions';
import { Alert, AlertDescription } from '../../../../components/ui/alert';

export default async function TestRoutesPage() {
  // Get current user session
  const userResult = await getCurrentUser();
  const isAuthenticated = userResult?.data;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Protected Routes Test</h1>
        <p className="text-muted-foreground">
          Test different authentication scenarios with server actions
        </p>
      </div>

      {/* Authentication Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Authentication Status
            <Badge variant={isAuthenticated ? 'default' : 'destructive'}>
              {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isAuthenticated ? (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {userResult.data?.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {userResult.data?.user?.email}
              </p>
              <p>
                <strong>Role:</strong> {userResult.data?.user?.role}
              </p>
            </div>
          ) : (
            <Alert>
              <AlertDescription>
                You are not authenticated. Some tests will fail as expected.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Test Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Route Testing</CardTitle>
          <CardDescription>
            Test different authentication scenarios with interactive buttons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TestRouteButtons />
        </CardContent>
      </Card>
    </div>
  );
}
