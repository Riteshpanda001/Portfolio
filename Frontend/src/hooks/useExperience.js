import { useState, useEffect, useCallback } from 'react';
import { experienceService } from '../services/experienceService';

export const useExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await experienceService.getAll();
      setExperiences(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    experienceService.getAll()
      .then((data) => {
        if (isSubscribed) {
          setExperiences(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setError(err.message || 'Failed to fetch experiences');
          setLoading(false);
        }
      });
    return () => { isSubscribed = false; };
  }, []);

  return { experiences, loading, error, refetch: fetchExperiences };
};
