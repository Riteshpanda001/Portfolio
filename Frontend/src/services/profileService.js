import api from './api';

export const getProfile = () =>
  api.get('/profile').then((r) => r.data);

export const updateProfile = (profileData) =>
  api.put('/profile', profileData).then((r) => r.data);

export const profileService = {
  getProfile,
  updateProfile,
};

export default profileService;
