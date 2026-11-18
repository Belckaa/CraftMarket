const scenarios = [
  { label: 'HTTP 500', url: '/?error=500' },
  { label: 'Обрив мережі', url: '/?error=network' },
  { label: 'Порожній каталог/категорії', url: '/?empty=true' },
  { label: 'Затримка 3с', url: '/?delay=3000' },
  { label: 'Скинути (успіх)', url: '/' },
]

export default function DevMockPanel() {
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, background: '#ef4444', color: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
      <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>ТЕСТУВАННЯ</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {scenarios.map(({ label, url }) => (
          <button 
            key={label} 
            type="button" 
            onClick={() => { window.location.href = url }} 
            style={{ background: 'white', color: 'black', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
