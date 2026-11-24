import { useState, useEffect, useCallback } from 'react';
import {
  Mail,
  MailOpen,
  Trash2,
  Eye,
  RefreshCw,
  CheckCheck,
  Search,
  X,
  Calendar,
  Copy,
  Check,
  Send,
  User,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  getAllMessages,
  markMessageAsRead,
  markMessageAsUnread,
  markAllMessagesAsRead,
  deleteMessage,
} from '../../../services/contactService';
import './ContactMessages.css';

// ============================================================
// ContactMessages — Inquiries & Message Inbox Manager
// ============================================================
export default function ContactMessages({ onNotify, onMessagesUpdated }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [copiedBody, setCopiedBody] = useState(false);

  const fetchMessages = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await getAllMessages();
      const list = Array.isArray(data) ? data : (data?.content || []);
      setMessages(list);
      onMessagesUpdated?.(list);
    } catch {
      // Fallback gracefully to existing state
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [onMessagesUpdated]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    const isUnread = !msg.isRead && !msg.read;
    if (isUnread && (msg.id || msg._id)) {
      try {
        await markMessageAsRead(msg.id || msg._id);
        const updated = messages.map((m) =>
          (m.id && m.id === msg.id) || (m._id && m._id === msg._id)
            ? { ...m, isRead: true, read: true }
            : m
        );
        setMessages(updated);
        onMessagesUpdated?.(updated);
      } catch {
        // Keep active message state
      }
    }
  };

  const handleToggleRead = async (e, msg) => {
    e.stopPropagation();
    const isUnread = !msg.isRead && !msg.read;
    const id = msg.id || msg._id;
    try {
      if (isUnread) {
        await markMessageAsRead(id);
      } else {
        await markMessageAsUnread(id);
      }
      const updated = messages.map((m) =>
        (m.id && m.id === id) || (m._id && m._id === id)
          ? { ...m, isRead: !isUnread, read: !isUnread }
          : m
      );
      setMessages(updated);
      onMessagesUpdated?.(updated);
      if (selectedMessage && ((selectedMessage.id && selectedMessage.id === id) || (selectedMessage._id && selectedMessage._id === id))) {
        setSelectedMessage({ ...selectedMessage, isRead: !isUnread, read: !isUnread });
      }
      onNotify?.(isUnread ? 'Marked as read' : 'Marked as unread', 'info');
    } catch {
      onNotify?.('Error updating read status', 'error');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllMessagesAsRead(messages);
      const updated = messages.map((m) => ({ ...m, isRead: true, read: true }));
      setMessages(updated);
      onMessagesUpdated?.(updated);
      onNotify?.('All messages marked as read.', 'success');
    } catch {
      onNotify?.('Error updating messages.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm.id || deleteConfirm._id;
    try {
      await deleteMessage(id);
      const updated = messages.filter((m) => m.id !== id && m._id !== id);
      setMessages(updated);
      onMessagesUpdated?.(updated);
      onNotify?.('Message deleted successfully.', 'info');
    } catch {
      onNotify?.('Error deleting message.', 'error');
    } finally {
      setDeleteConfirm(null);
      if (selectedMessage && (selectedMessage.id === id || selectedMessage._id === id)) {
        setSelectedMessage(null);
      }
    }
  };

  const handleCopyEmail = (e, email, id) => {
    e.stopPropagation();
    if (!email) return;
    navigator.clipboard?.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyMessageBody = (text) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recent';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recent';
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead && !m.read).length;

  const filteredMessages = messages.filter((msg) => {
    const isUnread = !msg.isRead && !msg.read;
    if (filter === 'unread' && !isUnread) return false;
    if (filter === 'read' && isUnread) return false;

    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      msg.name?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q) ||
      msg.subject?.toLowerCase().includes(q) ||
      msg.message?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="contact-inbox-pane">
      {/* Inbox Header */}
      <div className="contact-inbox-header">
        <div className="contact-inbox-title-area">
          <h2>
            <Mail className="text-cyan" size={26} />
            Contact Messages & Inquiries
          </h2>
          <p>Read, respond to, and manage communications sent through your public portfolio contact form.</p>
        </div>

        <div className="contact-header-actions">
          <span className="contact-stat-pill contact-stat-pill--total">
            Total: {messages.length}
          </span>
          {unreadCount > 0 && (
            <span className="contact-stat-pill contact-stat-pill--unread">
              <Sparkles size={13} />
              {unreadCount} Unread
            </span>
          )}
          <span className="contact-stat-pill contact-stat-pill--read">
            {messages.length - unreadCount} Read
          </span>

          <button
            type="button"
            className="contact-action-btn"
            onClick={() => fetchMessages(true)}
            disabled={refreshing || loading}
            title="Refresh Inbox"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>

          {unreadCount > 0 && (
            <button
              type="button"
              className="contact-action-btn contact-action-btn--primary"
              onClick={handleMarkAllRead}
              title="Mark all as read"
            >
              <CheckCheck size={14} />
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="contact-controls-bar">
        <div className="contact-filter-tabs">
          <button
            type="button"
            className={`contact-filter-tab ${filter === 'all' ? 'contact-filter-tab--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Messages ({messages.length})
          </button>
          <button
            type="button"
            className={`contact-filter-tab ${filter === 'unread' ? 'contact-filter-tab--active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            type="button"
            className={`contact-filter-tab ${filter === 'read' ? 'contact-filter-tab--active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>

        <div className="contact-search-wrap">
          <span className="contact-search-icon">
            <Search size={15} />
          </span>
          <input
            type="text"
            placeholder="Search inquiries by name, email, subject, text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="contact-search-input"
          />
          {search && (
            <button
              type="button"
              className="contact-search-clear"
              onClick={() => setSearch('')}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Inbox Body */}
      {loading ? (
        <div className="contact-loading-state">
          <div className="contact-spinner" />
          <p>Loading inquiries inbox...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="contact-empty-state">
          <span className="contact-empty-icon">📭</span>
          <h3>No inquiries found</h3>
          <p>
            {search || filter !== 'all'
              ? 'No inquiries match your current search and filter criteria.'
              : 'Messages submitted through your portfolio contact form will appear here in real-time.'}
          </p>
          {(search || filter !== 'all') && (
            <button
              type="button"
              className="contact-action-btn"
              onClick={() => {
                setSearch('');
                setFilter('all');
              }}
              style={{ marginTop: '0.5rem' }}
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="contact-messages-list">
          {filteredMessages.map((msg) => {
            const isUnread = !msg.isRead && !msg.read;
            const msgId = msg.id || msg._id || msg.createdAt;
            const formattedDate = formatDate(msg.createdAt);
            const initials = getInitials(msg.name);

            return (
              <div
                key={msgId}
                className={`contact-msg-card ${isUnread ? 'contact-msg-card--unread' : ''}`}
                onClick={() => handleOpenMessage(msg)}
              >
                {/* Avatar */}
                <div className="contact-avatar-wrap">
                  <div className={`contact-avatar ${!isUnread ? 'contact-avatar--read' : ''}`}>
                    {initials}
                  </div>
                  {isUnread && <span className="contact-unread-dot" title="Unread inquiry" />}
                </div>

                {/* Message Content */}
                <div className="contact-msg-content">
                  <div className="contact-sender-row">
                    <span className="contact-sender-name">{msg.name || 'Anonymous User'}</span>

                    {msg.email && (
                      <span
                        className="contact-sender-email"
                        onClick={(e) => handleCopyEmail(e, msg.email, msgId)}
                        title="Click to copy email address"
                      >
                        <Mail size={12} />
                        {msg.email}
                        {copiedId === msgId ? (
                          <Check size={12} style={{ color: '#00E5C3' }} />
                        ) : (
                          <Copy size={11} style={{ opacity: 0.7 }} />
                        )}
                      </span>
                    )}

                    {isUnread && (
                      <span className="contact-badge-new">
                        <Sparkles size={10} />
                        New Inquiry
                      </span>
                    )}
                  </div>

                  <h4 className="contact-msg-subject">
                    {msg.subject || 'Portfolio Inquiry'}
                  </h4>

                  <p className="contact-msg-snippet">
                    {msg.message || 'No message content provided.'}
                  </p>

                  <div className="contact-msg-meta-row">
                    <span className="contact-msg-date">
                      <Calendar size={12} />
                      {formattedDate}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="contact-card-actions">
                  <button
                    type="button"
                    className="contact-icon-btn contact-icon-btn--reply"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                        msg.subject || 'Your inquiry on Ritesh Kumar Panda Portfolio'
                      )}`;
                    }}
                    title="Reply via Email"
                  >
                    <Send size={15} />
                  </button>

                  <button
                    type="button"
                    className="contact-icon-btn contact-icon-btn--read"
                    onClick={(e) => handleToggleRead(e, msg)}
                    title={isUnread ? 'Mark as Read' : 'Mark as Unread'}
                  >
                    {isUnread ? <Eye size={15} /> : <MailOpen size={15} />}
                  </button>

                  <button
                    type="button"
                    className="contact-icon-btn contact-icon-btn--del"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(msg);
                    }}
                    title="Delete Message"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div className="contact-modal-backdrop" onClick={() => setSelectedMessage(null)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal__header">
              <div className="contact-modal__title-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="contact-stat-pill contact-stat-pill--total">
                    Message Details
                  </span>
                  {(!selectedMessage.isRead && !selectedMessage.read) && (
                    <span className="contact-badge-new">Unread</span>
                  )}
                </div>
                <h3>{selectedMessage.subject || 'Portfolio Contact Inquiry'}</h3>
              </div>
              <button
                type="button"
                className="contact-modal__close"
                onClick={() => setSelectedMessage(null)}
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="contact-modal__body">
              {/* Meta Info Grid */}
              <div className="contact-modal__meta-grid">
                <div className="contact-meta-item">
                  <span className="contact-meta-label">Sender</span>
                  <p className="contact-meta-val">
                    <User size={14} className="text-cyan" />
                    {selectedMessage.name}
                  </p>
                </div>

                <div className="contact-meta-item">
                  <span className="contact-meta-label">Email Address</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="contact-meta-val"
                      style={{ color: '#38BDF8', textDecoration: 'underline' }}
                    >
                      {selectedMessage.email}
                    </a>
                    <button
                      type="button"
                      className="contact-icon-btn"
                      style={{ width: '26px', height: '26px' }}
                      onClick={(e) => handleCopyEmail(e, selectedMessage.email, 'modal')}
                      title="Copy Email"
                    >
                      {copiedId === 'modal' ? <Check size={12} color="#00E5C3" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                <div className="contact-meta-item">
                  <span className="contact-meta-label">Received At</span>
                  <p className="contact-meta-val">
                    <Calendar size={14} className="text-muted" />
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>

                {selectedMessage.ipAddress && (
                  <div className="contact-meta-item">
                    <span className="contact-meta-label">Sender IP</span>
                    <p className="contact-meta-val">
                      <ShieldCheck size={14} className="text-cyan" />
                      <code>{selectedMessage.ipAddress}</code>
                    </p>
                  </div>
                )}
              </div>

              {/* Message Full Body */}
              <div className="contact-modal__message-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="contact-meta-label">Message Content</span>
                  <button
                    type="button"
                    className="contact-action-btn"
                    style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem' }}
                    onClick={() => handleCopyMessageBody(selectedMessage.message)}
                  >
                    {copiedBody ? <Check size={12} color="#00E5C3" /> : <Copy size={12} />}
                    {copiedBody ? 'Copied' : 'Copy Text'}
                  </button>
                </div>
                <div className="contact-message-body">
                  {selectedMessage.message || 'No message content.'}
                </div>
              </div>
            </div>

            <div className="contact-modal__footer">
              <button
                type="button"
                className="contact-action-btn"
                style={{ color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                onClick={() => setDeleteConfirm(selectedMessage)}
              >
                <Trash2 size={14} />
                Delete
              </button>

              <div className="contact-modal__footer-right">
                <button
                  type="button"
                  className="contact-action-btn"
                  onClick={(e) => handleToggleRead(e, selectedMessage)}
                >
                  {(!selectedMessage.isRead && !selectedMessage.read) ? (
                    <>
                      <Eye size={14} /> Mark as Read
                    </>
                  ) : (
                    <>
                      <MailOpen size={14} /> Mark as Unread
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject || 'Your inquiry on Ritesh Kumar Panda Portfolio'
                  )}`}
                  className="contact-action-btn contact-action-btn--primary"
                  style={{ textDecoration: 'none' }}
                >
                  <Send size={14} />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="contact-modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="contact-modal contact-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal__header">
              <h3 style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Trash2 size={18} />
                Delete Message?
              </h3>
              <button
                type="button"
                className="contact-modal__close"
                onClick={() => setDeleteConfirm(null)}
              >
                <X size={15} />
              </button>
            </div>
            <div className="contact-modal__body">
              <p style={{ color: '#E2E8F0', margin: 0, lineHeight: 1.5 }}>
                Are you sure you want to permanently delete the inquiry from{' '}
                <strong style={{ color: '#FFFFFF' }}>{deleteConfirm.name || 'Anonymous'}</strong>{' '}
                (<span style={{ color: '#38BDF8' }}>{deleteConfirm.email}</span>)?
              </p>
              <p style={{ color: '#EF4444', fontSize: '0.82rem', margin: '0.5rem 0 0 0', fontWeight: 600 }}>
                ⚠️ This action cannot be undone.
              </p>
            </div>
            <div className="contact-modal__footer">
              <button
                type="button"
                className="contact-action-btn"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="contact-action-btn"
                style={{ background: '#EF4444', borderColor: '#DC2626', color: '#FFFFFF' }}
                onClick={handleDelete}
              >
                <Trash2 size={14} />
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
