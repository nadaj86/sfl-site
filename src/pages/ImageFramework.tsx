import React from 'react';

export default function ImageFramework() {
  return (
    <div className="prose lg:prose-xl max-w-4xl mx-auto p-6">
      <style>
        {`
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
          }
        `}
      </style>
      <h1>Systemic Functional Linguistics Applied to Images</h1>
      <h2>Kress & van Leeuwen’s Visual Grammar Framework</h2>
      <p>
        Kress and van Leeuwen argue that visual communication, like language, is a semiotic system governed by rules and structures. Visuals are not neutral representations—they are choices that serve specific ideational, interpersonal, and textual purposes.
      </p>

      <h2>1. Ideational Metafunction (Representational Meaning)</h2>
      <p>This metafunction concerns how images represent participants, actions, concepts, and circumstances in the world. It is divided into Narrative and Conceptual Representations.</p>

      <h3>1.1 Narrative Representation</h3>
      <p>Narrative images depict action, reaction, events, or processes. They show what is happening in a visual scene.</p>
      <h4>1.1.1 Vector Analysis</h4>
      <ul>
        <li><strong>Vector</strong>: A visual line or movement that connects participants and shows action.</li>
        <li>Created by gaze, gesture, tools, motion lines in illustrations</li>
      </ul>

      <h4>1.1.2 Process Types in Images</h4>
      <table>
        <thead>
          <tr><th>Visual Process Type</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>Actional</td><td>One participant performs a physical action</td><td>A child throwing a ball</td></tr>
          <tr><td>Reactional</td><td>One participant looks at another</td><td>A woman watching a baby</td></tr>
          <tr><td>Verbal/Mental</td><td>Speech bubbles or symbolic gestures</td><td>A comic strip panel</td></tr>
          <tr><td>Conversional</td><td>Arrows/lines symbolizing transformation</td><td>Flowchart or infographic</td></tr>
          <tr><td>Circumstances</td><td>Time/place/cause shown visually</td><td>Sunsets, clocks, settings</td></tr>
        </tbody>
      </table>

      <h3>1.2 Conceptual Representation</h3>
      <p>Conceptual images depict classification, identity, or meaning that is timeless—there is no action.</p>
      <h4>1.2.1 Types of Conceptual Structures</h4>
      <table>
        <thead>
          <tr><th>Type</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>Classificational</td><td>Grouped under a category</td><td>Chart showing mammals</td></tr>
          <tr><td>Analytical</td><td>Whole–part relationships</td><td>Diagram labeling body parts</td></tr>
          <tr><td>Symbolic</td><td>Icons, colors, poses with abstract meaning</td><td>A crown symbolizing royalty</td></tr>
        </tbody>
      </table>

      <h2>2. Interpersonal Metafunction (Interactive Meaning)</h2>
      <p>Describes how images position the viewer and establish relationships through contact, distance, and angle.</p>

      <h3>2.1 Contact: Gaze</h3>
      <ul>
        <li><strong>Demand image</strong>: Direct gaze demands interaction</li>
        <li><strong>Offer image</strong>: No gaze, offers information</li>
      </ul>

      <h3>2.2 Social Distance</h3>
      <ul>
        <li>Close-up: Intimacy</li>
        <li>Medium shot: Personal connection</li>
        <li>Long shot: Formality</li>
      </ul>

      <h3>2.3 Point of View (Angle)</h3>
      <ul>
        <li><strong>Frontal</strong>: Involvement</li>
        <li><strong>Oblique</strong>: Detachment</li>
        <li><strong>High angle</strong>: Viewer looks down (power over subject)</li>
        <li><strong>Low angle</strong>: Viewer looks up (subject is powerful)</li>
        <li><strong>Eye-level</strong>: Equality</li>
      </ul>

      <h3>2.4 Modality in Images</h3>
      <p>Refers to the realism or credibility of the image. Influenced by:</p>
      <ul>
        <li>Color saturation</li>
        <li>Detail and texture</li>
        <li>Lighting and shadow</li>
        <li>Background</li>
        <li>Naturalistic representation</li>
      </ul>

      <h2>3. Textual Metafunction (Compositional Meaning)</h2>
      <p>Organizes elements into coherent messages using spatial layout, salience, and framing.</p>

      <h3>3.1 Information Value</h3>
      <table>
        <thead>
          <tr><th>Position</th><th>Meaning</th></tr>
        </thead>
        <tbody>
          <tr><td>Left</td><td>Given (familiar)</td></tr>
          <tr><td>Right</td><td>New (emphasized)</td></tr>
          <tr><td>Top</td><td>Ideal (abstract)</td></tr>
          <tr><td>Bottom</td><td>Real (practical)</td></tr>
          <tr><td>Centre</td><td>Most salient</td></tr>
          <tr><td>Margins</td><td>Peripheral meaning</td></tr>
        </tbody>
      </table>

      <h3>3.2 Salience</h3>
      <ul>
        <li>Size, color contrast, focus</li>
        <li>Foreground/background positioning</li>
        <li>Lighting and framing</li>
      </ul>

      <h3>3.3 Framing</h3>
      <ul>
        <li>Framed: Separate elements</li>
        <li>Unframed: Blended elements</li>
      </ul>

      <h3>3.4 Reading Path and Layout</h3>
      <ul>
        <li>Z-pattern or F-pattern</li>
        <li>Diagonal or circular layouts</li>
        <li>Zones used in magazines, web pages</li>
      </ul>

      <h2>4. Intersemiotic Complementarity (Multimodal Integration)</h2>
      <p>Images interact with other modes (e.g., text, layout):</p>
      <ul>
        <li><strong>Anchoring</strong>: Text fixes image meaning</li>
        <li><strong>Relay</strong>: Image and text complement each other</li>
        <li><strong>Redundancy</strong>: Same meaning in text and image</li>
        <li><strong>Contradiction</strong>: Image and text clash (irony, satire)</li>
      </ul>

      <h2>Conclusion</h2>
      <table>
        <thead>
          <tr><th>Metafunction</th><th>Language (Halliday)</th><th>Image (Kress & van Leeuwen)</th></tr>
        </thead>
        <tbody>
          <tr><td>Ideational</td><td>Processes, Participants, Circumstances</td><td>Narrative vs. Conceptual Representations</td></tr>
          <tr><td>Interpersonal</td><td>Mood, Modality, Appraisal</td><td>Gaze, Distance, Angle, Viewer Position</td></tr>
          <tr><td>Textual</td><td>Theme-Rheme, Cohesion</td><td>Layout, Salience, Framing</td></tr>
        </tbody>
      </table>
    </div>
  );
}
