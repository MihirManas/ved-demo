import React from 'react';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Blog - Ved Upskilling',
  description: 'Explore our Blog to enhance your knowledge and career in tech.',
};

export default function Page() {
  return (
    <main className="min-h-screen pt-40 pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-24">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">
            Blog
          </h1>
          <p className="text-gray-600 dark:text-white/60 text-xl md:text-2xl font-light max-w-4xl leading-relaxed">
            Content coming soon.
          </p>
        </header>
        
        {/* Placeholder for future LLM-optimized content */}
        <section className="prose prose-lg dark:prose-invert max-w-none">
          <article>
            <h2>Overview</h2>
            <p>Details about Blog will be available here.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
