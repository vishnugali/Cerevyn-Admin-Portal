import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLoginSuccess();
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: 'var(--clr-background)',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '28px',
        backgroundColor: 'var(--clr-surface-alt)',
        border: '1px solid var(--clr-border)',
        borderRadius: '24px',
        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.35)'
      }}>
        
        {/* Modern Shield/Security Icon Grid Spacer */}
        <div style={{ marginBottom: '12px', opacity: 0.9 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--clr-button)' }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>

        {/* Core Headings */}
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: 'var(--clr-text)', 
          margin: '0 0 6px 0',
          letterSpacing: '-0.5px'
        }}>
          Admin Portal
        </h1>
        
        <p style={{ 
          fontSize: '12px', 
          fontWeight: '500', 
          letterSpacing: '0.5px', 
          color: 'var(--clr-text-muted)', 
          margin: 0, 
          textTransform: 'uppercase' 
        }}>
          Management Access
        </p>

        <div style={{ 
          width: '72%', 
          height: '2px', 
          backgroundColor: 'var(--clr-button)', 
          marginTop: '20px'
        }} />

        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '30px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '6px', 
            marginBottom: '16px',
            opacity: 0.7
          }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--clr-text-muted)', fontWeight: '500' }}>
              🛡️ Security Authentication
            </span>
          </div>

          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '14px',
              color: 'var(--clr-text-muted)'
            }}>
              🔒
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 38px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--clr-border)',
                borderRadius: '12px',
                fontSize: '14px',
                color: 'var(--clr-text)',
                outline: 'none',
                boxSizing: 'border-box',
                textAlign: 'left'
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: 'var(--clr-button)',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '14px',
              border: 'none',
              borderRadius: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 14px 30px rgba(0,0,0,0.24)'
            }}
          >
            Sign In ➔
          </button>
        </form>

        <div style={{ marginTop: '40px' }}>
          <a href="#" style={{ 
            fontSize: '12px', 
            color: 'var(--clr-text-muted)', 
            textDecoration: 'none', 
            fontWeight: '500',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            paddingBottom: '2px'
          }}>
            Return to Website ↗
          </a>
        </div>

      </div>
    </div>
  );
}