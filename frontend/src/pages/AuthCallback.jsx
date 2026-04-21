import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AuthCallback() {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processAuth = async () => {
      const hash = window.location.hash;
      const sessionId = new URLSearchParams(hash.substring(1)).get('session_id');

      if (!sessionId) {
        navigate('/admin', { replace: true });
        return;
      }

      try {
        const res = await fetch(`${API}/auth/session?session_id=${sessionId}`, {
          credentials: 'include'
        });
        if (res.ok) {
          const user = await res.json();
          navigate('/admin', { state: { user }, replace: true });
        } else {
          navigate('/admin', { replace: true });
        }
      } catch {
        navigate('/admin', { replace: true });
      }
    };

    processAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center" data-testid="auth-callback">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#1A1A2E] font-body">Authenticating...</p>
      </div>
    </div>
  );
}
