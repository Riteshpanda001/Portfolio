import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SITE_EMAIL } from '../../../utils/constants';
import './GmailModal.css';

export default function GmailModal() {
  const { gmailModalOpen, closeGmailModal, addToast } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && gmailModalOpen) {
        closeGmailModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gmailModalOpen, closeGmailModal]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (gmailModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [gmailModalOpen]);

  if (!gmailModalOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_EMAIL);
      setCopied(true);
      if (addToast) addToast('Email copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback copy
      const textArea = document.createElement('textarea');
      textArea.value = SITE_EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      if (addToast) addToast('Email copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenGmailWeb = (e) => {
    e.preventDefault();
    let url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE_EMAIL)}`;
    if (subject.trim()) {
      url += `&su=${encodeURIComponent(subject.trim())}`;
    }
    if (message.trim()) {
      url += `&body=${encodeURIComponent(message.trim())}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenMailto = () => {
    let mailtoUrl = `mailto:${SITE_EMAIL}`;
    const params = [];
    if (subject.trim()) params.push(`subject=${encodeURIComponent(subject.trim())}`);
    if (message.trim()) params.push(`body=${encodeURIComponent(message.trim())}`);
    if (params.length > 0) mailtoUrl += `?${params.join('&')}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div
      className="gmail-modal-backdrop"
      onClick={closeGmailModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gmail-modal-title"
    >
      <div
        className="gmail-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="gmail-modal-header">
          <div className="gmail-modal-title-wrap">
            <div className="gmail-icon-badge" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1.5 6.5L12 14.5L22.5 6.5M1.5 6.5C1.5 5.39543 2.39543 4.5 3.5 4.5H20.5C21.6046 4.5 22.5 5.39543 22.5 6.5M1.5 6.5V17.5C1.5 18.6046 2.39543 19.5 3.5 19.5H20.5C21.6046 19.5 22.5 18.6046 22.5 17.5V6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 id="gmail-modal-title" className="gmail-modal-title">
                Send an Email
              </h3>
              <p className="gmail-modal-subtitle">Direct contact via Gmail</p>
            </div>
          </div>
          <button
            type="button"
            className="gmail-modal-close"
            onClick={closeGmailModal}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Email display box with copy */}
        <div className="gmail-address-card">
          <div className="gmail-address-info">
            <span className="gmail-address-label">Gmail Address</span>
            <span className="gmail-address-value">{SITE_EMAIL}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`gmail-copy-btn ${copied ? 'gmail-copy-btn--copied' : ''}`}
            title="Copy email address"
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>

        {/* Quick Compose Form */}
        <form onSubmit={handleOpenGmailWeb} className="gmail-compose-form">
          <div className="gmail-form-group">
            <label htmlFor="gmail-subject" className="gmail-form-label">
              Subject <span className="gmail-optional">(Optional)</span>
            </label>
            <input
              id="gmail-subject"
              type="text"
              className="gmail-input"
              placeholder="e.g. Project Inquiry / Hello!"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="gmail-form-group">
            <label htmlFor="gmail-message" className="gmail-form-label">
              Message <span className="gmail-optional">(Optional)</span>
            </label>
            <textarea
              id="gmail-message"
              rows="3"
              className="gmail-textarea"
              placeholder="Write a brief message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="gmail-actions">
            <button
              type="submit"
              className="gmail-btn gmail-btn--primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08C21.691 2.279 24 3.434 24 5.457z" />
              </svg>
              Open in Gmail Web
            </button>
            <button
              type="button"
              onClick={handleOpenMailto}
              className="gmail-btn gmail-btn--secondary"
            >
              Default Mail App
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
