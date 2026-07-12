export default function EmptyState({
  title = 'Nothing here',
  subtitle = '',
  icon = '📭',
  actionLabel = null,
  onAction = null,
  children = null,
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '72px 24px',
      gap: 14,
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 52,
        lineHeight: 1,
        marginBottom: 4,
        filter: 'drop-shadow(0 4px 12px rgba(249,115,22,0.15))',
      }}>
        {icon}
      </div>
      <h3 style={{ color: '#e2e8f0', fontSize: 19, fontWeight: 700, margin: 0 }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{ color: '#94a3b8', fontSize: 14, maxWidth: 360, margin: 0, lineHeight: 1.5 }}>
          {subtitle}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-primary"
          style={{
            marginTop: 8,
            padding: '9px 20px',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
          }}
        >
          {actionLabel}
        </button>
      )}
      {children}
    </div>
  );
}
