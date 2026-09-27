import { useState, useEffect, useCallback } from 'react';
import { getAllProjects, getFeaturedProjects, getProjectById } from '../services/projectService';

// ============================================================
// useProjects — fetch and manage project list state
// ============================================================

/**
 * @param {{ featured?: boolean, category?: string }} options
 */
export function useProjects({ featured = false, category = '' } = {}) {
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = featured
        ? await getFeaturedProjects()
        : await getAllProjects(category ? { category } : {});
      setProjects(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
  }, [featured, category]);

  useEffect(() => {
    let isSubscribed = true;
    const fetcher = featured
      ? getFeaturedProjects()
      : getAllProjects(category ? { category } : {});

    fetcher
      .then((data) => {
        if (isSubscribed) {
          setProjects(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setError(err.response?.data?.message || 'Failed to load projects.');
          setLoading(false);
        }
      });

    return () => { isSubscribed = false; };
  }, [featured, category]);

  return { projects, loading, error, refetch: fetchProjects };
}

/**
 * Fetch a single project by ID / slug.
 * @param {string} id
 */
export function useProject(id) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!id) return;
    let isSubscribed = true;

    getProjectById(id)
      .then((data) => {
        if (isSubscribed) {
          setProject(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setError(err.response?.data?.message || 'Failed to load project.');
          setLoading(false);
        }
      });

    return () => { isSubscribed = false; };
  }, [id]);

  return { project, loading, error };
}
