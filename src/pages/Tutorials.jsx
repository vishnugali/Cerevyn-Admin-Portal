import React, { useState } from 'react';
import { 
  Search, BookOpen, Trash2, Eye, Edit3, Plus, 
  SlidersHorizontal, RefreshCw, X, Calendar, Tag, PlayCircle, ChevronDown, Clock, GraduationCap 
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Global Supabase initialization configuration
const supabaseUrl = 'https://cpvhzdxxpgftjkjqadec.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdmh6ZHh4cGdmdGpranFhZGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDY4NjEsImV4cCI6MjA5NTg4Mjg2MX0._nBO3Dlv09pHh8LjcLfMH7sovDvQJDz9qKAN_rlrP4I';
const STORAGE_BUCKET_NAME = 'blog-assets';
const _supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function TutorialsDashboard() {
  // Initial database state
  const initialTutorials = [
    {
      id: 1,
      title: 'Getting Started with AI in Healthcare',
      description: 'Learn how to implement AI-powered diagnostics and patient monitoring systems.',
      category: 'Healthcare',
      duration: '45min',
      level: 'Beginner',
      tags: ['Diagnostics', 'Patient Care', 'Medical AI'],
      ctaStatus: 'Watch Now',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      letter: 'H',
      bgColor: '#0024DE'
    },
    {
      id: 2,
      title: 'Building Educational AI Platforms',
      description: 'Comprehensive guide to adaptive learning systems using AI and ML.',
      category: 'Education',
      duration: '45min',
      level: 'Beginner',
      tags: ['Adaptive Learning', 'ML', 'EdTech'],
      ctaStatus: 'Coming Soon',
      videoUrl: '',
      letter: 'E',
      bgColor: '#0f766e'
    },
    {
      id: 3,
      title: 'AI Automation for Business Operations',
      description: 'Discover how to automate repetitive tasks and optimize workflows.',
      category: 'Automation',
      duration: '45min',
      level: 'Beginner',
      tags: ['Workflows', 'Optimization', 'Tasks'],
      ctaStatus: 'Watch Now',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      letter: 'A',
      bgColor: '#14532d'
    }
  ];

  // React State Management
  const [tutorials, setTutorials] = useState(initialTutorials);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Sectors');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [modalData, setModalData] = useState(null);
  
  // Unified Form Control States (For Add & Edit)
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('Healthcare');
  const [formDuration, setFormDuration] = useState('45min');
  const [formLevel, setFormLevel] = useState('Beginner');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formTags, setFormTags] = useState('');

  const toggleCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setSelectedCategory('All Sectors');
    setTutorials(initialTutorials);
  };

  const handleDeleteTutorial = (id, title) => {
    if (window.confirm(`Are you sure you want to remove this tutorial course:\n"${title}"?`)) {
      setTutorials(tutorials.filter(t => t.id !== id));
    }
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setCurrentEditId(null);
    setFormTitle('');
    setFormDescription('');
    setFormCategory('Healthcare');
    setFormDuration('45min');
    setFormLevel('Beginner');
    setFormVideoUrl('');
    setFormTags('');
    setShowFormModal(true);
  };

  const openEditModal = (tutorial) => {
    setIsEditMode(true);
    setCurrentEditId(tutorial.id);
    setFormTitle(tutorial.title);
    setFormDescription(tutorial.description);
    setFormCategory(tutorial.category);
    setFormDuration(tutorial.duration);
    setFormLevel(tutorial.level);
    setFormVideoUrl(tutorial.videoUrl || '');
    setFormTags(tutorial.tags.join(', '));
    setShowFormModal(true);
  };

  const fetchTutorials = async () => {
    const { data, error } = await _supabase
      .from('tutorials')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Supabase Fetch Error:', error);
      return;
    }

    if (data) {
      setTutorials(data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        duration: item.duration,
        level: item.level,
        tags: item.tags || ['General'],
        ctaStatus: item.video_url ? 'Watch Now' : 'Coming Soon',
        videoUrl: item.video_url || '',
        letter: item.title ? item.title.charAt(0).toUpperCase() : '',
        bgColor: item.category === 'Healthcare' ? '#0024DE' : item.category === 'Education' ? '#0f766e' : '#14532d'
      })));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle || !formDescription) {
      alert("Please populate Title and Description parameters before executing.");
      return;
    }

    const payload = {
      title: formTitle,
      description: formDescription,
      category: formCategory,
      duration: formDuration,
      level: formLevel,
      video_url: formVideoUrl,
      tags: formTags.split(',').map(tag => tag.trim())
    };

    if (isEditMode) {
      const { error } = await _supabase
        .from('tutorials')
        .update(payload)
        .eq('id', currentEditId);

      if (error) {
        console.error('Supabase Update Error:', error);
        alert('Failed to update tutorial in database.');
        return;
      }
    } else {
      const { error } = await _supabase
        .from('tutorials')
        .insert([payload]);

      if (error) {
        console.error('Supabase Insert Error:', error);
        alert('Failed to save tutorial to database.');
        return;
      }
    }

    await fetchTutorials();
    setShowFormModal(false);
  };

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Sectors' ? true : tutorial.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // FIXED EXACT ALIGNMENT SYSTEM MATRIX MATCHING BLOG GRID SCHEMA
  const gridLayoutSchema = {
    display: 'grid',
    gridTemplateColumns: '320px 1fr 160px 100px 220px', 
    gap: '24px',
    alignItems: 'center'
  };

  return (
    <div style={{ backgroundColor: '#01005D', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#cbd5e1' }}>
      
      <style>{`
        .premium-row { transition: all 0.25s ease; }
        .premium-row:hover { background-color: rgba(255, 255, 255, 0.08) !important; }
        .premium-btn { transition: all 0.2s ease; }
        .premium-btn:hover { background-color: rgba(255, 255, 255, 0.15) !important; }
        .action-primary-btn:hover { background-color: #001ec2 !important; filter: brightness(1.1); }
        .action-trigger { opacity: 0.8; transition: all 0.2s ease; }
        .premium-row:hover .action-trigger { opacity: 1; }
        .action-trigger:hover { transform: scale(1.05); }
        .custom-select:focus, .custom-textarea:focus, .custom-input:focus { border-color: #0024DE !important; }
      `}</style>

      <div style={{ padding: '40px 48px', flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Upper Control Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: '#0024DE', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.08em' }}>LEARNING HUB</span>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.4)' }}></div>
              <span style={{ fontSize: '11px', color: '#93c5fd', fontWeight: '600' }}>{filteredTutorials.length} TRACKS ONLINE</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>Tutorial Hub Management</h2>
            <p style={{ fontSize: '14px', color: '#93c5fd', marginTop: '6px', margin: 0, opacity: 0.8 }}>
              Modify metadata, update streaming assets, and manage sector-specific learning tracks.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#93c5fd', opacity: 0.7 }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search training data..."
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', padding: '10px 16px 10px 38px', fontSize: '13px', color: '#ffffff', outline: 'none', width: '220px' }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} className="premium-btn" style={filterButtonStyle}>
                <SlidersHorizontal size={13} /> 
                <span>{selectedCategory}</span>
                <ChevronDown size={12} style={{ opacity: 0.6 }} />
              </button>
              
              {showCategoryDropdown && (
                <div style={{ position: 'absolute', right: 0, top: '42px', backgroundColor: '#01004a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', zIndex: 10, width: '180px', padding: '6px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                  {['All Sectors', 'Healthcare', 'Education', 'Automation'].map((cat) => (
                    <div 
                      key={cat}
                      onClick={() => toggleCategory(cat)} 
                      style={{ padding: '8px 12px', fontSize: '13px', color: selectedCategory === cat ? '#ffffff' : '#93c5fd', cursor: 'pointer', borderRadius: '6px', backgroundColor: selectedCategory === cat ? 'rgba(255,255,255,0.1)' : 'transparent' }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={handleRefresh} className="premium-btn" style={{ ...filterButtonStyle, padding: '11px' }}>
              <RefreshCw size={13} />
            </button>

            {/* ADD TUTORIAL PRIMARY CONTROL BUTTON - ASSIGNED TO #0024DE */}
            <button onClick={openCreateModal} className="action-primary-btn" style={{ ...filterButtonStyle, backgroundColor: '#0024DE', color: '#ffffff', border: 'none', fontWeight: '700', padding: '10px 18px', transition: 'all 0.2s ease' }}>
              <Plus size={14} /> Add Tutorial
            </button>
          </div>
        </div>

        {/* Content Table Shell Matrix */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', overflow: 'hidden' }}>
          
          {/* Main Grid Header Structural Layout */}
          <div style={{ ...gridLayoutSchema, padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
            <span style={tableColumnLabelStyle}>COURSE TRACK</span>
            <span style={tableColumnLabelStyle}>METRICS & OVERVIEW</span>
            <span style={tableColumnLabelStyle}>ATTRIBUTES</span>
            <span style={tableColumnLabelStyle}>PORTAL STATUS</span>
            <span style={{ ...tableColumnLabelStyle, textAlign: 'right' }}>SYSTEM CONTROLS</span>
          </div>

          {/* Table Data Matrix Mapping Loop */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredTutorials.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#93c5fd' }}>No training tracks found matching selections.</div>
            ) : (
              filteredTutorials.map((tutorial, idx) => (
                <div 
                  key={tutorial.id} 
                  className="premium-row"
                  style={{ ...gridLayoutSchema, padding: '20px 24px', borderBottom: idx === filteredTutorials.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Col 1: Visual Identity Badge block */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: tutorial.bgColor, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                      {tutorial.letter}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={tutorial.title}>
                        {tutorial.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                          <Tag size={10} /> {tutorial.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Col 2: Protected Clamped Non-Overlapping Description brief text */}
                  <div style={{ fontSize: '13px', color: '#e2e8f0', opacity: 0.85, lineHeight: '1.5', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {tutorial.description}
                  </div>

                  {/* Col 3: Course Attributes Info stack */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>
                      <Clock size={13} style={{ color: '#4ade80' }} /> {tutorial.duration}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#93c5fd', paddingLeft: '19px', fontWeight: '700', opacity: 0.8 }}>
                      <GraduationCap size={12} /> {tutorial.level.toUpperCase()}
                    </div>
                  </div>

                  {/* Col 4: Portal Status Tags operational flags */}
                  <div>
                    <span style={{ 
                      fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '12px',
                      backgroundColor: tutorial.ctaStatus === 'Watch Now' ? 'rgba(5,246,117,0.12)' : 'rgba(255,255,255,0.06)',
                      color: tutorial.ctaStatus === 'Watch Now' ? '#4ade80' : '#93c5fd',
                      border: tutorial.ctaStatus === 'Watch Now' ? '1px solid rgba(74,222,128,0.35)' : '1px solid rgba(147,197,253,0.2)'
                    }}>
                      {tutorial.ctaStatus.toUpperCase()}
                    </span>
                  </div>

                  {/* Col 5: Micro controls operational buttons blueprint */}
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button onClick={() => setModalData(tutorial)} className="action-trigger" style={{ ...actionRowBtnStyle, color: '#ffffff' }}>
                      <Eye size={12} style={{ marginRight: '4px' }} /> VIEW
                    </button>
                    <button onClick={() => openEditModal(tutorial)} className="action-trigger" style={{ ...actionRowBtnStyle, color: '#60a5fa' }}>
                      <Edit3 size={12} style={{ marginRight: '4px' }} /> EDIT
                    </button>
                    <button onClick={() => handleDeleteTutorial(tutorial.id, tutorial.title)} className="action-trigger" style={{ ...actionRowBtnStyle, color: '#f87171' }}>
                      <Trash2 size={12} style={{ marginRight: '4px' }} /> REMOVE
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* HORIZONTAL COMPACT MODAL GRID BOX - SHARED CONFIGURATION */}
      {showFormModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(1, 0, 40, 0.65)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '24px', boxSizing: 'border-box' }}>
          <form onSubmit={handleFormSubmit} style={{ backgroundColor: '#01004a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '960px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
            
            {/* Header Layout Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#93c5fd', letterSpacing: '0.1em' }}>
                  {isEditMode ? 'SYSTEM MUTATION CORE' : 'CREATION NODE'}
                </span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: '700', color: '#ffffff' }}>
                  {isEditMode ? 'Modify Tutorial Parameters' : 'Deploy New Tutorial Track'}
                </h3>
              </div>
              <button type="button" onClick={() => setShowFormModal(false)} style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <X size={16} />
              </button>
            </div>

            {/* HORIZONTAL TWO COLUMN FORM SPLIT DESIGN */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              
              {/* Left Form Block Panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={formLabelStyle}>Course Title <span style={{ color: '#f87171' }}>*</span></label>
                  <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="custom-input" placeholder="e.g. AI Workflow Integration" style={formInputStyle} />
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={formLabelStyle}>Category Sector</label>
                    <div style={{ position: 'relative', width: '100%' }}>
                      <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="custom-select" style={{ ...formInputStyle, appearance: 'none', paddingRight: '40px' }}>
                        <option value="Healthcare" style={formOptionStyle}>Healthcare</option>
                        <option value="Education" style={formOptionStyle}>Education</option>
                        <option value="Automation" style={formOptionStyle}>Automation</option>
                      </select>
                      <ChevronDown size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#93c5fd', pointerEvents: 'none' }} />
                    </div>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <label style={formLabelStyle}>Duration</label>
                    <input type="text" value={formDuration} onChange={(e) => setFormDuration(e.target.value)} className="custom-input" style={formInputStyle} />
                  </div>
                </div>

                <div>
                  <label style={formLabelStyle}>Complexity Matrix Level</label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <select value={formLevel} onChange={(e) => setFormLevel(e.target.value)} className="custom-select" style={{ ...formInputStyle, appearance: 'none', paddingRight: '40px' }}>
                      <option value="Beginner" style={formOptionStyle}>Beginner</option>
                      <option value="Intermediate" style={formOptionStyle}>Intermediate</option>
                      <option value="Advanced" style={formOptionStyle}>Advanced</option>
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#93c5fd', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Right Form Block Panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={formLabelStyle}>Description Summary <span style={{ color: '#f87171' }}>*</span></label>
                  <textarea required rows={2} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} className="custom-textarea" placeholder="Explore structural operations or platform modules..." style={{ ...formInputStyle, height: '46px', resize: 'none', fontFamily: 'inherit', lineHeight: '1.5' }} />
                </div>

                <div>
                  <label style={formLabelStyle}>Streaming Video URL Link</label>
                  <input type="url" value={formVideoUrl} onChange={(e) => setFormVideoUrl(e.target.value)} className="custom-input" placeholder="https://example.com/video.mp4" style={formInputStyle} />
                </div>

                <div>
                  <label style={formLabelStyle}>Filter Meta Tags (Comma Separated)</label>
                  <input type="text" value={formTags} onChange={(e) => setFormTags(e.target.value)} className="custom-input" placeholder="AI, Workflow, Data" style={formInputStyle} />
                </div>
              </div>

            </div>

            {/* Modal action control hub - PRIMARY CONFIRM SUBMIT ASSIGNED TO #0024DE */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '8px' }}>
              <button type="button" onClick={() => setShowFormModal(false)} className="premium-btn" style={{ ...formBtnStyle, backgroundColor: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', width: '120px' }}>
                Cancel
              </button>
              <button type="submit" className="action-primary-btn" style={{ ...formBtnStyle, backgroundColor: '#0024DE', color: '#ffffff', width: '180px', padding: '12px 24px', transition: 'all 0.2s ease' }}>
                {isEditMode ? 'Apply Updates' : 'Deploy Track'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DETAILS INSPECTION POPUP DRAWER MODEL */}
      {modalData && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(1, 0, 40, 0.65)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '24px' }}>
          <div style={{ backgroundColor: '#01004a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '520px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>{modalData.category.toUpperCase()}</span>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#ffffff', lineHeight: '1.4' }}>{modalData.title}</h3>
              </div>
              <button onClick={() => setModalData(null)} style={{ background: 'none', border: 'none', color: '#93c5fd', cursor: 'pointer' }}><X size={16} /></button>
            </div>

            {/* Video or Dummy placeholder stream component inside drawer */}
            {modalData.videoUrl ? (
              <div style={{ width: '100%', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.15)' }}>
                <video src={modalData.videoUrl} controls style={{ width: '100%', height: '100%' }} />
              </div>
            ) : (
              <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px', padding: '36px 0', textAlign: 'center', color: '#93c5fd', fontSize: '12px', marginBottom: '20px' }}>
                <PlayCircle size={32} style={{ color: '#93c5fd', display: 'block', margin: '0 auto 10px auto', opacity: 0.7 }} />
                Streaming Asset Not Yet Deployed
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', color: '#e2e8f0', lineHeight: '1.6' }}>
              <div>
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '6px', fontSize: '12px' }}>Overview Core Description:</strong>
                <p style={{ margin: 0, opacity: 0.8 }}>{modalData.description}</p>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                {modalData.tags.map((tag, idx) => (
                  <span key={idx} style={{ fontSize: '11px', color: '#93c5fd', backgroundColor: 'rgba(255,255,255,0.1)', padding: '3px 10px', borderRadius: '6px', fontWeight: '500' }}>#{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '4px' }}>
                <div><span style={{ color: '#ffffff', fontWeight: '600' }}>Duration:</span> {modalData.duration}</div>
                <div><span style={{ color: '#ffffff', fontWeight: '600' }}>Complexity:</span> {modalData.level}</div>
              </div>
            </div>

            {/* Modal Controls Actions - CLOSE BUTTON ASSIGNED TO #0024DE */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              <button onClick={() => { setModalData(null); openEditModal(modalData); }} className="premium-btn" style={{ ...formBtnStyle, width: '40%', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}>
                Edit Settings
              </button>
              <button onClick={() => setModalData(null)} className="action-primary-btn" style={{ ...formBtnStyle, width: '60%', backgroundColor: '#0024DE', color: '#ffffff', transition: 'all 0.2s ease' }}>
                Close Overview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Global Static Properties blueprint setups
const tableColumnLabelStyle = { fontSize: '10px', fontWeight: '700', color: '#93c5fd', letterSpacing: '0.08em', opacity: 0.8 };
const filterButtonStyle = { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', color: '#ffffff', cursor: 'pointer', outline: 'none' };
const actionRowBtnStyle = { background: 'none', border: 'none', fontSize: '11px', fontWeight: '700', cursor: 'pointer', padding: '4px', display: 'inline-flex', alignItems: 'center', letterSpacing: '0.04em' };
const formLabelStyle = { display: 'block', fontSize: '12px', fontWeight: '700', color: '#ffffff', marginBottom: '6px' };
const formInputStyle = { width: '100%', padding: '10px 14px', boxSizing: 'border-box', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.05)' };
const formOptionStyle = { backgroundColor: '#01004a', color: '#ffffff' };
const formBtnStyle = { padding: '10px 16px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };