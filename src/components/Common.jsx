// Taiwan Decoration Elements Component
export const TaiwanDecorations = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Jade Mountain */}
      <div className="absolute top-10 right-10 text-8xl opacity-20 animate-float">🏔️</div>
      
      {/* Alishan Train */}
      <div className="absolute top-20 left-20 text-7xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>
        🚂
      </div>
      
      {/* Jiufen Lanterns */}
      <div className="absolute bottom-32 left-10 text-7xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        🏮
      </div>
      
      {/* Bubble Tea */}
      <div className="absolute bottom-20 right-32 text-7xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>
        🧋
      </div>
      
      {/* Taiwan Bear */}
      <div className="absolute top-1/3 right-20 text-7xl opacity-20 animate-float" style={{ animationDelay: '0.3s' }}>
        🐻
      </div>
      
      {/* Capybara Mascot */}
      <div className="absolute bottom-40 right-20 text-7xl opacity-20 animate-float" style={{ animationDelay: '1.2s' }}>
        🐹
      </div>
    </div>
  );
};

// Card Component
export const Card = ({ children, className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer hover:scale-105 ${className}`}
    >
      {children}
    </div>
  );
};

// Primary Button Component
export const PrimaryButton = ({ children, onClick, className = "", disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        backgroundColor: disabled ? '#ccc' : 'var(--primary, #2D5016)',
      }}
    >
      {children}
    </button>
  );
};

// Secondary Button Component
export const SecondaryButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-bold border-2 bg-white transition-all hover:scale-105 active:scale-95 ${className}`}
      style={{ borderColor: 'var(--primary, #2D5016)', color: 'var(--primary, #2D5016)' }}
    >
      {children}
    </button>
  );
};

// Badge Component
export const Badge = ({ icon, text, className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white text-center ${className}`}
      style={{ backgroundColor: 'var(--primary, #2D5016)' }}>
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </div>
  );
};
