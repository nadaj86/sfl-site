import { Link } from 'react-router-dom';

function ImageFramework() {
  return (
    <div style={{ padding: '1rem' }}>
      <Link to="/">← Back to Home</Link>
      <h1 style={{ marginTop: '1rem' }}>SFL Image Analysis Framework</h1>
      <p style={{ marginTop: '1rem' }}>
        Based on Kress and van Leeuwen’s visual grammar, this framework explains representational, interpersonal, and compositional meanings in images.
      </p>
    </div>
  );
}

export default ImageFramework;
