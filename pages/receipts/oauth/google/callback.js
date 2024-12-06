import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function OAuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState('Completing authentication...');

  useEffect(() => {
    if (!router.isReady) return;

    const deepLinkUrl = new URL('receipts://oauth/callback');
    Object.entries(router.query).forEach(([key, value]) => {
      if (typeof value === 'string') {
        deepLinkUrl.searchParams.set(key, value);
      }
    });

    setStatus('Redirecting to app...');
    window.location.href = deepLinkUrl.toString();
  }, [router.isReady, router.query]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-4">Google Authentication</h1>
        <p>{status}</p>
      </div>
    </div>
  );
}