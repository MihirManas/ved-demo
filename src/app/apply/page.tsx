import React from 'react';
import { Metadata } from 'next';
import ScrollReveal from '@/components/ui/scroll-reveal';
import ApplyForm from '@/components/forms/ApplyForm';
import { getAllDepartments, getAllPrograms } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Apply Now - Ved Upskilling',
  description: 'Apply for Ved\'s elite programs. Build your verifiable portfolio and get hired.',
};

export default function ApplyPage() {
  // Read MDX files on the server
  const departments = getAllDepartments();
  const programs = getAllPrograms();

  return (
    <div className="min-h-screen pt-40 pb-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">
              Start Your Verification Track.
            </h1>
            <p className="text-gray-600 dark:text-white/60 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Admission is selective. We only work with engineers serious about building verifiable proof of competence.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <ApplyForm departmentsData={departments} programsData={programs} />
        </ScrollReveal>

      </div>
    </div>
  );
}
