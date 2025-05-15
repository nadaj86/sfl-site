// src/App.tsx

import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import OpenAI from 'openai';
import logo from './assets/logo.png';

function App() {
  useEffect(() => {
    document.title = 'SFL Insights';
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '1rem' }} />
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>by Nada AlJamal</h1>
      </header>

      <nav style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/text-framework" style={{ marginRight: '1rem' }}>Text Analysis Framework</Link>
        <Link to="/image-framework" style={{ marginRight: '1rem' }}>Image Analysis Framework</Link>
        <Link to="/image-analysis" style={{ marginRight: '1rem' }}>Image Tool</Link>
        <Link to="/text-analysis">Text Tool</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text-framework" element={<TextFramework />} />
        <Route path="/image-framework" element={<ImageFramework />} />
        <Route path="/image-analysis" element={<ImageTool />} />
        <Route path="/text-analysis" element={<TextTool />} />
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
      <p>
        This tool performs comprehensive linguistic analysis based on the SFL framework established by Halliday and Matthiessen (2014) and enriched by the Appraisal theory from Martin and White (2005). It examines your text through:
      </p>
      <ul>
        <li>Ideational Metafunction (experiential and logical meanings)</li>
        <li>Interpersonal Metafunction (mood, modality, appraisal)</li>
        <li>Textual Metafunction (theme/rheme, cohesion, nominalization, and more)</li>
      </ul>
      <p>
        Each analysis provides rich linguistic tagging and detailed commentary to help you understand how language constructs meaning.
      </p>

      <h2>🖼️ SFL Image Analysis Tool</h2>
      <p>
        Based on the visual grammar framework of Kress and van Leeuwen (2001), this tool allows you to analyze the meaning-making structures in images. It explores:
      </p>
      <ul>
        <li>Representational meanings (narrative and conceptual structures)</li>
        <li>Interpersonal meanings (gaze, size, angle, and social distance)</li>
        <li>Compositional meanings (information value, salience, and framing)</li>
      </ul>
      <p>
        This tool supports educators, designers, and researchers in uncovering the communicative functions embedded in visuals.
      </p>

      <h3>🔒 Your Privacy Matters</h3>
      <p>
        Kindly note that none of the submitted texts or images are stored or saved. All analyses are processed securely and anonymously to protect your privacy.
      </p>
    </div>
  );
}

function TextFramework() {
  return <div><h2>SFL Text Analysis Framework</h2><p>Coming soon…</p></div>;
}

function ImageFramework() {
  return <div><h2>SFL Image Analysis Framework</h2><p>Coming soon…</p></div>;
}

function ImageTool() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setAnalysis(null);
    }
  }

  async function handleSubmit() {
    if (!image) return alert('Please upload an image first.');

    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64 = reader.result?.toString().split(',')[1];
      try {
        const response = await fetch('/.netlify/functions/analyzeImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64 }),
        });
        const data = await response.json();
        setAnalysis(data.analysis);
      } catch {
        alert('Something went wrong');
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
      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>Analyze Image</button>
      {loading && <p>Analyzing...</p>}
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

      const prompt = `You are an expert in Systemic Functional Linguistics (SFL)...\nText:\n\"\"\"${input}\"\"\"`;
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
