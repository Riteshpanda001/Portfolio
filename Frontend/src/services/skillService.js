import api from './api';

// ============================================================
// Default Seed Skills
// ============================================================
export const DEFAULT_SKILLS = {
  'Machine Learning': ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy', 'LLMs / RAG'],
  'Data Analytics':   ['SQL', 'Power BI', 'Tableau', 'Data Visualization', 'Exploratory Data Analysis (EDA)', 'Statistical Modeling'],
  'Java & Backend':   ['Java (Core & Advanced)', 'Spring Boot', 'Spring Security', 'REST APIs', 'Microservices', 'Hibernate / JPA'],
  'Frontend':         ['React', 'Next.js', 'JavaScript (ES6+)', 'HTML5', 'CSS'],
  'DevOps & Tools':   ['Docker', 'Git / GitHub', 'Maven', 'Canva'],
};

const STORAGE_KEY = 'portfolio_custom_skills';

const getStoredSkills = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_SKILLS;
  } catch {
    return DEFAULT_SKILLS;
  }
};

const saveStoredSkills = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
};

/** Fetch all skills, optionally filtered by category. */
export const getAllSkills = async (params = {}) => {
  try {
    const res = await api.get('/skills', { params });
    return res.data;
  } catch {
    const grouped = getStoredSkills();
    const flat = [];
    Object.entries(grouped).forEach(([cat, list]) => {
      if (!params.category || params.category === cat) {
        list.forEach((name, idx) => {
          flat.push({ _id: `${cat}-${idx}`, name, category: cat });
        });
      }
    });
    return flat;
  }
};

/** Fetch skills grouped by category. */
export const getSkillsByCategory = async () => {
  try {
    const res = await api.get('/skills/grouped');
    if (res.data && Object.keys(res.data).length > 0) return res.data;
    return getStoredSkills();
  } catch {
    return getStoredSkills();
  }
};

/** Admin: Create a skill. */
export const createSkill = async (payload) => {
  try {
    const res = await api.post('/skills', payload);
    return res.data;
  } catch {
    const current = getStoredSkills();
    const cat = payload.category || 'Other';
    const list = current[cat] ? [...current[cat]] : [];
    if (!list.includes(payload.name)) {
      list.push(payload.name);
    }
    const updated = { ...current, [cat]: list };
    saveStoredSkills(updated);
    return { name: payload.name, category: cat };
  }
};

/** Admin: Update a skill. */
export const updateSkill = (id, payload) =>
  api.put(`/skills/${id}`, payload).then((r) => r.data);

/** Admin: Delete a skill. */
export const deleteSkill = async (id, category, skillName) => {
  try {
    return await api.delete(`/skills/${id}`).then((r) => r.data);
  } catch {
    const current = getStoredSkills();
    if (category && current[category]) {
      const updated = {
        ...current,
        [category]: current[category].filter((s) => (typeof s === 'string' ? s !== skillName : s._id !== id)),
      };
      saveStoredSkills(updated);
    }
    return { success: true };
  }
};

