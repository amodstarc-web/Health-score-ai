import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = 'HealthScore AI - Comprehensive Health Assessment & Wellness Platform',
  description = 'Get your complete health score in 2 minutes. AI-powered health assessments including Body Health, Longevity Score, Heart Risk, Stress Level, Mental Age, and Sleep Quality analysis. Personalized nutrition recommendations and monthly health tracking.',
  keywords = 'health assessment, body fat calculator, metabolic age, longevity score, heart risk checker, stress analyzer, mental age test, sleep quality, health tracking, wellness, nutrition recommendations, preventive healthcare, India health',
  image = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
  url = 'https://healthscore-ai.com',
  type = 'website'
}: SEOProps) {
  const fullTitle = title.includes('HealthScore AI') ? title : `${title} | HealthScore AI`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="HealthScore AI" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="HealthScore AI" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Schema.org for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthAndBeautyBusiness",
          "name": "HealthScore AI",
          "description": description,
          "url": url,
          "logo": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
          "image": image,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "10000"
          },
          "priceRange": "₹99 - ₹199",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          },
          "sameAs": []
        })}
      </script>
    </Helmet>
  );
}
