// src/pages/TextFramework.tsx

import React from 'react';

function TextFramework() {
  return (
    <div style={{ padding: '2rem', lineHeight: 1.6 }}>
      <h1>SFL Text Analysis Framework</h1>

      <p><strong>Systemic Functional Linguistics (SFL)</strong> conceptualizes language as a resource for meaning-making, where all language simultaneously performs three metafunctions:</p>
      <ul>
        <li><strong>Ideational:</strong> representing the world</li>
        <li><strong>Interpersonal:</strong> enacting relationships</li>
        <li><strong>Textual:</strong> organizing messages in context</li>
      </ul>

      <h2>1. IDEATIONAL METAFUNCTION</h2>
      <p>This metafunction is concerned with the representation of experience—external (physical), internal (mental), and logical (connections between experiences).</p>

      <h3>1.1. Logical Metafunction</h3>
      <p>Deals with clause complexing—how clauses combine to construct logical meaning.</p>
      <ul>
        <li><strong>Parataxis:</strong> Coordination (e.g., "She came, and he stayed.")</li>
        <li><strong>Hypotaxis:</strong> Subordination (e.g., "Although she came, he stayed.")</li>
      </ul>

      <h4>Logico-Semantic Relations</h4>
      <ul>
        <li><strong>Elaboration:</strong> "He resigned — that is, he left without notice."</li>
        <li><strong>Extension:</strong> "She smiled and waved."</li>
        <li><strong>Enhancement:</strong> "She studied because she wanted to pass."</li>
        <li><strong>Projection:</strong> "She said that she was tired."</li>
      </ul>

      <h3>1.2. Experiential Metafunction</h3>
      <p>Construes experience through the transitivity system: processes, participants, and circumstances.</p>

      <h4>Process Types</h4>
      <ul>
        <li><strong>Material:</strong> She built a house.</li>
        <li><strong>Mental:</strong> He feared the truth.</li>
        <li><strong>Relational:</strong> Einstein was a genius.</li>
        <li><strong>Verbal:</strong> She said hello.</li>
        <li><strong>Behavioral:</strong> She sighed.</li>
        <li><strong>Existential:</strong> There is a problem.</li>
      </ul>

      <h4>Participants</h4>
      <p>Examples: Actor, Goal, Senser, Carrier, Sayer, Behaver, Existent, etc.</p>

      <h4>Circumstances</h4>
      <ul>
        <li><strong>Location:</strong> At home, Yesterday</li>
        <li><strong>Cause:</strong> Because of the rain</li>
        <li><strong>Manner:</strong> With precision</li>
        <li>...and others like Role, Extent, Angle, Matter</li>
      </ul>

      <h2>2. INTERPERSONAL METAFUNCTION</h2>

      <h3>2.1. Mood</h3>
      <ul>
        <li><strong>Declarative:</strong> He is coming.</li>
        <li><strong>Interrogative:</strong> Is he coming?</li>
        <li><strong>Imperative:</strong> Come here!</li>
      </ul>

      <h3>2.2. Modality</h3>
      <ul>
        <li><strong>Epistemic:</strong> might, probably</li>
        <li><strong>Deontic:</strong> must, should</li>
        <li><strong>Dynamic:</strong> can, able to</li>
      </ul>

      <h3>2.3. Pronouns</h3>
      <p>First/Second/Third person; Inclusive vs Exclusive "we"</p>

      <h3>2.4. Appraisal (Martin & White)</h3>
      <ul>
        <li><strong>Affect:</strong> She was thrilled.</li>
        <li><strong>Judgment:</strong> He is dishonest.</li>
        <li><strong>Appreciation:</strong> A well-written article.</li>
      </ul>

      <h3>2.5. Reader Positioning</h3>
      <p>Writers use stance and voice to align readers.</p>

      <h2>3. TEXTUAL METAFUNCTION</h2>

      <h3>3.1. Theme & Rheme</h3>
      <p><strong>Theme:</strong> Point of departure<br /><strong>Rheme:</strong> What's being said about it</p>

      <h3>3.2. Thematic Progression</h3>
      <ul>
        <li><strong>Constant:</strong> Same theme repeated</li>
        <li><strong>Linear:</strong> Rheme becomes next theme</li>
        <li><strong>Split:</strong> Rheme splits into two themes</li>
      </ul>

      <h3>3.3. Cohesion</h3>
      <ul>
        <li>Reference</li>
        <li>Substitution</li>
        <li>Ellipsis</li>
        <li>Conjunction</li>
        <li>Lexical cohesion</li>
      </ul>

      <h3>3.4. Coherence</h3>
      <p>Genre, topic continuity, logical flow</p>

      <h2>4. REGISTER</h2>
      <p>Register is the context of situation:</p>
      <ul>
        <li><strong>Field:</strong> What’s happening?</li>
        <li><strong>Tenor:</strong> Who’s involved?</li>
        <li><strong>Mode:</strong> Spoken, written, reflective</li>
      </ul>
    </div>
  );
}

export default TextFramework;
