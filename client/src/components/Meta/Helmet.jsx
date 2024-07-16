import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const MetaHelmet = ({ Title, Descriptions, keywords }) => {
  useEffect(() => {
    document.title = Title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');

    if (metaDescription) {
      metaDescription.setAttribute('content', Descriptions);
    } else {
      const descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      descriptionTag.setAttribute('content', Descriptions);
      document.head.appendChild(descriptionTag);
    }

    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      keywordsTag.setAttribute('content', keywords);
      document.head.appendChild(keywordsTag);
    }
  }, [Title, Descriptions, keywords]);

  return (
    <Helmet>
      <title>{Title}</title>
      <meta name="description" content={Descriptions} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default MetaHelmet;
