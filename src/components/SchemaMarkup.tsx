import React from 'react';

type SchemaType = 'Organization' | 'WebSite' | 'EducationalOrganization' | 'Course' | 'FAQPage' | 'BreadcrumbList' | 'Article' | 'WebPage' | 'Person' | 'Review' | 'AggregateRating';

interface SchemaProps {
  type: SchemaType;
  data: Record<string, any>;
}

export default function SchemaMarkup({ type, data }: SchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
