import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Logo import
import rodeologo from '../assets/rodeo.png';

const Welcome = () => {
  const navigate = useNavigate();
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    // Show the bottom panel after a delay to create the two-stage animation
    const timer = setTimeout(() => {
      setShowPanel(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        backgroundColor: '#E80B0B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Logo Section - centered in the upper portion */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingBottom: showPanel ? '80px' : '0',
          transition: 'padding-bottom 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <img
          src={rodeologo}
          alt="Rodeo Addis Restaurant"
          style={{
            width: '75%',
            maxWidth: '300px',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.15))',
          }}
        />
      </div>

      {/* Bottom Slide-Up Panel */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          transform: showPanel ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: '#1a1a1a',
            borderTopLeftRadius: '28px',
            borderTopRightRadius: '28px',
            padding: '32px 28px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* QR Icon + Welcome Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%',
              marginBottom: '28px',
            }}
          >
            {/* QR Icon */}
            <img
              src="/qr.svg"
              alt="QR Code"
              style={{
                width: '42px',
                height: '42px',
                marginTop: '2px',
                filter: 'brightness(0) invert(1)',
              }}
            />

            {/* Welcome Text */}
            <div>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1.2,
                  fontStyle: 'italic',
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                }}
              >
                Welcome
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)',
                  margin: '2px 0 0 0',
                  lineHeight: 1.4,
                }}
              >
                Scan. Browse. Enjoy,
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => navigate('/categories')}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#E80B0B',
              color: '#ffffff',
              fontSize: '17px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.5px',
              marginBottom: '16px',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            Continue
          </button>

          {/* No app download required */}
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              margin: 0,
              textAlign: 'center',
            }}
          >
            No app download required
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;