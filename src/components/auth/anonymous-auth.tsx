'use client';

import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';

export default function AnonymousAuth() {
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const handleAnonymousSignIn = async () => {
      try {
        // Check if user is already signed in
        const session = await authClient.getSession();

        if (!session.data) {
          // User is not signed in, attempt anonymous sign-in
          console.log('🚀 Attempting anonymous sign-in...');
          setIsSigningIn(true);

          const result = await authClient.signIn.anonymous();

          if (result.data) {
            console.log('✅ Anonymous sign-in successful:', result.data);
          } else {
            console.error('❌ Anonymous sign-in failed:', result.error);
          }
        } else {
          console.log('✅ User already signed in:', session.data.user);
        }
      } catch (error) {
        console.error('❌ Anonymous authentication error:', error);
      } finally {
        setIsSigningIn(false);
      }
    };

    // Only run on client-side and when not already processing
    if (typeof window !== 'undefined' && !isSigningIn) {
      handleAnonymousSignIn();
    }
  }, [isSigningIn]);

  // This component doesn't render anything visible
  return null;
}
