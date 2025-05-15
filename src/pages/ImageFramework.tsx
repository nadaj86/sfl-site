// src/pages/ImageFramework.tsx

import React, { useEffect } from 'react';

function ImageFramework() {
  useEffect(() => {
    document.title = 'SFL Image Analysis Framework';
  }, []);

  return (
    <div style={{ padding: '2rem', lineHeight: 1.6 }}>
      <h1>Systemic Functional Linguistics Applied to Images</h1>
      <h2>Kress & van Leeuwen’s Visual Grammar Framework</h2>
      <p>
        Kress and van Leeuwen argue that visual communication, like language, is a semiotic system...
        <br /><br />
        <strong>1. IDEATIONAL METAFUNCTION (Representational Meaning)</strong><br />
        ...
        <br /><br />
        <strong>4. INTERSEMIOTIC COMPLEMENTARITY (Multimodal Integration)</strong><br />
        ...
        <br /><br />
        <strong>🔚 Conclusion: Visual Grammar in SFL</strong><br />
        ...
      </p>
      <p>
        By applying the metafunctional model to images, analysts can decode ideology, narrative logic,
        identity, and multimodal meaning in visual texts.
      </p>
    </div>
  );
}

export default ImageFramework;
