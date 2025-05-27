// src/pages/Contact.tsx

function Contact() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Contact</h1>
    
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSf7lwBOj7TQC-0Xa2d4sI4_jzv271RgdcyeMuW6U0Fqq5fBxA/viewform?embedded=true"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Contact Form"
      >
        Loading…
      </iframe>
    </div>
  );
}

export default Contact;
