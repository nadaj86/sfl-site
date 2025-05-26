// src/pages/Contact.tsx

import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch('/.netlify/functions/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('Failed to send');

    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  } catch (err) {
    alert('Something went wrong sending the message.');
  }
};
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1>Contact Us</h1>
      <p>If you have any questions or feedback, feel free to get in touch!</p>

      <p><strong>Name:</strong> Nada AlJamal</p>
      <p><strong>Email:</strong> aljamalnh@gmail.com</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <label>Name</label><br />
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        /><br />

        <label>Email</label><br />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        /><br />

        <label>Message</label><br />
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        /><br />

        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Send Message
        </button>
      </form>

      {submitted && <p style={{ color: 'green', marginTop: '1rem' }}>Message sent! Thank you.</p>}
    </div>
  );
}

export default Contact;
