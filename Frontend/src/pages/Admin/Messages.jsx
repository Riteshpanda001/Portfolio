import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMessages, markMessageRead, deleteMessage } from '../../services/contactService';
import './Admin.css';

// ============================================================
// Admin — Messages Inbox
// ============================================================

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterUnread, setFilterUnread] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [search, setSearch] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getAllMessages({ unreadOnly: filterUnread || undefined });
      if (data && (Array.isArray(data.content) || Array.isArray(data))) {
        const list = Array.isArray(data.content) ? data.content : data;
        setMessages(list);
      } else {
        setMessages([]);
      }
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filterUnread]);

  const handleMarkAsRead = async (msg) => {
    const id = msg.id || msg._id;
    try {
      await markMessageRead(id).catch(() => {});
      setMessages((prev) =>
        prev.map((m) => ((m.id || m._id) === id ? { ...m, isRead: true } : m))
      );
      if (selectedMessage && (selectedMessage.id || selectedMessage._id) === id) {
        setSelectedMessage((prev) => ({ ...prev, isRead: true }));
      }
    } catch {
      // Local toggle
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await deleteMessage(id).catch(() => {});
      setMessages((prev) => prev.filter((m) => (m.id || m._id) !== id));
      if (selectedMessage && (selectedMessage.id || selectedMessage._id) === id) {
        setSelectedMessage(null);
      }
    } catch {
      // Local delete
      setMessages((prev) => prev.filter((m) => (m.id || m._id) !== id));
    }
  };

  const openMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      handleMarkAsRead(msg);
    }
  };

  const filtered = messages.filter((m) => {
    const query = search.toLowerCase();
    const matchSearch =
      m.name?.toLowerCase().includes(query) ||
      m.email?.toLowerCase().includes(query) ||
      m.subject?.toLowerCase().includes(query) ||
      m.message?.toLowerCase().includes(query);

    if (filterUnread) {
      return matchSearch && !m.isRead;
    }
    return matchSearch;
  });

  return (
    <div className="admin-page section">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-header__title">Messages Inbox</h1>
            <p>View and manage client inquiries and recruitment messages.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link to="/admin" className="btn btn--ghost btn--sm">
              ← Dashboard
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div
          className="card"
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sender, email, subject, or keywords..."
            style={{
              flex: 1,
              minWidth: '220px',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
            }}
          />

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setFilterUnread(false)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '6px',
                border: !filterUnread ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.1)',
                background: !filterUnread ? 'rgba(99,102,241,0.2)' : 'transparent',
                color: !filterUnread ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilterUnread(true)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '6px',
                border: filterUnread ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.1)',
                background: filterUnread ? 'rgba(99,102,241,0.2)' : 'transparent',
                color: filterUnread ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              Unread ({messages.filter((m) => !m.isRead).length})
            </button>
          </div>
        </div>

        {/* Messages List & Preview Split */}
        <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
          {/* List Column */}
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filtered.map((msg) => {
                const id = msg.id || msg._id;
                const isSelected = selectedMessage && (selectedMessage.id || selectedMessage._id) === id;
                return (
                  <div
                    key={id}
                    onClick={() => openMessage(msg)}
                    style={{
                      padding: '1.25rem 1.5rem',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      background: isSelected
                        ? 'rgba(99,102,241,0.12)'
                        : msg.isRead
                        ? 'transparent'
                        : 'rgba(99,102,241,0.05)',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {!msg.isRead && (
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: '#818cf8',
                              display: 'inline-block',
                            }}
                          />
                        )}
                        <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{msg.name}</strong>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#818cf8', marginBottom: '0.3rem' }}>
                      {msg.subject || 'No Subject'}
                    </div>

                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: '#94a3b8',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.4,
                      }}
                    >
                      {msg.message}
                    </p>
                  </div>
                );
              })}

              {loading ? (
                <div style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
                  <div className="spinner" style={{ margin: '0 auto 1rem', width: '28px', height: '28px', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#818cf8', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  <p style={{ fontSize: '0.9rem' }}>Loading messages…</p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: '#94a3b8' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📬</div>
                  <h3 style={{ fontSize: '1.05rem', color: '#e2e8f0', marginBottom: '0.4rem' }}>No messages in inbox</h3>
                  <p style={{ fontSize: '0.85rem', maxWidth: '320px', margin: '0 auto' }}>
                    When visitors submit the contact form on your portfolio, their messages will appear here.
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Message Preview Column */}
          {selectedMessage && (
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.25rem' }}>
                    {selectedMessage.subject || 'No Subject'}
                  </h2>
                  <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                    From: <strong style={{ color: '#ffffff' }}>{selectedMessage.name}</strong> &lt;{selectedMessage.email}&gt;
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
                <p style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {selectedMessage.message}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Portfolio Inquiry')}`}
                  className="btn btn--primary btn--sm"
                >
                  ✉️ Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selectedMessage.id || selectedMessage._id)}
                  className="btn btn--ghost btn--sm"
                  style={{ color: '#f87171' }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
