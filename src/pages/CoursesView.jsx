import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import DomainCard from '../components/DomainCard';
import { domainsData } from '../constants/domainsData';

const CoursesView = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 pb-12 border-b border-gray-200 dark:border-white/10">
            <div>
              <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Engineering Portfolios.</h1>
              <p className="text-gray-600 dark:text-white/60 text-2xl font-light max-w-4xl leading-relaxed">Don't just learn. Build industry-grade systems that serve as undeniable, cryptographic proof of competence to tech recruiters.</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.values(domainsData).map((course, idx) => (
            <DomainCard key={course.id} course={course} onClick={() => navigate(`/course/${course.id}`)} delay={idx * 100} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesView;
