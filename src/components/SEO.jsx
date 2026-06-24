import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, type = 'website', url, schema = [] }) => {
  const fullTitle = `${title} | Ved Skill Verification Platform`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`https://vedupskilling.in${url}`} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={`https://vedupskilling.in${url}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Ved Upskilling",
          "url": "https://vedupskilling.in",
          "logo": "https://vedupskilling.in/favicon.svg",
          "description": "Skill-Verification and Employability Platform for Engineers",
          "sameAs": [
            "https://www.linkedin.com/company/vedupskilling"
          ]
        })}
      </script>

      {schema.map((s, idx) => (
        <script type="application/ld+json" key={idx}>
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
