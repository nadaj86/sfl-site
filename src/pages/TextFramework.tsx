// src/pages/TextFramework.tsx

import { Link } from 'react-router-dom';

export default function TextFramework() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>SFL Text Analysis Framework</h1>
      <p>
      </p>

      <p>
        Systemic Functional Linguistics (SFL) views language as a social semiotic system that
        simultaneously fulfills three metafunctions: ideational, interpersonal, and textual.
        This analytical model is essential in understanding not only what is being communicated,
        but also how and why.
      </p>

      <h2>1. Ideational Metafunction</h2>
      <p>
        Constructs the content of experience: inner world of consciousness and outer world of
        events and relationships.
      </p>

      <h3>1.1 Logical Metafunction</h3>
      <ul>
        <li><b>Parataxis:</b> Equal-status clauses (e.g., “She laughed and he cried”)</li>
        <li><b>Hypotaxis:</b> Main clause with dependents (e.g., “She laughed because he cried”)</li>
        <li><b>Logico-Semantic:</b> Elaboration, Extension, Enhancement, Projection</li>
      </ul>

      <h3>1.2 Experiential Metafunction</h3>
      <ul>
        <li><b>Process Types:</b> Material, Mental, Relational, Verbal, Behavioral, Existential</li>
        <li><b>Circumstances:</b> Location, Manner, Cause, Accompaniment, Matter, Role</li>
      </ul>

      <h2>2. Interpersonal Metafunction</h2>
      <p>
        Enables speakers/writers to interact, negotiate, and position socially.
      </p>

      <h3>2.1 Mood System</h3>
      <ul>
        <li>Declarative</li>
        <li>Interrogative</li>
        <li>Imperative</li>
      </ul>

      <h3>2.2 Modality</h3>
      <ul>
        <li>Epistemic (e.g. might, must)</li>
        <li>Deontic (e.g. should, may)</li>
        <li>Dynamic (e.g. can, will)</li>
      </ul>

      <h3>2.3 Appraisal System</h3>
      <ul>
        <li>Attitude</li>
        <li>Engagement</li>
        <li>Graduation</li>
      </ul>

      <h2>3. Textual Metafunction</h2>
      <p>
        Organizes language for coherence and cohesion.
      </p>

      <h3>3.1 Theme and Rheme</h3>
      <ul>
        <li>Theme: starting point</li>
        <li>Rheme: message development</li>
        <li>Thematic progression</li>
      </ul>

      <h3>3.2 Cohesion</h3>
      <ul>
        <li>Reference, Substitution, Ellipsis</li>
        <li>Conjunction</li>
        <li>Lexical cohesion</li>
      </ul>

      <h2>4. Register</h2>
      <ul>
        <li><b>Field:</b> Subject matter</li>
        <li><b>Tenor:</b> Social relationships</li>
        <li><b>Mode:</b> Channel of communication</li>
      </ul>

      <p>
        <Link to="/" style={{ color: '#4a4af5' }}>&larr; Back to Home</Link>
      </p>
    </div>
  );
}
