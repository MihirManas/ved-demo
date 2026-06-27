import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content');

export interface Department {
  id: string;
  title: string;
  icon: string;
  content: string;
}

export interface Program {
  id: string;
  title: string;
  department: string;
  length: string;
  focus: string;
  techs: string[];
  syllabus: string[];
  marketGrowth: string;
  hiring: string;
  content: string;
}

export function getAllDepartments(): Department[] {
  const dir = path.join(contentDir, 'departments');
  if (!fs.existsSync(dir)) return [];
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  
  return files.map(filename => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      id: filename.replace('.mdx', ''),
      title: data.title || '',
      icon: data.icon || '',
      content: content
    };
  });
}

export function getAllPrograms(): Program[] {
  const dir = path.join(contentDir, 'programs');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  
  return files.map(filename => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      id: filename.replace('.mdx', ''),
      title: data.title || '',
      department: data.department || '',
      length: data.length || '',
      focus: data.focus || '',
      techs: data.techs || [],
      syllabus: data.syllabus || [],
      marketGrowth: data.marketGrowth || '',
      hiring: data.hiring || '',
      content: content
    };
  });
}
