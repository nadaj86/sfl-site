import React, { useState, useEffect } from 'react';
import { ArrowLeft, Maximize2, Loader2, Info } from 'lucide-react';

interface ImageAnalysisProps {
  imageUrl: string;
  onReset: () => void;
}

const metafunctions = [
  {
    id: 'ideational',
    title: '1. Ideational Metafunction',
    description: 'Representational Meaning: What is depicted in the image?',
    explanation: 'The Ideational Metafunction analyzes how the image represents experiences and ideas through narrative and conceptual structures.',
    sections: [
      { key: 'narrative', title: 'Narrative Representation', description: '' },
      { key: 'conceptual', title: 'Conceptual Representation', description: '' }
    ]
  },
  {
    id: 'interpersonal',
    title: '2. Interpersonal Metafunction',
    description: '',
    explanation: '',
    sections: [
      { key: 'contact', title: 'Contact & Social Distance', description: '' },
      { key: 'perspective', title: 'Point of View & Angle', description: '' },
      { key: 'modality', title: 'Visual Modality', description: '' }
    ]
  },
  {
    id: 'textual',
    title: '3. Textual Metafunction',
    description: '',
    explanation: '',
    sections: [
      { key: 'information', title: 'Information Value', description: '' },
      { key: 'salience', title: 'Salience & Framing', description: '' },
      { key: 'multimodal', title: 'Multimodal Integration', description: '' }
    ]
  }
];

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ imageUrl, onReset }) => {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{ [key: string]: { [key: string]: string } }>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeImage = async () => {
      setIsAnalyzing(true);
      setError(null);
      try {
        const base64 = imageUrl.replace(/^data:image\/[^;]+;base64,/, '');

        const response = await fetch('/.netlify/functions/analyzeImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64 })
        });

        const result = await response.json();
        const analysisText = result.analysis || '';

        const extractSection = (text: string, startMarker: string, endMarker: string | null) => {
          const start = text.indexOf(startMarker);
          if (start === -1) return '';
          const contentStart = start + startMarker.length;
          const end = endMarker ? text.indexOf(endMarker, contentStart) : text.length;
          return text.substring(contentStart, end === -1 ? text.length : end).trim();
        };

        const sections = {
          ideational: {
            narrative: extractSection(analysisText, '1.1.', '1.2.'),
            conceptual: extractSection(analysisText, '1.2.', '2.')
          },
          interpersonal: {
            contact: extractSection(analysisText, '2.1.', '2.2.'),
            perspective: extractSection(analysisText, '2.2.', '2.3.'),
            modality: extractSection(analysisText, '2.3.', '3.')
          },
          textual: {
            information: extractSection(analysisText, '3.1.', '3.2.'),
            salience: extractSection(analysisText, '3.2.', '3.3.'),
            multimodal: extractSection(analysisText, '3.3.', null)
          }
        };

        setAnalysis(sections);
      } catch (err: any) {
        console.error('❌ Image analysis error:', err);
        setError(err.message || 'Analysis failed.');
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeImage();
  }, [imageUrl]);

  const renderAnalysisSection = (title: string, content: string) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
      {content ? (
        <div className="prose text-gray-700 whitespace-pre-line leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <button onClick={onReset} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Upload Different Image
            </button>
            <button onClick={() => setIsImageEnlarged(!isImageEnlarged)} className="text-gray-600 hover:text-gray-900">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          <div className={`relative ${isImageEnlarged ? 'fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center' : ''}`}>
            <img
              src={imageUrl}
              alt="Uploaded image"
              className={`rounded-lg ${isImageEnlarged ? 'max-h-screen max-w-full object-contain cursor-pointer' : 'w-full h-auto'}`}
              onClick={() => isImageEnlarged && setIsImageEnlarged(false)}
            />
          </div>
        </div>

        <div className="lg:w-1/2 p-6 overflow-y-auto max-h-screen">
          {error ? (
            <div className="text-red-500 p-4 rounded-lg bg-red-50">{error}</div>
          ) : isAnalyzing ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-gray-600">Analyzing image using SFL framework...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {metafunctions.map((meta) => (
                <div key={meta.id}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{meta.title}</h3>
                    <button
                      onClick={() => setShowExplanation(showExplanation === meta.id ? null : meta.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                  {showExplanation === meta.id && (
                    <div className="p-4 bg-blue-50 rounded border text-blue-800 mb-4">
                      <p>{meta.explanation}</p>
                    </div>
                  )}
                  {meta.sections.map((section) =>
                    renderAnalysisSection(section.title, analysis[meta.id]?.[section.key] || '')
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysis;
