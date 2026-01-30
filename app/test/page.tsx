export default function TestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Test Page</h1>
      <p>If you can see this, the app is working.</p>
      <div style={{ marginTop: '2rem' }}>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Go to Home</a>
        <br />
        <a href="/platform/dashboard" style={{ color: 'blue', textDecoration: 'underline' }}>Go to Dashboard</a>
      </div>
    </div>
  );
}
