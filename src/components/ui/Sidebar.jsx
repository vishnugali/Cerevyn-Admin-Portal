import React from 'react';
import { LayoutDashboard, Briefcase, Users, Bookmark, LogOut } from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, onLogout }) {
  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Job Openings', icon: Briefcase },
    { id: 'applicants', label: 'Applicants', icon: Users },
    { id: 'blog', label: 'Blog', icon: Bookmark },
    { id: 'tutorials', label: 'Tutorials', icon: Bookmark },
  ];

  return (
    <aside 
      className="sidebar-surface" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        boxSizing: 'border-box' 
      }}
    >
      {/* Brand Header Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
        <div style={{ color: 'var(--clr-button)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--clr-text)', lineHeight: '1.2' }}>Admin</div>
          <div style={{ fontSize: '10px', fontWeight: '600', color: 'var(--clr-text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Management</div>
        </div>
      </div>

      {/* Menu Label */}
      <div style={{ 
        fontSize: '10px', 
        fontWeight: '700', 
        color: 'var(--clr-text-muted)', 
        letterSpacing: '1px', 
        marginBottom: '16px', 
        textTransform: 'uppercase', 
        paddingLeft: '8px' 
      }}>
        Main Menu
      </div>

      {/* Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {menu.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <button 
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                backgroundColor: isActive ? 'rgba(0, 36, 222, 0.16)' : 'transparent', 
                color: isActive ? 'var(--clr-button)' : 'var(--clr-text-muted)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: isActive ? '600' : '500',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 0.2s ease'
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} /> 
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout Action Footer anchored strictly to the bottom */}
      <button 
        onClick={onLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          color: 'var(--clr-danger)',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          marginTop: 'auto', 
          textAlign: 'left',
          width: '100%'
        }}
      >
        <LogOut size={16} /> Logout
      </button>
    </aside>
  );
}