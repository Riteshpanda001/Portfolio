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
    fetchExperiences();
  }, [fetchExperiences]);

  return { experiences, loading, error, refetch: fetchExperiences };
};
