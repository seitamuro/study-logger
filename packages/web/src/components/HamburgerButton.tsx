export interface HamburgerButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const HamburgerButton = ({ onClick, isOpen }: HamburgerButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'white',
        border: 'none',
        cursor: 'pointer',
        padding: '10px'
      }}
    >
      <div style={{
        width: '25px',
        height: '20px',
        position: 'relative',
        transform: isOpen ? 'rotate(45deg)' : 'none',
        transition: 'transform 0.3s ease'
      }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              position: 'absolute',
              height: '2px',
              width: '100%',
              background: '#333',
              borderRadius: '2px',
              opacity: isOpen && i === 1 ? 0 : 1,
              top: `${i * 8}px`,
              transform: isOpen
                ? i === 0
                  ? 'rotate(0deg) translateY(8px)'
                  : i === 2
                    ? 'rotate(-90deg) translateX(-8px)'
                    : 'none'
                : 'none',
              transition: 'transform 0.3s ease, opacity 0.3s ease'
            }}
          />
        ))}
      </div>
    </button>
  );
};
