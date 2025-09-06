'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  getUserProfile,
  testAdminRoute,
  testProtectedRoute,
  testPublicRoute,
} from '@/lib/server-actions';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  status?: number;
}

export function TestRouteButtons() {
  const [protectedResult, setProtectedResult] = useState<TestResult | null>(
    null
  );
  const [publicResult, setPublicResult] = useState<TestResult | null>(null);
  const [adminResult, setAdminResult] = useState<TestResult | null>(null);
  const [profileResult, setProfileResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleTest = async (
    testType: string,
    testFunction: () => Promise<TestResult>
  ) => {
    setIsLoading(testType);
    try {
      const result = await testFunction();
      switch (testType) {
        case 'protected':
          setProtectedResult(result);
          break;
        case 'public':
          setPublicResult(result);
          break;
        case 'admin':
          setAdminResult(result);
          break;
        case 'profile':
          setProfileResult(result);
          break;
      }
    } catch (error) {
      console.error(`Error testing ${testType}:`, error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Protected Route Test */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Protected Route Test</h3>
        <Button
          onClick={() => handleTest('protected', testProtectedRoute)}
          disabled={isLoading === 'protected'}
          className="w-full"
        >
          {isLoading === 'protected' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            'Test Protected Route'
          )}
        </Button>

        {protectedResult && (
          <Alert variant={protectedResult.success ? 'default' : 'destructive'}>
            <AlertDescription>
              {protectedResult.success ? (
                <>
                  <strong>✅ Success!</strong> Protected route accessed
                  successfully.
                  <br />
                  <strong>User:</strong> {protectedResult.data?.user?.name} (
                  {protectedResult.data?.user?.email})
                  <br />
                  <strong>Role:</strong> {protectedResult.data?.user?.role}
                </>
              ) : (
                <>
                  <strong>❌ Failed:</strong> {protectedResult.error}
                  <br />
                  <strong>Message:</strong> {protectedResult.message}
                  {protectedResult.status && (
                    <>
                      <br />
                      <strong>Status:</strong> {protectedResult.status}
                    </>
                  )}
                </>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Public Route Test */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Public Route Test</h3>
        <Button
          onClick={() => handleTest('public', testPublicRoute)}
          disabled={isLoading === 'public'}
          className="w-full"
        >
          {isLoading === 'public' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            'Test Public Route'
          )}
        </Button>

        {publicResult && (
          <Alert variant={publicResult.success ? 'default' : 'destructive'}>
            <AlertDescription>
              {publicResult.success ? (
                <>
                  <strong>✅ Success!</strong> Public route accessed
                  successfully.
                  <br />
                  <strong>Authenticated:</strong>{' '}
                  {publicResult.data?.isAuthenticated ? 'Yes' : 'No'}
                  {publicResult.data?.user && (
                    <>
                      <br />
                      <strong>User:</strong> {publicResult.data.user.name} (
                      {publicResult.data.user.email})
                    </>
                  )}
                </>
              ) : (
                <>
                  <strong>❌ Failed:</strong> {publicResult.error}
                  <br />
                  <strong>Message:</strong> {publicResult.message}
                </>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Admin Route Test */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Admin Route Test</h3>
        <Button
          onClick={() => handleTest('admin', testAdminRoute)}
          disabled={isLoading === 'admin'}
          className="w-full"
        >
          {isLoading === 'admin' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            'Test Admin Route'
          )}
        </Button>

        {adminResult && (
          <Alert variant={adminResult.success ? 'default' : 'destructive'}>
            <AlertDescription>
              {adminResult.success ? (
                <>
                  <strong>✅ Success!</strong> Admin route accessed
                  successfully.
                  <br />
                  <strong>User:</strong> {adminResult.data?.user?.name} (
                  {adminResult.data?.user?.email})
                  <br />
                  <strong>Role:</strong> {adminResult.data?.user?.role}
                  <br />
                  <strong>Secret Message:</strong>{' '}
                  {adminResult.data?.adminData?.secretMessage}
                </>
              ) : (
                <>
                  <strong>❌ Failed:</strong> {adminResult.error}
                  <br />
                  <strong>Message:</strong> {adminResult.message}
                  {adminResult.status && (
                    <>
                      <br />
                      <strong>Status:</strong> {adminResult.status}
                    </>
                  )}
                </>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Profile Test */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Profile Test</h3>
        <Button
          onClick={() => handleTest('profile', getUserProfile)}
          disabled={isLoading === 'profile'}
          className="w-full"
        >
          {isLoading === 'profile' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            'Test Profile Route'
          )}
        </Button>

        {profileResult && (
          <Alert variant={profileResult.success ? 'default' : 'destructive'}>
            <AlertDescription>
              {profileResult.success ? (
                <>
                  <strong>✅ Success!</strong> Profile retrieved successfully.
                  <br />
                  <strong>User:</strong> {profileResult.data?.profile?.name} (
                  {profileResult.data?.profile?.email})
                  <br />
                  <strong>Role:</strong> {profileResult.data?.profile?.role}
                  <br />
                  <strong>Session ID:</strong> {profileResult.data?.session?.id}
                </>
              ) : (
                <>
                  <strong>❌ Failed:</strong> {profileResult.error}
                  <br />
                  <strong>Message:</strong> {profileResult.message}
                  {profileResult.status && (
                    <>
                      <br />
                      <strong>Status:</strong> {profileResult.status}
                    </>
                  )}
                </>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
