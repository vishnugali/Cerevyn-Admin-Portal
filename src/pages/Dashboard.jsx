import React from 'react';
import { Briefcase, Users, FileText, TrendingUp, Search, Bell } from 'lucide-react';

export default function Dashboard() {
  return (
    <div style={{
      flexGrow: 1,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--clr-background)', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      
      {/* ================= INNER WORKSPACE CONTAINER ================= */}
      <div style={{ padding: '32px', boxSizing: 'border-box', overflowY: 'auto', flexGrow: 1 }}>
        
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--clr-text)', margin: 0 }}>
            Recruiter Dashboard
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--clr-text-muted)', marginTop: '4px', margin: 0 }}>
            Overview of your recruitment activity and next best actions.
          </p>
        </div>

        {/* ====== 1. ACTION QUEUE CARDS ROW ====== */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '16px', 
          marginBottom: '24px' 
        }}>
          <div style={{ backgroundColor: 'var(--clr-card)', border: '1px solid var(--clr-border)', borderRadius: '16px', padding: '20px' }}>
            <span style={{ fontSize: '9px', fontWeight: '700', color: 'var(--clr-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
              Action Queue
            </span>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--clr-text)', margin: 0 }}>2 candidates need review</h3>
            <p style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginTop: '3px', margin: 0 }}>Open Applicants and shortlist in bulk</p>
          </div>
          
          <div style={{ backgroundColor: 'var(--clr-card)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '20px' }}>
            <span style={{ fontSize: '9px', fontWeight: '700', color: 'var(--clr-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
              Interviews
            </span>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--clr-text)', margin: 0 }}>0 ready to schedule</h3>
            <p style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginTop: '3px', margin: 0 }}>Convert shortlisted candidates faster</p>
          </div>
          
          <div style={{ backgroundColor: 'var(--clr-card)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '20px' }}>
            <span style={{ fontSize: '9px', fontWeight: '700', color: 'var(--clr-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
              Job Health
            </span>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--clr-text)', margin: 0 }}>0 open jobs with zero applicants</h3>
            <p style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginTop: '3px', margin: 0 }}>Refresh description or requirements</p>
          </div>
        </div>

        {/* ====== 2. NUMERICAL METRICS CARDS ROW ====== */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px', 
          marginBottom: '28px' 
        }}>
          {[
            { label: 'Jobs Posted', value: '3', icon: Briefcase },
            { label: 'Total Applicants', value: '3', icon: Users },
            { label: 'Active Jobs', value: '3', icon: FileText },
            { label: 'This Month', value: '0', icon: TrendingUp },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={{ 
                backgroundColor: 'var(--clr-card)', 
                border: '1px solid var(--clr-border)', 
                borderRadius: '16px', 
                padding: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '28px', fontWeight: '700', color: 'var(--clr-text)', lineHeight: 1 }}>{stat.value}</span>
                    {stat.label === 'This Month' && (
                      <span style={{ fontSize: '10px', fontWeight: '600', color: 'var(--clr-success)', whiteSpace: 'nowrap' }}>
                        ↗ +1 New application
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: '500', color: 'var(--clr-text-muted)', marginTop: '6px', margin: 0 }}>{stat.label}</p>
                </div>
                <div style={{ 
                  padding: '10px', 
                  backgroundColor: 'rgba(0, 212, 255, 0.12)', 
                  color: '#0ea5e9', 
                  border: '1px solid rgba(14, 165, 233, 0.18)',
                  borderRadius: '10px', 
                  display: 'flex', 
                  alignItems: 'center' 
                }}>
                  <Icon size={18} strokeWidth={2} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ====== 3. RECENT APPLICATIONS TABLE ====== */}
        <div style={{ backgroundColor: 'var(--clr-card)', border: '1px solid var(--clr-border)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--clr-text)', margin: 0 }}>Recent Applications</h3>
            <button style={{ fontSize: '12px', fontWeight: '600', color: 'var(--clr-success)', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
              View all
            </button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--clr-card)', borderBottom: '1px solid var(--clr-border)', fontSize: '11px', fontWeight: '700', color: 'var(--clr-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 24px' }}>Candidate</th>
                  <th style={{ padding: '12px 24px' }}>Job</th>
                  <th style={{ padding: '12px 24px' }}>Date</th>
                  <th style={{ padding: '12px 24px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} style={{ padding: '32px 24px', textAlign: 'center', color: 'var(--clr-text-muted)', fontSize: '13px', fontStyle: 'italic' }}>
                    No recent applications found.
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}