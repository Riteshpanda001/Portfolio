import api from './api';

// ============================================================
// Default Seed Experiences
// ============================================================
export const DEFAULT_EXPERIENCES = [
  {
    id: 'gen-ai-intern',
    role: 'Generative AI Intern',
    company: 'Asirudh Software Private Limited',
    type: 'Industry-Oriented Internship',
    duration: '45 Days',
    dateRange: 'May 2026 – July 2026',
    description:
      'Completed an industry-oriented Generative AI internship, working on real-world Generative AI projects and gaining practical experience in LLMs, prompt engineering, LangChain, RAG, vector databases, and Python.',
    responsibilities: [
      'Worked on real-world Generative AI projects using Python and modern AI technologies.',
      'Gained practical experience with Large Language Models (LLMs) and Prompt Engineering.',
      'Worked with LangChain for building LLM-powered applications and workflows.',
      'Explored Retrieval-Augmented Generation (RAG) and Vector Database concepts for knowledge-based AI systems.',
      'Applied Generative AI concepts to practical application development and problem-solving.',
    ],
    technologies: [
      'Python',
      'Generative AI',
      'LLMs',
      'Prompt Engineering',
      'LangChain',
      'RAG',
      'Vector Databases',
    ],
  },
  {
    id: 'nist-data-science',
    role: 'Data Science & Data Analysis Using Python',
    company: 'NIST University',
    type: 'Summer Course',
    duration: '22 Days',
    dateRange: '20 May 2025 – 11 June 2025',
    description:
      'Successfully completed a summer course focused on Data Science and Data Analysis using Python, building a foundation in Python-based data analysis and data science concepts.',
    responsibilities: [
      'Python-based data analysis',
      'Data Science fundamentals',
      'Data analysis workflows',
      'Data processing and interpretation',
      'Practical application of Python for data analysis',
    ],
    technologies: ['Python', 'Data Science', 'Data Analysis', 'Data Processing'],
  },
  {
    id: 'oracle-agentic-ai',
    role: 'Agentic AI Certified Foundations Associate',
    company: 'Oracle University',
    type: 'Certification',
    duration: 'Valid 2 Years',
    dateRange: 'August 11, 2026 – August 11, 2028',
    description:
      'Demonstrated foundational knowledge and practical skills in Agentic AI, Autonomous AI agents, LLM orchestration, and Oracle Cloud AI infrastructure.',
    responsibilities: [
      'Validated expertise in Agentic AI architectures, autonomous decision-making agents, and multi-agent workflows.',
      'Demonstrated proficiency in Oracle Cloud Infrastructure (OCI) AI services and LLM integration.',
      'Mastered core principles of agent tool-use, planning, reasoning loops, and prompt engineering.',
      'Earned official certification from Oracle University upon rigorous evaluation of AI concepts and practical implementation.',
    ],
    technologies: ['Agentic AI', 'Oracle Cloud (OCI)', 'LLMs', 'Autonomous Agents', 'AI Infrastructure'],
  },
];

const STORAGE_KEY = 'portfolio_custom_experiences';

const getStoredExperiences = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_EXPERIENCES;
  } catch {
    return DEFAULT_EXPERIENCES;
  }
};

const saveStoredExperiences = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
};

/** Fetch all work-experience entries. */
export const getAllExperiences = async () => {
  try {
    const res = await api.get('/experience');
    if (Array.isArray(res.data) && res.data.length > 0) return res.data;
    return getStoredExperiences();
  } catch {
    return getStoredExperiences();
  }
};

/** Fetch a single experience by ID. */
export const getExperienceById = (id) =>
  api.get(`/experience/${id}`).then((r) => r.data);

/** Admin: Create an experience entry. */
export const createExperience = async (payload) => {
  try {
    const res = await api.post('/experience', payload);
    return res.data;
  } catch {
    const current = getStoredExperiences();
    const newEntry = {
      id: 'exp-' + Date.now(),
      role: payload.role,
      company: payload.company,
      type: payload.type || 'Internship',
      duration: payload.duration || 'Ongoing',
      dateRange: payload.dateRange || 'Present',
      description: payload.description || '',
      responsibilities: Array.isArray(payload.responsibilities)
        ? payload.responsibilities
        : (payload.responsibilities || '').split('\n').map((s) => s.trim()).filter(Boolean),
      technologies: Array.isArray(payload.technologies)
        ? payload.technologies
        : (payload.technologies || '').split(',').map((s) => s.trim()).filter(Boolean),
    };
    const updated = [newEntry, ...current];
    saveStoredExperiences(updated);
    return newEntry;
  }
};

/** Admin: Update an experience entry. */
export const updateExperience = (id, payload) =>
  api.put(`/experience/${id}`, payload).then((r) => r.data);

/** Admin: Delete an experience entry. */
export const deleteExperience = async (id) => {
  try {
    return await api.delete(`/experience/${id}`).then((r) => r.data);
  } catch {
    const current = getStoredExperiences();
    const updated = current.filter((e) => e.id !== id);
    saveStoredExperiences(updated);
    return { success: true };
  }
};

