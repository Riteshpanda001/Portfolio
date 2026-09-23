// ============================================================
// Validators
// ============================================================

/**
 * Validate a contact/message form object.
 * @param {{ name: string, email: string, message: string }} fields
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateContactForm({ name = '', email = '', message = '' }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Name is required.';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message.trim()) {
    errors.message = 'Message is required.';
  } else if (message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

/**
 * Validate admin login form.
 * @param {{ email: string, password: string }} fields
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateLoginForm({ email = '', password = '' }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

/**
 * Validate newsletter email.
 * @param {string} email
 * @returns {{ isValid: boolean, error: string }}
 */
export function validateEmail(email) {
  if (!email.trim()) return { isValid: false, error: 'Email is required.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return { isValid: false, error: 'Please enter a valid email address.' };
  return { isValid: true, error: '' };
}
