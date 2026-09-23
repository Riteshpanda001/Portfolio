import { useState, useEffect, useCallback } from 'react';
import { getAllSkills, getSkillsByCategory } from '../services/skillService';

// ============================================================
// useSkills — fetch and manage skills state
// ============================================================

/**
 * @param {{ grouped?: boolean, category?: string }} options
 */
export function useSkills({ grouped = false, category = '' } = {}) {
  const [skills, setSkills]   = useState(grouped ? {} : []);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = grouped
        ? await getSkillsByCategory()
        : await getAllSkills(category ? { category } : {});
      setSkills(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load skills.');
    } finally {
      setLoading(false);
    }
  }, [grouped, category]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { skills, loading, error, refetch: fetchSkills };
}
