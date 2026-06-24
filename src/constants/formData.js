// Form field options for the Apply Now wizard

export const qualifications = [
  '10th Pass',
  '12th Pass',
  'Diploma',
  'BCA',
  'BSc',
  'BTech',
  'BE',
  'MCA',
  'MSc',
  'MTech',
  'MBA',
  'Other'
];

export const degreeDurations = [
  '2 Years',
  '3 Years',
  '4 Years',
  '5 Years'
];

export const academicStatuses = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  'Final Year',
  'Passed Out',
  'Working Professional'
];

export const departments = [
  'Computer Science',
  'Artificial Intelligence',
  'Data Science',
  'Information Technology',
  'Electronics',
  'Electrical',
  'Mechanical',
  'Civil',
  'Chemical',
  'Biotechnology',
  'Commerce',
  'Management',
  'Other'
];

export const languages = [
  'English',
  'Hindi',
  'Odia',
  'Bengali',
  'Telugu',
  'Tamil',
  'Kannada',
  'Malayalam',
  'Marathi',
  'Gujarati',
  'Punjabi',
  'Assamese',
  'Urdu',
  'Sanskrit',
  'Other'
];

export const careerDomains = [
  { id: 'data-science', label: 'Applied Data Science & AI', icon: '🧠' },
  { id: 'full-stack', label: 'Full Stack Development', icon: '⚡' },
  { id: 'vlsi', label: 'VLSI Design', icon: '🔬' },
  { id: 'embedded', label: 'Embedded Systems', icon: '🔧' },
  { id: 'mongo-django', label: 'MongoDB & Django Systems', icon: '🗄️' },
  { id: 'react-native', label: 'React Native Development', icon: '📱' },
  { id: 'confused', label: 'Confused — Need Guidance', icon: '🧭' }
];

export const programTiers = [
  {
    id: 'certification',
    title: 'Certification',
    subtitle: 'Foundation Track',
    features: [
      'Structured Training',
      'Skill Development',
      'Domain Curriculum',
      'Certification'
    ],
    stores: 'Certification',
    priority: 'Standard Priority'
  },
  {
    id: 'internship',
    title: 'Internship Track',
    subtitle: 'Includes Certification',
    features: [
      'Everything in Certification',
      'Internship Projects',
      'Industry Project Experience',
      'Portfolio Development'
    ],
    stores: 'Certification + Internship',
    priority: 'Medium Priority'
  },
  {
    id: 'placement',
    title: 'Placement Track',
    subtitle: 'Includes Certification + Internship',
    features: [
      'Everything in Internship',
      'Placement Assistance',
      'Interview Preparation',
      'Recruiter Visibility',
      'Hiring Support'
    ],
    stores: 'Certification + Internship + Placement',
    priority: 'High Priority'
  }
];

export const stepLabels = [
  'Personal Info',
  'Education',
  'Languages',
  'Career Domain',
  'Program Goal',
  'Additional Info'
];
