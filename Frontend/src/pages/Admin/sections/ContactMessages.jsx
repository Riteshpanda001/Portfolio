import { useState, useEffect } from 'react';
import {
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
} from '../../../services/contactService';

// ============================================================
// ContactMessages — Inquiries & Message Inbox Manager
// ============================================================
export default function ContactMessages({ onNotify, onMessagesUpdated }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getAllMessages();
      if (Array.isArray(data)) {
        setMessages(data);
        onMessagesUpdated?.(data);
      }
    } catch {
      // Keep local state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    const isUnread = !msg.isRead && !msg.read;
    if (isUnread && (msg.id || msg._id)) {
      try {
        await markMessageAsRead(msg.id || msg._id);
        const updated = messages.map((m) =>
          m.id === msg.id || m._id === msg._id
            ? { ...m, isRead: true, read: true }
            : m
        );
        setMessages(updated);
        onMessagesUpdated?.(updated);
      } catch {
        // ignore
      }
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

  const filteredMessages = messages.filter((msg) => {
    const isUnread = !msg.isRead && !msg.read;
    if (filter === 'unread' && !isUnread) return false;
    if (filter === 'read' && isUnread) return false;

    if (!search) return true;
    const q = search.toLowerCase();
    return (
      msg.name?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q) ||
      msg.subject?.toLowerCase().includes(q) ||
      msg.message?.toLowerCase().includes(q)
    );
  });

  const unreadCount = messages.filter((m) => !m.isRead && !m.read).length;

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2>📨 Contact Messages & Inquiries</h2>
          <p>Read, respond to, and manage communications sent through the public contact form.</p>
        </div>
        <div className="admin-msg-counts">
          <span className="admin-pill admin-pill--blue">Total: {messages.length}</span>
          {unreadCount > 0 && (
            <span className="admin-pill admin-pill--purple">{unreadCount} Unread</span>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-cat-pills">
          <button
            type="button"
            className={`admin-cat-pill ${filter === 'all' ? 'admin-cat-pill--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Messages ({messages.length})
          </button>
          <button
            type="button"
            className={`admin-cat-pill ${filter === 'unread' ? 'admin-cat-pill--active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            type="button"
            className={`admin-cat-pill ${filter === 'read' ? 'admin-cat-pill--active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>

        <div className="admin-search-wrap">
          <span className="admin-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search inquiries by name, email, topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search-input"
          />
          {search && (
            <button
              type="button"
              className="admin-search-clear"
              onClick={() => setSearch('')}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="admin-loading-state">
          <div className="admin-spinner" />
          <p>Loading contact inbox...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="admin-empty-state">
          <span className="admin-empty-icon">📭</span>
          <h3>No inquiries found</h3>
          <p>
            {search || filter !== 'all'
              ? 'No messages matched your filter criteria.'
              : 'Messages submitted through your portfolio contact form will appear here.'}
          </p>
        </div>
      ) : (
        <div className="admin-messages-list">
          {filteredMessages.map((msg) => {
            const isUnread = !msg.isRead && !msg.read;
            const dateStr = msg.createdAt
              ? new Date(msg.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Recent';

            return (
              <div
                key={msg.id || msg._id || msg.createdAt}
                className={`admin-msg-row ${isUnread ? 'admin-msg-row--unread' : ''}`}
                onClick={() => handleOpenMessage(msg)}
              >
                <div className="admin-msg-row__left">
                  <span className={`admin-msg-indicator ${isUnread ? 'admin-msg-indicator--new' : ''}`} />
                  <div className="admin-msg-sender-box">
                    <strong className="admin-msg-sender">{msg.name}</strong>
                    <span className="admin-msg-email">{msg.email}</span>
                  </div>
                </div>

                <div className="admin-msg-row__mid">
                  <strong className="admin-msg-subject">
                    {msg.subject || 'Portfolio Inquiry'}
                  </strong>
                  <p className="admin-msg-snippet">
                    {msg.message ? msg.message.slice(0, 110) + '…' : ''}
                  </p>
                </div>

                <div className="admin-msg-row__right">
                  <span className="admin-msg-date">{dateStr}</span>
                  <button
                    type="button"
                    className="admin-icon-btn admin-icon-btn--del"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(msg);
                    }}
                    title="Delete Message"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedMessage(null)}>
          <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <div className="admin-modal__title-row">
                <span className="admin-pill admin-pill--blue">Message Details</span>
                <h3>{selectedMessage.subject || 'Portfolio Contact Inquiry'}</h3>
              </div>
              <button
                type="button"
                className="admin-modal__close"
                onClick={() => setSelectedMessage(null)}
              >
                ×
              </button>
            </div>

            <div className="admin-modal__body">
              <div className="admin-msg-meta-grid">
                <div>
                  <span className="text-muted text-xs">Sender</span>
                  <p><strong>{selectedMessage.name}</strong></p>
                </div>
                <div>
                  <span className="text-muted text-xs">Email</span>
                  <p>
                    <a href={`mailto:${selectedMessage.email}`} className="text-cyan">
                      {selectedMessage.email}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-muted text-xs">Received</span>
                  <p>
                    {selectedMessage.createdAt
                      ? new Date(selectedMessage.createdAt).toLocaleString()
                      : 'Recently'}
                  </p>
                </div>
                {selectedMessage.ipAddress && (
                  <div>
                    <span className="text-muted text-xs">IP Address</span>
                    <p><code>{selectedMessage.ipAddress}</code></p>
                  </div>
                )}
              </div>

              <div className="admin-msg-full-body">
                <span className="text-muted text-xs">Message Body</span>
                <div className="admin-msg-text-box">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="admin-modal__footer">
              <button
                type="button"
                className="admin-btn admin-btn--ghost text-red"
                onClick={() => {
                  setDeleteConfirm(selectedMessage);
                }}
              >
                🗑️ Delete
              </button>

              <div className="admin-modal__footer-right">
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject || 'Your inquiry on Ritesh Kumar Panda Portfolio'
                  )}`}
                  className="admin-btn admin-btn--primary"
                >
                  ✉️ Reply via Mail
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="admin-modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal admin-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>Delete Message?</h3>
              <button
                type="button"
                className="admin-modal__close"
                onClick={() => setDeleteConfirm(null)}
              >
                ×
              </button>
            </div>
            <div className="admin-modal__body">
              <p>
                Are you sure you want to delete message from{' '}
                <strong>{deleteConfirm.name}</strong> ({deleteConfirm.email})?
              </p>
              <p className="admin-modal__warning">This action cannot be undone.</p>
            </div>
            <div className="admin-modal__footer">
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                onClick={handleDelete}
              >
                Delete Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
