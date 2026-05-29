export function BackgroundLayer({ src }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)',
        }}
      />
    </div>
  );
}
