// src/pages/ImageFramework.tsx

import React, { useEffect } from 'react';

function ImageFramework() {
  useEffect(() => {
    document.title = 'SFL Image Analysis Framework';
  }, []);

  return (
    <div style={{ padding: '2rem', lineHeight: '1.6', maxWidth: '960px', margin: '0 auto' }}>
      <h1>Systemic Functional Linguistics Applied to Images</h1>
      <p><strong>Kress & van Leeuwen’s Visual Grammar Framework</strong></p>
      <p>Visuals are choices that serve specific ideational, interpersonal, and textual purposes.</p>

      <h2>1. IDEATIONAL METAFUNCTION (Representational Meaning)</h2>
      <h3>1.1. Narrative Representation</h3>
      <p><strong>Vector:</strong> A visual line connecting participants, often via gaze, gesture, or tools.</p>
      <ul>
        <li>Gaze, pointing, motion lines indicate action.</li>
      </ul>

      <h4>1.1.2. Process Types in Images</h4>
      <table border="1" cellPadding="5">
        <thead>
          <tr><th>Type</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>Actional</td><td>Actor performs action</td><td>Child throwing ball</td></tr>
          <tr><td>Reactional</td><td>Gaze-based relation</td><td>Woman watching baby</td></tr>
          <tr><td>Verbal</td><td>Speech bubbles, symbols</td><td>Comics</td></tr>
        </tbody>
      </table>

      <h4>1.1.3. Participants</h4>
      <ul>
        <li><strong>Actor:</strong> The doer</li>
        <li><strong>Goal:</strong> Receiver of action</li>
        <li><strong>Reactor:</strong> The looker</li>
        <li><strong>Phenomenon:</strong> The viewed object</li>
      </ul>

      <h3>1.2. Conceptual Representation</h3>
      <ul>
        <li><strong>Classificational:</strong> Grouping</li>
        <li><strong>Analytical:</strong> Whole-part</li>
        <li><strong>Symbolic:</strong> Abstract meaning (e.g. crown = royalty)</li>
      </ul>

      <h2>2. INTERPERSONAL METAFUNCTION</h2>
      <ul>
        <li><strong>Contact:</strong> Gaze (Demand vs Offer)</li>
        <li><strong>Distance:</strong> Close-up = intimate; Long shot = formal</li>
        <li><strong>Angle:</strong> Frontal = involvement; High = viewer power; Low = subject power</li>
        <li><strong>Modality:</strong> Color, detail, realism affect credibility</li>
      </ul>

      <h2>3. TEXTUAL METAFUNCTION (Compositional Meaning)</h2>
      <ul>
        <li><strong>Information Value:</strong> Left = Given, Right = New, Top = Ideal</li>
        <li><strong>Salience:</strong> Size, contrast, position</li>
        <li><strong>Framing:</strong> Framed = separate, Unframed = cohesive</li>
        <li><strong>Reading Path:</strong> Z-patterns, layout flow</li>
      </ul>

      <h2>4. INTERSEMIOTIC COMPLEMENTARITY</h2>
      <p>How images and text work together:</p>
      <ul>
        <li><strong>Anchoring:</strong> Text fixes image meaning</li>
        <li><strong>Relay:</strong> Each mode adds new info</li>
        <li><strong>Redundancy:</strong> Repetition between text & image</li>
        <li><strong>Contradiction:</strong> Irony or tension</li>
      </ul>

      <h3>Conclusion: Visual Grammar in SFL</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr><th>Metafunction</th><th>Language</th><th>Image</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Ideational</td>
            <td>Processes, Participants</td>
            <td>Narrative, Conceptual structures</td>
          </tr>
          <tr>
            <td>Interpersonal</td>
            <td>Mood, Appraisal</td>
            <td>Gaze, Angle, Modality</td>
          </tr>
          <tr>
            <td>Textual</td>
            <td>Theme, Cohesion</td>
            <td>Layout, Salience</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ImageFramework;
