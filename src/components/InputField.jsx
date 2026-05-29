export function InputField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#888]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#888] outline-none transition-all duration-200 focus:border-white/30"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onFocus={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.08)';
          e.target.style.border = '1px solid rgba(255,255,255,0.25)';
        }}
        onBlur={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.06)';
          e.target.style.border = '1px solid rgba(255,255,255,0.1)';
        }}
      />
    </div>
  );
}
