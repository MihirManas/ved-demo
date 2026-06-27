const fs = require('fs');
const path = require('path');

const departmentsDir = path.join(__dirname, 'src', 'content', 'departments');
const programsDir = path.join(__dirname, 'src', 'content', 'programs');

fs.mkdirSync(departmentsDir, { recursive: true });
fs.mkdirSync(programsDir, { recursive: true });

const departments = [
  { id: 'artificial-intelligence', title: 'Applied AI & Data Science', icon: 'brain' },
  { id: 'full-stack-development', title: 'Full Stack & Software Engineering', icon: 'code' },
  { id: 'cloud-cybersecurity', title: 'Cloud & Cybersecurity', icon: 'cloud' },
  { id: 'core-hardware', title: 'Core Hardware & Embedded', icon: 'cpu' },
  { id: 'mechanical-civil', title: 'Mechanical & Civil', icon: 'cog' },
  { id: 'business-design', title: 'Business, Management & Design', icon: 'bar-chart' },
  { id: 'biotech', title: 'BioTech', icon: 'microscope' }
];

departments.forEach(dept => {
  const content = \---
title: "\"
icon: "\"
---
Explore our elite programs in \.
\;
  fs.writeFileSync(path.join(departmentsDir, \\.mdx\), content);
});

const programs = [
  { id: 'machine-learning-with-python', title: 'Machine Learning With Python', dept: 'artificial-intelligence' },
  { id: 'data-science-with-python', title: 'Data Science With Python', dept: 'artificial-intelligence' },
  { id: 'artificial-intelligence-with-python', title: 'Artificial Intelligence With Python', dept: 'artificial-intelligence' },
  { id: 'business-analytics', title: 'Business Analytics', dept: 'artificial-intelligence' },
  
  { id: 'full-stack-web-development', title: 'Full Stack Web Development', dept: 'full-stack-development' },
  { id: 'web-development', title: 'Web Development', dept: 'full-stack-development' },
  { id: 'reactjs', title: 'ReactJS', dept: 'full-stack-development' },
  { id: 'mongodb-with-django', title: 'MongoDB With Django', dept: 'full-stack-development' },
  { id: 'mongodb-with-nodejs', title: 'MongoDB With NodeJS', dept: 'full-stack-development' },
  { id: 'advanced-java-programming', title: 'Advanced Java Programming', dept: 'full-stack-development' },
  { id: 'mysql-with-spring-boot', title: 'MySQL With Spring Boot', dept: 'full-stack-development' },
  
  { id: 'vlsi', title: 'VLSI', dept: 'core-hardware' },
  { id: 'embedded-systems-using-proteus-software', title: 'Embedded Systems Using Proteus Software', dept: 'core-hardware' },
  { id: 'robotics', title: 'Robotics', dept: 'core-hardware' },
  { id: 'internet-of-things', title: 'Internet Of Things', dept: 'core-hardware' },
  
  { id: 'ic-engine', title: 'IC Engine', dept: 'mechanical-civil' },
  { id: 'car-design', title: 'Car Design', dept: 'mechanical-civil' },
  { id: 'hybrid-and-electric-vehicle', title: 'Hybrid and Electric Vehicle', dept: 'mechanical-civil' },
  { id: 'autocad-using-autodesk-software', title: 'AutoCAD Using Autodesk Software', dept: 'mechanical-civil' },
  { id: 'construction-planning-and-structural-analysis', title: 'Construction Planning And Structural Analysis', dept: 'mechanical-civil' },
  
  { id: 'microsoft-azure-cloud-computing', title: 'Microsoft Azure Cloud Computing', dept: 'cloud-cybersecurity' },
  { id: 'amazon-web-services-cloud-computing', title: 'Amazon Web Services Cloud Computing', dept: 'cloud-cybersecurity' },
  { id: 'cyber-security-using-kali-linux', title: 'Cyber Security Using Kali Linux', dept: 'cloud-cybersecurity' },
  { id: 'blockchain-development', title: 'Blockchain Development', dept: 'cloud-cybersecurity' },
  
  { id: 'graphic-design', title: 'Graphic Design', dept: 'business-design' },
  { id: 'ui-ux', title: 'UI/UX', dept: 'business-design' },
  { id: 'stock-marketing', title: 'Stock Marketing', dept: 'business-design' },
  { id: 'marketing-management', title: 'Marketing Management', dept: 'business-design' },
  { id: 'human-resource-management-and-analytics', title: 'Human Resource Management And Analytics', dept: 'business-design' },
  { id: 'finance', title: 'Finance', dept: 'business-design' },
  { id: 'digital-marketing-using-seo-and-marketing-automation-tools', title: 'Digital Marketing Using SEO And Marketing Automation Tools', dept: 'business-design' },
  
  { id: 'nanoscience-and-nanotechnology', title: 'Nanoscience And Nanotechnology', dept: 'biotech' },
  { id: 'genetic-engineering', title: 'Genetic Engineering', dept: 'biotech' }
];

programs.forEach(prog => {
  const content = \---
title: "\"
department: "\"
length: "40h Intensive"
focus: "Core principles and advanced execution"
techs: ["Technology 1", "Technology 2"]
syllabus: ["Module 1", "Module 2", "Module 3"]
marketGrowth: "Growing rapidly at 15% CAGR globally."
hiring: "Top companies are actively hiring for these skills."
---
# \

This course provides rigorous training in \. By the end of this program, you will be equipped to handle industry-level projects.
\;
  fs.writeFileSync(path.join(programsDir, \\.mdx\), content);
});

console.log('Successfully generated MDX content files.');
