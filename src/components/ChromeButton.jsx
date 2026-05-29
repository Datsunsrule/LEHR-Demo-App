export function ChromeButton({ children, onClick, disabled, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden w-full py-4 px-6 rounded-xl font-bold text-base tracking-wide transition-all duration-200 ${
        disabled
          ? 'opacity-35 cursor-not-allowed'
          : 'cursor-pointer active:scale-[0.98]'
      } ${className}`}
      style={{
        background: disabled
          ? 'rgba(255,255,255,0.08)'
          : 'linear-gradient(180deg, #f04040 0%, #E32636 50%, #c41e2a 100%)',
        color: '#fff',
        boxShadow: disabled
          ? 'none'
          : '0 4px 20px rgba(227, 38, 54, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.boxShadow = '0 6px 24px rgba(227, 38, 54, 0.6), inset 0 1px 0 rgba(255,255,255,0.2)';
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.boxShadow = '0 4px 20px rgba(227, 38, 54, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)';
      }}
    >
      {/* top sheen */}
      {!disabled && (
        <span
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-xl"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
          }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}
