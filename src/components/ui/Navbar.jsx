import React, { useEffect, useRef, useState } from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    function onDocumentClick(e) {
      if (!showNotifications) return;
      if (notifRef.current && notifRef.current.contains(e.target)) return;
      if (btnRef.current && btnRef.current.contains(e.target)) return;
      setShowNotifications(false);
    }

    function onKey(e) {
      if (e.key === 'Escape') setShowNotifications(false);
    }

    document.addEventListener('mousedown', onDocumentClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [showNotifications]);
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 32px',
      backgroundColor: 'rgba(1, 0, 93, 0.92)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(14px)',
      position: 'sticky',
      top: 0,
      zIndex: 15
    }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--clr-text)' }}>
        Recruiter Portal
      </div>

      <div style={{ position: 'relative', width: '360px' }}>
        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} />
        <input
          type='text'
          placeholder='Search applicants, roles, or insights...'
          style={{
            width: '100%',
            padding: '10px 14px 10px 42px',
            borderRadius: '18px',
            border: '1px solid rgba(255,255,255,0.12)',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'var(--clr-text)',
            fontSize: '13px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <button
            ref={btnRef}
            aria-expanded={showNotifications}
            aria-label='Notifications'
            onClick={() => setShowNotifications(v => !v)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', position: 'relative', color: 'var(--clr-text-muted)' }}>
            <Bell size={18} />
            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '7px', height: '7px', borderRadius: '999px', backgroundColor: '#ef4444' }} />
          </button>

          {showNotifications && (
            <div
              ref={notifRef}
              role='dialog'
              aria-label='Notifications panel'
              style={{
                position: 'absolute',
                right: 0,
                marginTop: '10px',
                width: '300px',
                background: 'rgba(0,0,0,0.85)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(2,6,23,0.6)',
                padding: '8px',
                zIndex: 40
              }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--clr-text)', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                Notifications
              </div>
              <div style={{ maxHeight: '220px', overflow: 'auto' }}>
                <div style={{ padding: '10px 12px', color: 'var(--clr-text-muted)', fontSize: '13px' }}>
                  You have no new notifications.
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center' }}>
          <User size={16} color='var(--clr-text-muted)' />
        </div>
      </div>
    </div>
  );
}
