// src/pages/Contact.tsx

function Contact() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Contact</h1>

      <div style={{ width: '100%', height: '100vh', minHeight: '800px' }}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSf7lwBOj7TQC-0Xa2d4sI4_jzv271RgdcyeMuW6U0Fqq5fBxA/viewform?embedded=true"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="Contact Form"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}

export default Contact;
