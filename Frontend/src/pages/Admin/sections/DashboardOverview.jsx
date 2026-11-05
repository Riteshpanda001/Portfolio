import { useState, useEffect } from 'react';
import { getAllProjects } from '../../../services/projectService';
import { getAllSkills }   from '../../../services/skillService';
import { getAllMessages } from '../../../services/contactService';
import UserProfileSection from './UserProfileSection';

// ============================================================
// DashboardOverview — Central Command Metric Panel
// ============================================================
export default function DashboardOverview({
  onSwitchSection,
  onNotify,
  onProfileUpdated,
}) {
  const [stats, setStats]   = useState({ projects: 0, skills: 0, unread: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([getAllProjects(), getAllSkills(), getAllMessages()])
      .then(([proj, skill, msg]) => {
        const projects  = proj.status  === 'fulfilled' ? (proj.value?.length  || 0) : 0;
        const skills    = skill.status === 'fulfilled' ? (skill.value?.length || 0) : 0;
        const messages  = msg.status   === 'fulfilled' ? (msg.value?.length   || 0) : 0;
        const unread    = msg.status   === 'fulfilled'
          ? msg.value.filter(m => !m.isRead && !m.read).length : 0;
        setStats({ projects, skills, messages, unread });
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label:  'Total Projects',
      value:  stats.projects,
      icon:   '💻',
      color:  '#6C63FF',
      bg:     'rgba(108,99,255,0.12)',
      border: 'rgba(108,99,255,0.3)',
      action: () => onSwitchSection?.('projects'),
    },
    {
      label:  'Total Skills',
      value:  stats.skills,
      icon:   '⚡',
      color:  '#00E5C3',
      bg:     'rgba(0,229,195,0.1)',
      border: 'rgba(0,229,195,0.3)',
      action: () => onSwitchSection?.('skills'),
    },
    {
      label:  'Total Messages',
      value:  stats.messages,
      icon:   '✉️',
      color:  '#60a5fa',
      bg:     'rgba(96,165,250,0.1)',
      border: 'rgba(96,165,250,0.3)',
      action: () => onSwitchSection?.('messages'),
    },
    {
      label:  'Unread Messages',
      value:  stats.unread,
      icon:   '🔔',
      color:  '#f59e0b',
      bg:     'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.3)',
      action: () => onSwitchSection?.('messages'),
    },
  ];

  return (
    <div className="admin-tab-pane">
      {/* Header */}
      <div className="admin-pane-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome back, Ritesh! Here's a live summary of your portfolio data.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginTop: '1.75rem',
        marginBottom: '2rem',
      }}>
        {statCards.map((card) => (
          <div
            key={card.label}
            onClick={card.action}
            title={`Go to ${card.label}`}
            style={{
              background:    card.bg,
              border:        `1px solid ${card.border}`,
              borderRadius:  '16px',
              padding:       '1.75rem 1.5rem',
              cursor:        'pointer',
              transition:    'transform 0.2s, box-shadow 0.2s',
              boxShadow:     `0 4px 20px ${card.color}18`,
              display:       'flex',
              flexDirection: 'column',
              gap:           '0.5rem',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform  = 'translateY(-3px)';
              e.currentTarget.style.boxShadow  = `0 8px 28px ${card.color}30`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform  = 'translateY(0)';
              e.currentTarget.style.boxShadow  = `0 4px 20px ${card.color}18`;
            }}
          >
            <div style={{ fontSize: '1.6rem', lineHeight: 1 }}>
              {loading ? '…' : card.icon}
            </div>
            <div style={{
              fontSize:   '2.4rem',
              fontWeight: 800,
              color:      card.color,
              lineHeight: 1,
              marginTop:  '0.25rem',
            }}>
              {loading ? '—' : card.value}
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#9BA4BA', marginTop: '0.2rem' }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile Details */}
      <UserProfileSection
        onNotify={onNotify}
        onProfileUpdated={onProfileUpdated}
      />
    </div>
  );
}
