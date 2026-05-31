import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled render error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center" style={{ background: '#000' }}>
        <p className="text-2xl font-bold text-white">Something went wrong</p>
        <p className="text-sm text-[#c2c2c2] max-w-sm">
          The demo hit an unexpected error. Reloading should get you back to the start.
        </p>
        <button
          onClick={() => { window.location.href = import.meta.env.BASE_URL; }}
          className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
          style={{ background: 'linear-gradient(180deg, #f04040 0%, #E32636 50%, #c41e2a 100%)' }}
        >
          Reload demo
        </button>
      </div>
    );
  }
}
