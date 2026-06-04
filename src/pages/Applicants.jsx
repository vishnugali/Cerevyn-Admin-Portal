import React, { useState } from 'react';
import { 
  Calendar, Search, Bell, User, SlidersHorizontal, 
  Layers, UserCheck, AlertCircle, Sparkles, Inbox, 
  CheckCircle, Zap, Code, ShieldCheck, FileX
} from 'lucide-react';

// Static Configuration Blueprint for Custom Matrix Stage Tags
const stageConfig = [
  { key: 'applied', label: 'Applied', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', icon: Inbox },
  { key: 'shortlisted', label: 'Shortlisted', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: Sparkles },
  { key: 'tr1', label: 'Technical 1', color: '#a855f7', bg: 'rgba(168,85,247,0.1)', icon: Code },
  { key: 'tr2', label: 'Technical 2', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', icon: Zap },
  { key: 'hired', label: 'Hired', color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: CheckCircle },
  { key: 'rejected', label: 'Archived', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: FileX }
];

const stageLabels = stageConfig.reduce((map, stage) => ({ ...map, [stage.key]: stage }), {});
const jobOptions = ['All Jobs', 'Full Stack Development Intern', 'AI & Machine Learning Intern', 'Agentic AI Intern'];

export default function Applicants() {
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'John Doe', position: 'Full Stack Development Intern', stage: 'applied', date: 'Jun 01', email: 'john@company.com' },
    { id: 2, name: 'Alice Smith', position: 'AI & Machine Learning Intern', stage: 'applied', date: 'May 31', email: 'alice.s@domain.com' },
    { id: 3, name: 'Michael Chen', position: 'Agentic AI Intern', stage: 'applied', date: 'May 30', email: 'm.chen@tech.io' },
    { id: 4, name: 'Sravya Tammana', position: 'Full Stack Development Intern', stage: 'shortlisted', date: 'May 15', email: 'sravya@datacloud.com' },
    { id: 5, name: 'Vishnu', position: 'AI & Machine Learning Intern', stage: 'tr1', date: 'May 15', email: 'vishnu@stack.dev' },
    { id: 6, name: 'Sai', position: 'Agentic AI Intern', stage: 'tr2', date: 'May 15', email: 'sai.kumar@nexus.ai' },
    { id: 7, name: 'Priya Sharma', position: 'Full Stack Development Intern', stage: 'hired', date: 'May 10', email: 'priya@sharma.design' },
    { id: 8, name: 'Alex Johnson', position: 'AI & Machine Learning Intern', stage: 'rejected', date: 'May 08', email: 'alex.j@vector.net' }
  ]);

  const [selectedJobFilter, setSelectedJobFilter] = useState('All Jobs');
  const [selectedStageFilter, setSelectedStageFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeApplicantId, setActiveApplicantId] = useState(1);
  const [draftStages, setDraftStages] = useState({});

  // Dynamic calculations based on state mutation
  const stageCounts = stageConfig.reduce((counts, stage) => ({
    ...counts,
    [stage.key]: applicants.filter((app) => app.stage === stage.key).length
  }), {});

  const filteredApplicants = applicants.filter((app) => {
    const matchesJob = selectedJobFilter === 'All Jobs' || app.position === selectedJobFilter;
    const matchesStage = selectedStageFilter === 'all' || app.stage === selectedStageFilter;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesJob && matchesStage && matchesSearch;
  });

  const activeApplicant = applicants.find(a => a.id === activeApplicantId) || filteredApplicants[0];

  const updateDraftStage = (id, stage) => {
    setDraftStages((prev) => ({ ...prev, [id]: stage }));
  };

  const applyStageChange = (id) => {
    const nextStage = draftStages[id];
    if (!nextStage) return;
    setApplicants((prev) => prev.map((app) => app.id === id ? { ...app, stage: nextStage } : app));
    setDraftStages((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Inline CSS Rule String injected to dynamically wipe out the native visual scrollbars
  const hideScrollbarStyle = `
    .invisible-scrollbar::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
    .invisible-scrollbar {
      -ms-overflow-style: none !important;
      scrollbar-width: none !important;
    }
  `;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#01005D', 
      color: '#f3f4f6',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <style>{hideScrollbarStyle}</style>
      
      {/* Main Workspace Frame */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* ROW 1: Upgraded Big Pipeline Tracking Navigation Grid */}
        <section>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', // Locked exact 7-column layout to prevent UI shifts or item collapse
            gap: '14px',
            width: '100%'
          }}>
            {/* Box 1: All Applications Matrix */}
            <div 
              onClick={() => setSelectedStageFilter('all')}
              style={{
                backgroundColor: selectedStageFilter === 'all' ? '#0024DE' : 'rgba(255,255,255,0.03)',
                border: selectedStageFilter === 'all' ? '2px solid #fff' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedStageFilter === 'all' ? '0 12px 24px rgba(0, 36, 222, 0.4)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ opacity: 0.8, fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Total Pool</span>
                <ShieldCheck size={18} style={{ color: selectedStageFilter === 'all' ? '#fff' : '#9ca3af' }} />
              </div>
              <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#fff' }}>{applicants.length}</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.7, fontWeight: 500 }}>All Applications</p>
            </div>

            {/* Stages 2 through 7: Dynamic Tracking System */}
            {stageConfig.map((stage) => {
              const isActive = selectedStageFilter === stage.key;
              const IconComponent = stage.icon;
              return (
                <div
                  key={stage.key}
                  onClick={() => setSelectedStageFilter(stage.key)}
                  style={{
                    backgroundColor: isActive ? stage.bg : 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isActive ? `inset 0 0 0 2px ${stage.color}` : 'none',
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ color: stage.color, fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{stage.label}</span>
                    <IconComponent size={18} style={{ color: stage.color }} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#fff' }}>{stageCounts[stage.key]}</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#9ca3af' }}>Active Profiles</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ROW 2: Candidate Carousel Feed (Scrollbar hidden via CSS blueprint rules) */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#9ca3af' }}>
            Filtered Feeding Line ({filteredApplicants.length} Candidates Shown)
          </h3>

          <div 
            className="invisible-scrollbar"
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              padding: '4px 0px 8px 0px',
              scrollBehavior: 'smooth'
            }}
          >
            {filteredApplicants.length === 0 ? (
              <div style={{ padding: '40px', width: '100%', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)', textAlign: 'center', color: '#9ca3af' }}>
                <AlertCircle size={24} style={{ marginBottom: '8px', color: '#4b5563', display: 'inline-block' }} />
                <p style={{ margin: 0, fontSize: '14px' }}>No candidates found within this specific matrix view segment.</p>
              </div>
            ) : (
              filteredApplicants.map((applicant) => {
                const currentStage = stageLabels[applicant.stage];
                const isSelected = activeApplicant && activeApplicant.id === applicant.id;
                return (
                  <div
                    key={applicant.id}
                    onClick={() => setActiveApplicantId(applicant.id)}
                    style={{
                      flex: '0 0 310px', 
                      backgroundColor: isSelected ? 'rgba(0, 36, 222, 0.15)' : 'rgba(255,255,255,0.02)',
                      border: isSelected ? '2px solid #0024DE' : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '14px',
                      padding: '18px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '16px',
                      transition: 'all 0.15s',
                      boxShadow: isSelected ? '0 8px 24px rgba(0, 36, 222, 0.25)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: currentStage.bg,
                        color: currentStage.color,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '14px',
                        fontWeight: 700,
                        flexShrink: 0
                      }}>
                        {applicant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#f3f4f6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {applicant.name}
                        </h4>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {applicant.position}
                        </p>
                      </div>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      borderTop: '1px solid rgba(255,255,255,0.05)', 
                      paddingTop: '12px' 
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#6b7280', fontSize: '12px' }}>
                        <Calendar size={13} /> {applicant.date}
                      </span>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: currentStage.bg,
                        color: currentStage.color,
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px'
                      }}>
                        {currentStage.label}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ROW 3: Inspection View Workspace & Operational Control Engine */}
        {activeApplicant && (
          <section style={{
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1fr', gap: '32px', alignItems: 'start' }}>
              
              {/* Box 1: Core Target Profile Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: stageLabels[activeApplicant.stage].bg,
                  color: stageLabels[activeApplicant.stage].color,
                  fontSize: '18px',
                  fontWeight: 700,
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  {activeApplicant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{activeApplicant.name}</h2>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeApplicant.email}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6b7280' }}>Applied on {activeApplicant.date}</p>
                </div>
              </div>

              {/* Box 2: Stage Map Progress Timeline */}
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '32px' }}>
                <p style={{ margin: '0 0 16px', fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Target Pipeline Progress
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', width: '100%' }}>
                  {stageConfig.map((st, idx) => {
                    const currentActiveIdx = stageConfig.findIndex(s => s.key === activeApplicant.stage);
                    const isPassedOrCurrent = currentActiveIdx >= idx;
                    
                    return (
                      <React.Fragment key={st.key}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 2 }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: isPassedOrCurrent ? st.color : '#1f2937',
                            boxShadow: isPassedOrCurrent ? `0 0 10px ${st.color}` : 'none',
                          }} />
                          <span style={{ 
                            fontSize: '11px', 
                            color: isPassedOrCurrent ? '#f3f4f6' : '#4b5563',
                            fontWeight: activeApplicant.stage === st.key ? 700 : 400,
                            whiteSpace: 'nowrap'
                          }}>
                            {st.label}
                          </span>
                        </div>
                        {idx < stageConfig.length - 1 && (
                          <div style={{
                            flex: 1,
                            height: '2px',
                            backgroundColor: currentActiveIdx > idx ? stageConfig[idx].color : 'rgba(255,255,255,0.06)',
                            marginTop: '-16px',
                            minWidth: '20px'
                          }} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Box 3: Routing Core Dropdown Select */}
              <div style={{ 
                backgroundColor: 'rgba(0,0,0,0.15)', 
                padding: '16px', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9ca3af' }}>Move Candidate to:</label>
                <select
                  value={draftStages[activeApplicant.id] || activeApplicant.stage}
                  onChange={(e) => updateDraftStage(activeApplicant.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: '#01005D', 
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {stageConfig.map((opt) => (
                    <option key={opt.key} value={opt.key} style={{backgroundColor: '#01005D'}}>{opt.label}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Bottom Operation Action Panel Button */}
            <div style={{ 
              borderTop: '1px solid rgba(255,255,255,0.06)', 
              paddingTop: '16px',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => applyStageChange(activeApplicant.id)}
                disabled={!(draftStages[activeApplicant.id] && draftStages[activeApplicant.id] !== activeApplicant.stage)}
                style={{
                  minWidth: '240px',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: (draftStages[activeApplicant.id] && draftStages[activeApplicant.id] !== activeApplicant.stage) ? 'pointer' : 'not-allowed',
                  backgroundColor: (draftStages[activeApplicant.id] && draftStages[activeApplicant.id] !== activeApplicant.stage) ? '#0024DE' : 'rgba(255,255,255,0.04)', 
                  color: (draftStages[activeApplicant.id] && draftStages[activeApplicant.id] !== activeApplicant.stage) ? '#fff' : '#4b5563',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.15s',
                  boxShadow: (draftStages[activeApplicant.id] && draftStages[activeApplicant.id] !== activeApplicant.stage) ? '0 4px 14px rgba(0, 36, 222, 0.4)' : 'none'
                }}
              >
                <UserCheck size={16} />
                {draftStages[activeApplicant.id] && draftStages[activeApplicant.id] !== activeApplicant.stage ? 'Commit Stage Shift' : 'Pipeline Up to Date'}
              </button>
            </div>

          </section>
        )}

      </div>
    </div>
  );
}