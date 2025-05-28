// src/App.tsx
import Contact from './pages/Contact';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import OpenAI from 'openai';
import logo from './assets/logo.png';
import TextFramework from './pages/TextFramework';
import ImageFramework from './pages/ImageFramework';

function App() {
  useEffect(() => {
    document.title = 'SFL Insights';
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '1rem' }} />
        <h1 style={{ margin: 0, fontSize: '0.95rem' }}>©2025 Nada AlJamal</h1>
      </header>

      <nav style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/text-framework" style={{ marginRight: '1rem' }}>Text Analysis Framework</Link>
        <Link to="/text-analysis" style={{ marginRight: '1rem' }}>Text Tool</Link>
        <Link to="/image-framework" style={{ marginRight: '1rem' }}>Image Analysis Framework</Link>
        <Link to="/image-analysis" style={{ marginRight: '1rem' }}>Image Tool</Link>
        <Link to="/contact" style={{ marginRight: '1rem' }}>Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text-framework" element={<TextFramework />} />
        <Route path="/text-analysis" element={<TextTool />} />
        <Route path="/image-framework" element={<ImageFramework />} />
        <Route path="/image-analysis" element={<ImageTool />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div style={{ padding: '1rem', lineHeight: '1.6' }}>
      <h1>Welcome to SFL Insights</h1>
      <p>
        Welcome to SFL Insights, your gateway to powerful text and image analysis tools grounded in the principles of Systemic Functional Linguistics (SFL). Whether you're a student, researcher, or linguist, our tools are designed to support deep and structured analyses of meaning in both language and visuals.
      </p>
      <h2>📘 SFL Text Analysis Tool</h2>
      <ul>
        <li>Ideational Metafunction (experiential and logical meanings)</li>
        <li>Interpersonal Metafunction (mood, modality, appraisal)</li>
        <li>Textual Metafunction (theme/rheme, cohesion, nominalization, and more)</li>
      </ul>
      <h2>🖼️ SFL Image Analysis Tool</h2>
      <ul>
        <li>Representational meanings (narrative and conceptual structures)</li>
        <li>Interpersonal meanings (gaze, size, angle, and social distance)</li>
        <li>Compositional meanings (information value, salience, and framing)</li>
      </ul>
      <h3>🔒 Your Privacy Matters</h3>
      <p>
        Kindly note that none of the submitted texts or images are stored or saved. All analyses are processed securely and anonymously to protect your privacy.
      </p>
    </div>
  );
}

function ImageTool() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setAnalysis(null);
      setError(null);
    }
  }

  async function handleSubmit() {
    if (!image) return alert('Please upload an image first.');
    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64 = reader.result?.toString().split(',')[1];
      try {
        const response = await fetch('/.netlify/functions-background/analyzeImage', {

          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64 }),
        });

        const data = await response.json();
        setAnalysis(data.analysis || 'No result from OpenAI.');
      } catch (err: any) {
        setError('Something went wrong while analyzing the image.');
      } finally {
        setLoading(false);
      }
    };
  }

  return (
    <div>
      <h2>Image Analysis Tool</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '300px', marginTop: '1rem' }} />}
      <br />
      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Analyzing...' : 'Analyze Image'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      {analysis && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Analysis Result:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{analysis}</pre>
        </div>
      )}
    </div>
  );
}

function TextTool() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!input.trim()) return alert('Please enter some text.');
    setLoading(true);

    try {
      const openai = new OpenAI({
        apiKey: 'sk-REPLACE_ME',
        dangerouslyAllowBrowser: true,
      });

      const prompt = `You are an expert in Systemic Functional Linguistics (SFL)...\nText:\n"""${input}"""`;
      const res = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3000,
      });

      const result = res.choices?.[0]?.message?.content || '';
      const parts = result.split(/##\s+/).filter(Boolean).map(p => p.trim());
      setAnalysis(parts);
    } catch {
      alert('Something went wrong (GPT request failed)');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Text Analysis Tool</h2>
      <textarea
        rows={8}
        cols={70}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste or type your text here..."
        style={{ marginTop: '1rem' }}
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>Analyze Text</button>
      {loading && <p>Analyzing...</p>}
      {analysis.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Analysis Summary</h3>
          <ul>
            {analysis.map((part, idx) => {
              const title = part.split('\n')[0].trim();
              return <li key={idx}><a href={`#part-${idx}`}>{title}</a></li>;
            })}
          </ul>
          {analysis.map((part, idx) => {
            const title = part.split('\n')[0].trim();
            return (
              <details key={idx} style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '0.5rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }} id={`part-${idx}`}>{title}</summary>
                <div style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>{part}</div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
