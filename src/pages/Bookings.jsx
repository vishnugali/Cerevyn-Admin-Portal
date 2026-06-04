import React, { useState } from 'react';
import { Search, Bell, User, MapPin, Calendar, Users, SlidersHorizontal, RefreshCw, X } from 'lucide-react';

export default function Bookings() {
  // Initial database state containing your Cerevyn candidate data
  const initialBookings = [
    {
      id: 1,
      hostName: 'sravya Tammana',
      hostSub: 'CEREVYN INTERN',
      agenda: 'Full Stack Development Review',
      venue: 'Main Conference Room',
      date: '2026-05-25', // Formatted as YYYY-MM-DD for accurate date filtering
      displayDate: 'May 25, 2026',
      time: '1:15 PM - 3:00 PM',
      capacity: '4 Pax',
      letter: 'S',
      bgColor: '#0246cc',
      status: 'Active'
    },
    {
      id: 2,
      hostName: 'vishnu',
      hostSub: 'CEREVYN INTERN',
      agenda: 'AI & Machine Learning Sync',
      venue: 'Main Conference Room',
      date: '2026-05-23',
      displayDate: 'May 23, 2026',
      time: '2:30 AM - 3:30 AM',
      capacity: '5 Pax',
      letter: 'V',
      bgColor: '#14532d',
      status: 'Active'
    },
    {
      id: 3,
      hostName: 'sai',
      hostSub: 'CEREVYN INTERN',
      agenda: 'Agentic AI Workflows Demo',
      venue: 'Main Conference Room',
      date: '2026-05-20',
      displayDate: 'May 20, 2026',
      time: '11:30 AM - 1:00 PM',
      capacity: '10 Pax',
      letter: 'S',
      bgColor: '#0f766e',
      status: 'Active'
    }
  ];

  // React State Management
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [modalData, setModalData] = useState(null);

  // 1. All Status Filtering Switcher Logic
  const toggleStatus = (status) => {
    setSelectedStatus(status);
    setShowStatusDropdown(false);
  };

  // 2. Clear Filters / Refresh Button Logic
  const handleRefresh = () => {
    setSelectedDate('');
    setSelectedStatus('All Status');
    setBookings(initialBookings);
  };

  // 3. Cancel Row State Deletion Handler
  const handleCancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  // 4. Reactive Filter Pipeline Processing
  const filteredBookings = bookings.filter(booking => {
    const matchesDate = selectedDate ? booking.date === selectedDate : true;
    const matchesStatus = selectedStatus === 'All Status' ? true : booking.status === selectedStatus;
    return matchesDate && matchesStatus;
  });

  return (
    <div style={{ backgroundColor: 'var(--clr-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* ================= MAIN MONITOR OPERATIONS BODY ================= */}
      <div style={{ padding: '36px 40px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--clr-button)', backgroundColor: 'rgba(0,36,222,0.12)', padding: '2px 6px', borderRadius: '4px' }}>CEREVYN OPS</span>
              <span style={{ fontSize: '11px', color: 'var(--clr-text-muted)', fontWeight: '600' }}>{filteredBookings.length} TOTAL SCHEDULES</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--clr-text-muted)', marginTop: '6px', margin: 0 }}>Coordinate and monitor conference room utilization across departments.</p>
          </div>

          {/* ================= OPERATIONAL INTERACTIVE FILTERS ================= */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
            
            {/* Working Date Input Controller */}
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '12px', border: '1px solid var(--clr-border)', fontSize: '12px', color: 'var(--clr-text)', backgroundColor: 'rgba(255,255,255,0.06)', outline: 'none' }}
            />

            {/* Working Status Context Dropdown Trigger */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowStatusDropdown(!showStatusDropdown)} style={filterButtonStyle}>
                <SlidersHorizontal size={13} /> {selectedStatus}
              </button>
              
              {showStatusDropdown && (
                <div style={{ position: 'absolute', right: 0, top: '34px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid var(--clr-border)', borderRadius: '10px', boxShadow: '0 14px 30px rgba(0,0,0,0.25)', zIndex: 10, width: '120px' }}>
                  <div onClick={() => toggleStatus('All Status')} style={dropdownItemStyle}>All Status</div>
                  <div onClick={() => toggleStatus('Active')} style={dropdownItemStyle}>Active</div>
                </div>
              )}
            </div>

            {/* Working Reset/Refresh Tool */}
            <button onClick={handleRefresh} title="Reset Filters" style={{ ...filterButtonStyle, padding: '7px' }}>
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        {/* ================= SCHEDULER MATRIX DATA DISPLAY ================= */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 3fr 2fr 1.5fr 1.5fr', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={tableColumnLabelStyle}>HOST REFERENCE</span>
            <span style={tableColumnLabelStyle}>AGENDA & VENUE</span>
            <span style={tableColumnLabelStyle}>SCHEDULE</span>
            <span style={tableColumnLabelStyle}>CAPACITY</span>
            <span style={{ ...tableColumnLabelStyle, textAlign: 'right', paddingRight: '12px' }}>ACTIONS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredBookings.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--clr-text-muted)', fontSize: '13px', fontWeight: '500' }}>
                No active bookings match your filters. Click refresh to reset.
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} style={{ display: 'grid', gridTemplateColumns: '2.5fr 3fr 2fr 1.5fr 1.5fr', padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', alignItems: 'center' }}>
                  
                  {/* Host Block */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: booking.bgColor, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>
                      {booking.letter}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--clr-text)' }}>{booking.hostName}</div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--clr-text-muted)', marginTop: '2px' }}>{booking.hostSub}</div>
                    </div>
                  </div>

                  {/* Agenda & Venue */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--clr-text)' }}>{booking.agenda}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--clr-text-muted)' }}>
                      <MapPin size={11} style={{ color: 'var(--clr-text-muted)' }} /> {booking.venue}
                    </div>
                  </div>

                  {/* Date Calendar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: 'var(--clr-text)' }}>
                      <Calendar size={12} color="#16a34a" /> {booking.displayDate}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', paddingLeft: '18px' }}>{booking.time}</div>
                  </div>

                  {/* Occupancy metrics */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--clr-text-muted)', fontWeight: '500' }}>
                    <Users size={13} style={{ color: 'var(--clr-text-muted)' }} /> {booking.capacity}
                  </div>

                  {/* Operational Controls Action Buttons */}
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', paddingRight: '12px' }}>
                    <button onClick={() => setModalData(booking)} style={actionRowBtnStyle}>DETAILS</button>
                    <button onClick={() => handleCancelBooking(booking.id)} style={{ ...actionRowBtnStyle, color: '#ef4444' }}>CANCEL</button>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ================= WORKING DETAILS MODAL DRAWER ================= */}
      {modalData && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '18px', padding: '24px', width: '400px', boxShadow: '0 24px 60px rgba(0,0,0,0.24)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--clr-text)' }}>Schedule Verification</h3>
              <X size={18} style={{ cursor: 'pointer', color: 'var(--clr-text-muted)' }} onClick={() => setModalData(null)} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: 'var(--clr-text-muted)' }}>
              <div><strong>Host:</strong> {modalData.hostName} ({modalData.hostSub})</div>
              <div><strong>Operational Agenda:</strong> {modalData.agenda}</div>
              <div><strong>Target Location:</strong> {modalData.venue}</div>
              <div><strong>Calendar Matrix:</strong> {modalData.displayDate}</div>
              <div><strong>Allocated Window:</strong> {modalData.time}</div>
              <div><strong>Metrics Cap:</strong> {modalData.capacity}</div>
            </div>

            <button onClick={() => setModalData(null)} style={{ marginTop: '24px', width: '100%', padding: '10px', backgroundColor: 'var(--clr-button)', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              Close Workspace Overview
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline Blueprint Style Variables
const searchInputStyle = { width: '100%', padding: '7px 12px 7px 38px', borderRadius: '20px', border: '1px solid var(--clr-border)', fontSize: '13px', outline: 'none', backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--clr-text)' };
const tableColumnLabelStyle = { fontSize: '10px', fontWeight: '700', color: 'var(--clr-text-muted)', letterSpacing: '0.05em' };
const filterButtonStyle = { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid var(--clr-border)', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', color: 'var(--clr-text)', fontWeight: '500', cursor: 'pointer' };
const actionRowBtnStyle = { background: 'none', border: 'none', fontSize: '10px', fontWeight: '700', color: 'var(--clr-text-muted)', cursor: 'pointer', letterSpacing: '0.02em', padding: 0 };
const dropdownItemStyle = { padding: '8px 12px', fontSize: '12px', color: 'var(--clr-text)', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.06)', transition: 'background-color 0.2s' };