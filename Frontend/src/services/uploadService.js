import api from './api';

/**
 * Upload a file (image, avatar, resume, thumbnail) to the backend.
 * @param {File} file
 * @returns {Promise<{ url: string, filename: string, path: string }>}
 */
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export default { uploadFile };
