import aiRecruitmentImg from '../assets/images/projects/ai-recruitment.jpg';
import myshopeImg from '../assets/images/projects/myshope-ecommerce.jpg';
import aiRiskManagerImg from '../assets/images/projects/ai-risk-manager.jpg';
import ecommerceBiImg from '../assets/images/projects/ecommerce-bi-analytics.jpg';
import customerChurnImg from '../assets/images/projects/customer-churn-analytics.jpg';
import jobMarketIntelligenceImg from '../assets/images/projects/job-market-intelligence.jpg';
import hotelAiAssistantImg from '../assets/images/projects/hotel-ai-assistant.jpg';
import handwrittenDigitImg from '../assets/images/projects/handwritten-digit-recognition.jpg';

// ============================================================
// Real Projects Data
// featured: true  → shown on homepage (max 3)
// featured: false → shown only on /projects page
// ============================================================

export const PROJECTS = [
  {
    id: 'ai-recruitment',
    displayOrder: 1,
    featured: true,
    title: 'AI HR & Recruitment Platform',
    status: 'Incomplete',
    statusType: 'incomplete',
    category: 'AI / Backend / Full-Stack',
    problem: 'Recruiters often spend significant time manually screening resumes, comparing candidates, conducting interviews, and identifying skill gaps.',
    solution: 'Building an AI-powered recruitment platform that supports resume screening, candidate ranking, candidate matching, AI-assisted interviews, voice interviews, recruiter workflows, and skill-gap analysis.',
    keyLearnings: 'Learned how to structure AI-powered backend services, design REST APIs, organize recruitment workflows, and connect AI functionality with application-level business logic.',
    technologies: ['Python', 'FastAPI', 'AI/ML', 'REST APIs', 'MongoDB'],
    imageUrl: aiRecruitmentImg,
    githubUrl: 'https://github.com/Riteshpanda001',
    liveUrl: null,
    iconType: 'users',
  },
  {
    id: 'ai-risk-manager',
    displayOrder: 2,
    featured: true,
    title: 'AI Risk Manager',
    status: 'Incomplete',
    statusType: 'incomplete',
    category: 'AI / Machine Learning / Risk Management',
    problem: 'Identifying and managing potential risks across complex information and decision-making processes can require significant manual analysis and consistent evaluation.',
    solution: 'Developing an AI-powered risk management system that analyzes relevant data, identifies potential risks, supports risk assessment, and presents actionable insights through an intuitive application interface.',
    keyLearnings: 'Exploring AI-assisted risk analysis, data processing, predictive modeling, structured risk evaluation, and integrating intelligent decision-support features into a software application.',
    technologies: ['Python', 'Machine Learning', 'AI', 'Data Analysis'],
    imageUrl: aiRiskManagerImg,
    githubUrl: 'https://github.com/Riteshpanda001',
    liveUrl: null,
    iconType: 'shield',
  },
  {
    id: 'hotel-ai-assistant',
    displayOrder: 3,
    featured: true,
    title: 'Hotel AI Assistant',
    status: 'In Development',
    statusType: 'in-development',
    category: 'Artificial Intelligence / Generative AI / Full-Stack Development',
    overview: 'An AI-powered hotel assistance platform that helps users explore hotel services, get instant answers to hotel-related queries, and receive personalized assistance through an intelligent conversational interface.',
    problem: 'Guests and travelers often face long wait times at hotel front desks, difficulty accessing immediate information about amenities, dining hours, room services, and local attractions, while hotel staff spend repetitive hours answering routine inquiries.',
    solution: 'An AI-powered hotel assistance platform that helps users explore hotel services, get instant answers to hotel-related queries, and receive personalized assistance through an intelligent conversational interface.',
    keyLearnings: 'Gained hands-on experience designing domain-specific conversational AI workflows, architecting FastAPI microservices with Large Language Models, implementing context retrieval, and creating responsive React interfaces for seamless conversational user experiences.',
    features: [
      'AI-powered hotel query assistance for instant responses to guest inquiries',
      'Natural language conversations with context-aware responses',
      'Instant answers to hotel-related questions (amenities, dining, policies, check-in/out)',
      'Intelligent hotel information retrieval powered by Large Language Models',
      'Personalized assistance and tailored local recommendations for guests',
      'Responsive, modern user interface optimized for desktop and mobile devices',
      'Conversation history for seamless multi-turn interactions'
    ],
    technologies: [
      'Python',
      'FastAPI',
      'React.js',
      'Generative AI',
      'Large Language Models (LLMs)',
      'REST APIs',
      'MongoDB'
    ],
    imageUrl: hotelAiAssistantImg,
    githubUrl: 'https://github.com/Riteshpanda001',
    liveUrl: null,
    iconType: 'hotel',
  },
  {
    id: 'handwritten-digit-recognition',
    displayOrder: 4,
    featured: false,
    title: 'Handwritten Digit Recognition System',
    status: 'Completed',
    statusType: 'completed',
    category: 'Artificial Intelligence / Machine Learning',
    overview: 'An interactive machine learning application that recognizes handwritten digits (0–9) using the MNIST dataset. It implements and compares multiple machine learning algorithms, including K-Nearest Neighbors (KNN), Support Vector Machine (SVM), Random Forest, and Convolutional Neural Networks (CNN), to evaluate their classification performance.',
    problem: 'Recognizing handwritten digits accurately in real-world scenarios is challenging due to immense variations in handwriting styles, stroke thickness, pressure, orientation, and subtle pixel artifacts across different users.',
    solution: 'An interactive handwritten digit recognition system using the MNIST dataset, comparing KNN, SVM, Random Forest, and CNN models to classify handwritten digits from 0 to 9.',
    keyLearnings: 'Deepened hands-on expertise in image data preprocessing (28x28 grayscale normalization, centering, stroke enhancement), training and benchmarking classical ML vs. deep learning architectures, constructing clean FastAPI REST endpoints, containerizing full-stack ML workflows with Docker, and designing responsive interactive drawing interfaces in React.',
    features: [
      'Handwritten digit recognition for digits 0 through 9',
      'Integration with benchmark MNIST dataset (70,000 images)',
      'Side-by-side comparison of KNN, SVM, Random Forest, and CNN models',
      'Model performance evaluation with comprehensive metrics',
      'Evaluation metrics including Accuracy, Precision, Recall, and F1-score',
      'Interactive digit drawing using real-time HTML5 canvas',
      'Image upload support for custom handwritten digit files',
      'Real-time prediction confidence and class probabilities display',
      'Prediction history tracking and session persistence'
    ],
    modelComparison: [
      {
        algorithm: 'KNN (K-Nearest Neighbors)',
        description: 'Classifies digits using nearest data points',
        type: 'Instance-Based Learning'
      },
      {
        algorithm: 'SVM (Support Vector Machine)',
        description: 'Performs classification using support vector machines',
        type: 'Kernel Machine'
      },
      {
        algorithm: 'Random Forest',
        description: 'Uses an ensemble of decision trees',
        type: 'Ensemble Learning'
      },
      {
        algorithm: 'CNN (Convolutional Neural Network)',
        description: 'Extracts image features using convolutional layers',
        type: 'Deep Learning'
      }
    ],
    categorizedTech: {
      'Programming Language': ['Python', 'JavaScript (ES6+)'],
      'Machine Learning': ['Scikit-learn', 'Convolutional Neural Networks (CNN)', 'NumPy'],
      'Backend': ['FastAPI', 'Uvicorn', 'REST APIs'],
      'Frontend': ['React.js', 'HTML5 Canvas', 'CSS3'],
      'Deployment & Containerization': ['Docker'],
      'Dataset': ['MNIST Dataset (0–9 digits)']
    },
    workflow: [
      { step: 1, title: 'Input Acquisition', description: 'User draws a digit on the canvas or uploads an image.' },
      { step: 2, title: 'Preprocessing', description: 'The input image is processed into the required format.' },
      { step: 3, title: 'API Transmission', description: 'The backend receives the image through FastAPI.' },
      { step: 4, title: 'Model Inference', description: 'The selected trained model performs prediction.' },
      { step: 5, title: 'Prediction Response', description: 'The predicted digit and confidence are returned.' },
      { step: 6, title: 'Display Results', description: 'The frontend displays the prediction to the user.' }
    ],
    technologies: [
      'Python',
      'Machine Learning',
      'Scikit-learn',
      'Convolutional Neural Networks (CNN)',
      'FastAPI',
      'React.js',
      'Docker',
      'MNIST Dataset'
    ],
    imageUrl: handwrittenDigitImg,
    githubUrl: 'https://github.com/Riteshpanda001/Handwritten-Digit',
    liveUrl: null,
    iconType: 'pen-tool',
  },
  {
    id: 'ecommerce-bi-analytics',
    displayOrder: 5,
    featured: false,
    title: 'E-Commerce Business Intelligence & Customer Analytics',
    status: 'Incomplete',
    statusType: 'incomplete',
    category: 'DATA SCIENCE / BUSINESS INTELLIGENCE',
    problem: 'E-commerce businesses generate large volumes of customer, order, and product data, but extracting meaningful business insights from this data can be difficult without structured analysis and visualization.',
    solution: 'Built an end-to-end business intelligence solution using SQL, Python, Power BI, and Excel to analyze sales performance, customer behavior, product trends, and key business metrics.',
    keyLearnings: 'Strengthened SQL querying, data cleaning, exploratory data analysis, customer segmentation, KPI development, dashboard design, and business-focused data storytelling.',
    technologies: ['SQL', 'Python', 'Power BI', 'Excel', 'Pandas'],
    imageUrl: ecommerceBiImg,
    githubUrl: 'https://github.com/Riteshpanda001',
    liveUrl: null,
    iconType: 'bar-chart',
  },
  {
    id: 'customer-churn-analytics',
    displayOrder: 6,
    featured: false,
    title: 'Customer Churn Prediction & Retention Analytics',
    status: 'Incomplete',
    statusType: 'incomplete',
    category: 'MACHINE LEARNING / DATA ANALYTICS',
    problem: 'Customer churn can negatively affect business growth, while identifying customers at risk of leaving is difficult using manual analysis alone.',
    solution: 'Developed a machine learning pipeline to analyze customer behavior, identify churn patterns, predict customers at risk of leaving, and visualize retention insights through Power BI.',
    keyLearnings: 'Practiced exploratory data analysis, feature engineering, classification modeling, model evaluation, customer segmentation, and translating machine learning results into business insights.',
    technologies: ['Python', 'SQL', 'Machine Learning', 'Scikit-learn', 'Power BI', 'Pandas'],
    imageUrl: customerChurnImg,
    githubUrl: 'https://github.com/Riteshpanda001',
    liveUrl: null,
    iconType: 'trending-down',
  },
  {
    id: 'job-market-intelligence',
    displayOrder: 7,
    featured: false,
    title: 'Data Analyst Job Market Intelligence',
    status: 'Incomplete',
    statusType: 'incomplete',
    category: 'DATA ANALYTICS / MARKET INTELLIGENCE',
    problem: 'Job seekers often lack a clear understanding of which skills, technologies, locations, and qualifications are most commonly requested in Data Analyst job postings.',
    solution: 'Built a data analytics project that analyzes Data Analyst job market information to identify in-demand skills, technologies, job locations, experience requirements, salary patterns, and market trends.',
    keyLearnings: 'Strengthened data collection, data cleaning, exploratory analysis, SQL querying, Python-based analysis, visualization, and communicating market insights through dashboards.',
    technologies: ['Python', 'SQL', 'Pandas', 'Power BI', 'Excel', 'Data Visualization'],
    imageUrl: jobMarketIntelligenceImg,
    githubUrl: 'https://github.com/Riteshpanda001',
    liveUrl: null,
    iconType: 'briefcase',
  },
  {
    id: 'myshope',
    displayOrder: 8,
    featured: false,
    title: 'Myshope E-Commerce Website',
    status: 'Incomplete',
    statusType: 'incomplete',
    category: 'Frontend / E-Commerce',
    problem: 'Users need a simple and responsive interface for browsing, searching, and exploring products through an e-commerce website.',
    solution: 'Built a responsive e-commerce frontend with product listings, navigation, search and filtering functionality, authentication-related pages, and an organized shopping interface.',
    keyLearnings: 'Strengthened HTML, CSS, JavaScript, responsive design, UI development, DOM manipulation, and frontend project organization.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: myshopeImg,
    githubUrl: 'https://github.com/Riteshpanda001',
    liveUrl: null,
    iconType: 'shopping-bag',
  },
];
