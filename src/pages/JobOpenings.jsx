import React, { useState, useEffect } from 'react';
import { Plus, X, MapPin, Search, Bell, User, ArrowLeft, ChevronDown } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Supabase Connection Configuration
const supabaseUrl = 'https://cpvhzdxxpgftjkjqadec.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdmh6ZHh4cGdmdGpranFhZGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDY4NjEsImV4cCI6MjA5NTg4Mjg2MX0._nBO3Dlv09pHh8LjcLfMH7sovDvQJDz9qKAN_rlrP4I';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function JobOpenings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Form input states matching your exact portal UI fields
  const [formTitle, setFormTitle] = useState('');
  const [formDept, setFormDept] = useState('Research & Development');
  const [formCustomDept, setFormCustomDept] = useState(''); 
  const [formLocation, setFormLocation] = useState('');
  const [formExperience, setFormExperience] = useState('');
  const [formType, setFormType] = useState('Full-time');
  const [formSalary, setFormSalary] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formTags, setFormTags] = useState(''); 

  // Main data state loaded dynamically from Supabase
  const [jobs, setJobs] = useState([]);

  // Fetch data from Supabase on load
  const fetchJobsFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      if (data) setJobs(data);
    } catch (error) {
      console.error('Error fetching data from database:', error.message);
    }
  };

  useEffect(() => {
    fetchJobsFromSupabase();
  }, []);

  const openCreateModal = () => {
    setEditingJob(null);
    setFormTitle('');
    setFormDept('Research & Development');
    setFormCustomDept('');
    setFormLocation('');
    setFormExperience('');
    setFormType('Full-time');
    setFormSalary('');
    setFormDescription('');
    setFormTags('');
    setIsModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setFormTitle(job.title);
    
    const displayDept = job.dept ? job.dept.charAt(0).toUpperCase() + job.dept.slice(1).toLowerCase() : '';
    const standardDepts = ['Research & Development', 'Technical Services', 'Manufacturing', 'Marketing', 'Sales', 'HR & Admin'];
    const searchMatch = standardDepts.find(d => d.toLowerCase() === (job.dept || '').toLowerCase());

    if (searchMatch) {
      setFormDept(searchMatch);
      setFormCustomDept('');
    } else {
      setFormDept('Other');
      setFormCustomDept(job.dept || '');
    }

    setFormLocation(job.location || '');
    setFormExperience(job.experience || '');
    setFormType(job.type || 'Full-time');
    setFormSalary(job.salary || '');
    setFormDescription(job.description || '');
    setFormTags(job.tags ? job.tags.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle || !formLocation) return alert('Please fill out essential fields.');

    setLoading(true);
    const finalDept = formDept === 'Other' ? formCustomDept : formDept;
    const tagArray = formTags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");

    // Core payload fields matching database exactly
    const dbPayload = {
      title: formTitle,
      dept: finalDept.toUpperCase(),
      type: formType,
      location: formLocation,
      experience: formExperience,
      salary: formSalary,
      description: formDescription,
      tags: tagArray,
      letter: formTitle.charAt(0).toUpperCase(),
      is_time: formType === 'Full-time' // 👈 Maps to the career.html filtering logic perfectly!
    };

    try {
      if (editingJob) {
        // Edit Mode: Update database row matching ID
        const { error } = await supabase
          .from('job_openings')
          .update(dbPayload)
          .eq('id', editingJob.id);

        if (error) throw error;
        alert('Job posting updated successfully!');
      } else {
        // Create Mode: Attach randomized style metadata using correct snake_case keys
        const colors = [
          { bg: '#eff6ff', text: '#1d4ed8' },
          { bg: '#fdf2f8', text: '#be185d' },
          { bg: '#f0fdf4', text: '#15803d' }
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const newRecordPayload = {
          ...dbPayload,
          color: randomColor.bg,
          text_color: randomColor.text 
        };

        const { error } = await supabase
          .from('job_openings')
          .insert([newRecordPayload]);

        if (error) throw error;
        alert('New job vacancy published live to the website!');
      }

      await fetchJobsFromSupabase();
      setIsModalOpen(false);
    } catch (error) {
      alert('Supabase Transaction Failure: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this job posting permanently from the live website?')) {
      try {
        const { error } = await supabase
          .from('job_openings')
          .delete()
          .eq('id', id);

        if (error) throw error;
        await fetchJobsFromSupabase();
      } catch (error) {
        alert('Database removal error: ' + error.message);
      }
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--clr-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* ================= MAIN INTERFACE CONTROLS ================= */}
      {!isModalOpen ? (
        <div style={{ padding: '32px', flexGrow: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--clr-text)', margin: 0 }}>Recruiter Portal</h2>
              <p style={{ fontSize: '13px', color: 'var(--clr-text-muted)', marginTop: '4px' }}>Manage biological, technical, and corporate vacancies.</p>
            </div>
            <button onClick={openCreateModal} style={createButtonStyle}>
              <Plus size={16} /> CREATE POSTING
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {jobs.map((job) => (
              <div key={job.id} style={rowStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ ...avatarStyle, backgroundColor: job.color || '#eff6ff', color: job.text_color || job.textColor || '#1d4ed8' }}>
                    {job.letter || job.title?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--clr-text)', margin: 0 }}>{job.title}</h4>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: 'var(--clr-text-muted)', margin: 0 }}>● {job.dept}</p>
                      <span style={{ fontSize: '11px', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={11} /> {job.location} ({job.type})
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '24px' }}>
                  <button onClick={() => openEditModal(job)} style={actionButtonStyle}>EDIT CARD</button>
                  <button onClick={() => handleDelete(job.id)} style={{ ...actionButtonStyle, color: '#ef4444' }}>DELETE</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        
        /* ================= JOB POSTING PANEL ================= */
        <div style={panelWrapperStyle}>
          <div style={innerPanelContainerStyle}>
            
            <button type="button" onClick={() => setIsModalOpen(false)} style={backToLinkStyle}>
              <ArrowLeft size={14} /> BACK TO LIST
            </button>

            <div style={{ marginTop: '24px', marginBottom: '8px' }}>
              <h2 style={panelTitleStyle}>
                {editingJob ? 'Update' : 'Create'} <span style={{ color: '#0024DE' }}>Job Opening</span>
              </h2>
              <p style={panelSubtitleStyle}>MANAGEMENT PORTAL</p>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '28px' }}>
              
              <div style={formGridRowStyle}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>JOB TITLE</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Research Scientist" 
                    style={inputStyle}
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>DEPARTMENT</label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      style={selectFieldStyle}
                      value={formDept}
                      onChange={(e) => setFormDept(e.target.value)}
                    >
                      <option value="Research & Development">Research & Development</option>
                      <option value="Technical Services">Technical Services</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR & Admin">HR & Admin</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown size={16} style={selectIconStyle} />
                  </div>
                </div>
              </div>

              {formDept === 'Other' && (
                <div style={formGroupStyle}>
                  <input 
                    type="text"
                    required
                    placeholder="Type custom department name..."
                    style={inputStyle}
                    value={formCustomDept}
                    onChange={(e) => setFormCustomDept(e.target.value)}
                  />
                </div>
              )}

              <div style={formGridRowStyle}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>LOCATION</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Bangalore, India" 
                    style={inputStyle}
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                  />
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>EXPERIENCE</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 3+ years" 
                    style={inputStyle}
                    value={formExperience}
                    onChange={(e) => setFormExperience(e.target.value)}
                  />
                </div>
              </div>

              <div style={formGridRowStyle}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>JOB TYPE</label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      style={selectFieldStyle}
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                    <ChevronDown size={16} style={selectIconStyle} />
                  </div>
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>SALARY (₹ PREFIX ADDED AUTO)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 12-18 LPA" 
                    style={inputStyle}
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                  />
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>DESCRIPTION</label>
                <textarea 
                  placeholder="Role and responsibilities..." 
                  style={textareaStyle}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>KEY SKILLS</label>
                <input 
                  type="text" 
                  placeholder="Skill 1, Skill 2, Skill 3" 
                  style={inputStyle}
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                />
              </div>

              <button type="submit" disabled={loading} style={submitButtonStyle}>
                {loading ? 'SYNCING TO CLOUD...' : (editingJob ? 'SAVE UPDATED OPENING' : 'PUBLISH OPENING')}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Styling Objects
const createButtonStyle = { backgroundColor: '#0024DE', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ffffff' };
const rowStyle = { backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '18px 24px', display: 'flex', alignItems: 'center', justifycontent: 'space-between' };
const avatarStyle = { width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifycontent: 'center', fontWeight: '700', fontSize: '16px' };
const actionButtonStyle = { background: 'none', border: 'none', fontSize: '11px', fontWeight: '700', color: 'var(--clr-text-muted)', cursor: 'pointer', letterSpacing: '0.05em' };

const panelWrapperStyle = { backgroundColor: '#01005D', minHeight: '100vh', padding: '40px 20px', display: 'flex', justifycontent: 'center', alignItems: 'flex-start', overflowY: 'auto' };
const innerPanelContainerStyle = { backgroundColor: '#ffffff', borderRadius: '24px', width: '100%', maxWidth: '740px', padding: '40px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)' };
const backToLinkStyle = { background: 'none', border: 'none', color: '#8b949e', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: 0, letterSpacing: '0.03em' };
const panelTitleStyle = { fontSize: '28px', fontWeight: '700', color: '#1a1f36', margin: 0 };
const panelSubtitleStyle = { fontSize: '11px', fontWeight: '700', color: '#a3acb9', letterSpacing: '0.08em', margin: '6px 0 0 0' };
const formGridRowStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' };
const formGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: '700', color: '#8792a2', letterSpacing: '0.05em' };
const inputStyle = { width: '100%', boxSizing: 'border-box', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e3e8ee', backgroundColor: '#f8fafc', fontSize: '14px', color: '#333333', outline: 'none' };
const selectFieldStyle = { ...inputStyle, appearance: 'none', cursor: 'pointer', paddingRight: '40px' };
const selectIconStyle = { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#718096', pointerEvents: 'none' };
const textareaStyle = { ...inputStyle, minHeight: '110px', resize: 'vertical', fontFamily: 'inherit' };
const submitButtonStyle = { backgroundColor: '#0024DE', color: '#ffffff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', letterSpacing: '0.04em', marginTop: '12px', boxShadow: '0px 4px 12px rgba(0, 36, 222, 0.2)' };
