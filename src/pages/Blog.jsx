import React, { useState } from 'react';
import { 
  Search, BookOpen, Trash2, Eye, Edit3, Plus, 
  SlidersHorizontal, RefreshCw, X, Calendar, Tag, Image, ChevronDown 
} from 'lucide-react';

export default function BlogDashboard() {
  const initialBlogs = [
    {
      id: 1,
      title: 'Quantum Computing: Unlocking the Future of Technology',
      summary: 'Explore the fundamentals, breakthroughs, and potential applications of quantum computing.',
      category: 'Quantum Computing',
      publishDate: '2026-06-01',
      displayDate: 'June 01, 2026',
      views: '1,240',
      status: 'Published',
      letter: 'Q',
      bgColor: '#0024DE',
      imageFile: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      title: 'What is Blockchain? An In-Depth Introduction',
      summary: 'Explore the basics of blockchain technology, how it works, and its impact on industries.',
      category: 'Blockchain',
      publishDate: '2026-05-28',
      displayDate: 'May 28, 2026',
      views: '984',
      status: 'Published',
      letter: 'B',
      bgColor: '#0f766e',
      imageFile: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      title: 'Understanding Agentic AI: Future of Autonomous Systems',
      summary: 'Discover how AI agents are changing the next generation of automation.',
      category: 'Agentic AI',
      publishDate: '2026-05-25',
      displayDate: 'May 25, 2026',
      views: '2,415',
      status: 'Published',
      letter: 'A',
      bgColor: '#14532d',
      imageFile: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&auto=format&fit=crop&q=60'
    }
  ];

  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

  const [formTitle, setFormTitle] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formCategory, setFormCategory] = useState('Quantum Computing');
  const [formPreviewUrl, setFormPreviewUrl] = useState('');

  const toggleCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setBlogs(initialBlogs);
  };

  const handleDeletePost = (id, title) => {
    if (window.confirm(`Are you sure you want to unpublish and delete:\n"${title}"?`)) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormPreviewUrl(URL.createObjectURL(file));
    }
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setCurrentBlogId(null);
    setFormTitle('');
    setFormSummary('');
    setFormCategory('Quantum Computing');
    setFormPreviewUrl('');
    setShowFormModal(true);
  };

  const openEditModal = (blog) => {
    setIsEditMode(true);
    setCurrentBlogId(blog.id);
    setFormTitle(blog.title);
    setFormSummary(blog.summary);
    setFormCategory(blog.category);
    setFormPreviewUrl(blog.imageFile || '');
    setShowFormModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formTitle || !formSummary) {
      alert("Please fill in both the Title and Summary fields.");
      return;
    }

    if (isEditMode) {
      setBlogs(blogs.map(blog => {
        if (blog.id === currentBlogId) {
          return {
            ...blog,
            title: formTitle,
            summary: formSummary,
            category: formCategory,
            letter: formTitle.charAt(0).toUpperCase(),
            bgColor: formCategory === 'Quantum Computing' ? '#0024DE' : formCategory === 'Blockchain' ? '#0f766e' : '#14532d',
            imageFile: formPreviewUrl
          };
        }
        return blog;
      }));
    } else {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
      const yyyymmdd = today.toISOString().split('T')[0];

      const newPost = {
        id: Date.now(),
        title: formTitle,
        summary: formSummary,
        category: formCategory,
        publishDate: yyyymmdd,
        displayDate: formattedDate,
        views: '0',
        status: 'Published',
        letter: formTitle.charAt(0).toUpperCase(),
        bgColor: formCategory === 'Quantum Computing' ? '#0024DE' : formCategory === 'Blockchain' ? '#0f766e' : '#14532d',
        imageFile: formPreviewUrl
      };
      setBlogs([newPost, ...blogs]);
    }

    setShowFormModal(false);
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' ? true : blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', wrap: 'nowrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: '#0024DE', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.08em' }}>CONTENT MANAGER</span>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.4)' }}></div>
              <span style={{ fontSize: '11px', color: '#93c5fd', fontWeight: '600' }}>{filteredBlogs.length} POSTS LIVE</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>Blog Content Insights</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {/* SEARCH BAR */}
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#93c5fd', opacity: 0.7 }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                style={inputLayoutStyle}
              />
            </div>

            {/* CATEGORY DROPDOWN TRIGGER */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} className="premium-btn" style={buttonLayoutStyle}>
                <SlidersHorizontal size={13} /> 
                <span>{selectedCategory}</span>
                <ChevronDown size={12} style={{ opacity: 0.6 }} />
              </button>
              
              {showCategoryDropdown && (
                <div style={{ position: 'absolute', right: 0, top: '46px', backgroundColor: '#01004a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', zIndex: 10, width: '180px', padding: '6px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                  {['All Categories', 'Quantum Computing', 'Blockchain', 'Agentic AI'].map((cat) => (
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

            {/* REFRESH CONTROL ICON */}
            <button onClick={handleRefresh} className="premium-btn" style={{ ...buttonLayoutStyle, padding: '0', width: SHARED_HEIGHT, justifyContent: 'center' }}>
              <RefreshCw size={13} />
            </button>

            {/* ADD POST PRIMARY CONTROL BUTTON */}
            <button onClick={openCreateModal} className="action-primary-btn" style={{ ...buttonLayoutStyle, backgroundColor: '#0024DE', color: '#ffffff', border: 'none', fontWeight: '700', whiteSpace: 'nowrap' }}>
              <Plus size={14} /> Add Post
            </button>
          </div>
        </div>

        {/* Content Table Shell */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', overflow: 'hidden' }}>
          
          {/* Main Grid Header */}
          <div style={{ ...gridLayoutSchema, padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
            <span style={tableColumnLabelStyle}>ARTICLE DETAILS</span>
            <span style={tableColumnLabelStyle}>SUMMARY BRIEF</span>
            <span style={tableColumnLabelStyle}>PUBLISHED TIMELINE</span>
            <span style={tableColumnLabelStyle}>TRAFFIC</span>
            <span style={{ ...tableColumnLabelStyle, textAlign: 'right' }}>SYSTEM CONTROLS</span>
          </div>

          {/* Table Data Matrix */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredBlogs.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#93c5fd' }}>No records match your query filters.</div>
            ) : (
              filteredBlogs.map((blog, idx) => (
                <div 
                  key={blog.id} 
                  className="premium-row"
                  style={{ ...gridLayoutSchema, padding: '20px 24px', borderBottom: idx === filteredBlogs.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Article Label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: blog.bgColor, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                      {blog.letter}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={blog.title}>
                        {blog.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                          <Tag size={10} /> {blog.category.toUpperCase()}
                        </span>
                        {blog.imageFile && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: '700', color: '#93c5fd', backgroundColor: 'rgba(147,197,253,0.2)', padding: '2px 6px', borderRadius: '4px' }}>
                            <Image size={10} /> LAYER
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Summary Block */}
                  <div style={{ fontSize: '13px', color: '#e2e8f0', opacity: 0.85, lineHeight: '1.5', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {blog.summary}
                  </div>

                  {/* Date Timeline */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>
                      <Calendar size={13} style={{ color: '#4ade80' }} /> {blog.displayDate}
                    </div>
                    <span style={{ fontSize: '10px', color: '#93c5fd', paddingLeft: '19px', fontWeight: '700', opacity: 0.8 }}>{blog.status.toUpperCase()}</span>
                  </div>

                  {/* Engagement Metrics */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#ffffff', fontWeight: '600' }}>
                    <BookOpen size={13} style={{ color: '#93c5fd' }} /> 
                    <span>{blog.views}</span>
                  </div>

                  {/* Control Suite Actions */}
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button onClick={() => setModalData(blog)} className="action-trigger" style={{ ...actionRowBtnStyle, color: '#ffffff' }}>
                      <Eye size={12} style={{ marginRight: '4px' }} /> VIEW
                    </button>
                    <button onClick={() => openEditModal(blog)} className="action-trigger" style={{ ...actionRowBtnStyle, color: '#60a5fa' }}>
                      <Edit3 size={12} style={{ marginRight: '4px' }} /> EDIT
                    </button>
                    <button onClick={() => handleDeletePost(blog.id, blog.title)} className="action-trigger" style={{ ...actionRowBtnStyle, color: '#f87171' }}>
                      <Trash2 size={12} style={{ marginRight: '4px' }} /> REMOVE
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* HORIZONTAL COMPACT MODAL GRID BOX */}
      {showFormModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(1, 0, 40, 0.65)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '24px', boxSizing: 'border-box' }}>
          <form onSubmit={handleFormSubmit} style={{ backgroundColor: '#01004a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '960px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
            
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#93c5fd', letterSpacing: '0.1em' }}>
                  {isEditMode ? 'SYSTEM MUTATION CORE' : 'CREATION NODE'}
                </span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: '700', color: '#ffffff' }}>
                  {isEditMode ? 'Modify Article Parameters' : 'Publish New Blog Asset'}
                </h3>
              </div>
              <button type="button" onClick={() => setShowFormModal(false)} style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <X size={16} />
              </button>
            </div>

            {/* Side-by-Side Flex Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              
              {/* Left Column Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={formLabelStyle}>Article Title <span style={{ color: '#f87171' }}>*</span></label>
                  <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="custom-input" placeholder="e.g. Next-Gen Computing Paradigms" style={formInputStyle} />
                </div>

                <div>
                  <label style={formLabelStyle}>Category Domain Mapping</label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="custom-select" style={{ ...formInputStyle, appearance: 'none', paddingRight: '40px' }}>
                      <option value="Quantum Computing" style={formOptionStyle}>Quantum Computing</option>
                      <option value="Blockchain" style={formOptionStyle}>Blockchain</option>
                      <option value="Agentic AI" style={formOptionStyle}>Agentic AI</option>
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#93c5fd', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Right Column Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={formLabelStyle}>Summary Brief Definition <span style={{ color: '#f87171' }}>*</span></label>
                  <textarea required rows={2} value={formSummary} onChange={(e) => setFormSummary(e.target.value)} className="custom-textarea" placeholder="Provide deep systemic insight into target topic parameters..." style={{ ...formInputStyle, height: '46px', resize: 'none', fontFamily: 'inherit', lineHeight: '1.5' }} />
                </div>

                <div>
                  <label style={formLabelStyle}>{isEditMode ? 'Replace Image Vector Binary' : 'Upload Cover Asset Layer'}</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer', zIndex: 2 }} />
                    <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center' }}>
                      <Image size={16} style={{ color: '#93c5fd' }} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: '500' }}>Choose layout graphics asset</div>
                      <div style={{ fontSize: '11px', color: '#93c5fd', opacity: 0.8 }}>PNG, JPG or WEBP formats</div>
                    </div>
                  </div>
                  
                  {formPreviewUrl && (
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                      <img src={formPreviewUrl} alt="Preview" style={{ width: '44px', height: '28px', borderRadius: '4px', objectFit: 'cover' }} />
                      <span style={{ fontSize: '11px', color: '#93c5fd' }}>Binary stream attached successfully.</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Submittal Controls */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '8px' }}>
              <button type="button" onClick={() => setShowFormModal(false)} className="premium-btn" style={{ ...formBtnStyle, backgroundColor: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', width: '120px' }}>
                Cancel
              </button>
              <button type="submit" className="action-primary-btn" style={{ ...formBtnStyle, backgroundColor: '#0024DE', color: '#ffffff', width: '180px', padding: '12px 24px', transition: 'all 0.2s ease' }}>
                {isEditMode ? 'Apply Changes' : 'Deploy Post Asset'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Inspect View Overlay Frame */}
      {modalData && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(1, 0, 40, 0.65)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '24px' }}>
          <div style={{ backgroundColor: '#01004a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: '4px' }}>{modalData.category.toUpperCase()}</span>
                <h3 style={{ margin: '6px 0 0 0', fontSize: '18px', fontWeight: '700', color: '#ffffff' }}>{modalData.title}</h3>
              </div>
              <button onClick={() => setModalData(null)} style={{ background: 'none', border: 'none', color: '#93c5fd', cursor: 'pointer' }}><X size={16} /></button>
            </div>

            {modalData.imageFile && (
              <img src={modalData.imageFile} alt="Cover" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.1)' }} />
            )}
            
            <p style={{ fontSize: '13px', color: '#e2e8f0', opacity: 0.8, lineHeight: '1.6', margin: '0 0 20px 0' }}>{modalData.summary}</p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => { setModalData(null); openEditModal(modalData); }} className="premium-btn" style={{ ...formBtnStyle, flexGrow: 1, backgroundColor: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}>
                Modify
              </button>
              <button onClick={() => setModalData(null)} className="action-primary-btn" style={{ ...formBtnStyle, flexGrow: 2, backgroundColor: '#0024DE', color: '#ffffff', transition: 'all 0.2s ease' }}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Global UI Layout Variables
const SHARED_HEIGHT = '40px'; 

// Inline Properties Blueprint Objects
const tableColumnLabelStyle = { fontSize: '10px', fontWeight: '700', color: '#93c5fd', letterSpacing: '0.08em', opacity: 0.8 };
const actionRowBtnStyle = { background: 'none', border: 'none', fontSize: '11px', fontWeight: '700', cursor: 'pointer', padding: '4px', display: 'inline-flex', alignItems: 'center', letterSpacing: '0.04em' };
const formLabelStyle = { display: 'block', fontSize: '12px', fontWeight: '700', color: '#ffffff', marginBottom: '6px' };
const formInputStyle = { width: '100%', padding: '10px 14px', boxSizing: 'border-box', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.05)' };
const formOptionStyle = { backgroundColor: '#01004a', color: '#ffffff' };
const formBtnStyle = { padding: '10px 16px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };

// Unified Control Sizing Specifications
const buttonLayoutStyle = { 
  display: 'inline-flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  gap: '8px', 
  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
  border: '1px solid rgba(255, 255, 255, 0.15)', 
  padding: '0 16px', 
  borderRadius: '8px', 
  fontSize: '13px', 
  color: '#ffffff', 
  cursor: 'pointer', 
  outline: 'none',
  height: SHARED_HEIGHT,
  boxSizing: 'border-box'
};

const inputLayoutStyle = { 
  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
  border: '1px solid rgba(255, 255, 255, 0.2)', 
  borderRadius: '8px', 
  padding: '0 16px 0 38px', 
  fontSize: '13px', 
  color: '#ffffff', 
  outline: 'none', 
  width: '220px',
  height: SHARED_HEIGHT,
  boxSizing: 'border-box'
};