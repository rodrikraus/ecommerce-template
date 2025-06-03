import React from 'react';

export function TopBar() {
  const topBarStyle: React.CSSProperties = {
    backgroundColor: '#343a40', // A dark background color (Bootstrap's dark color)
    color: '#f8f9fa',          // Light text color
    padding: '8px 15px',
    display: 'flex',
    justifyContent: 'space-between', // Aligns items to start, center, end
    alignItems: 'center',
    fontSize: '0.9rem'
  };

  const socialLinkStyle: React.CSSProperties = {
    color: '#f8f9fa',
    textDecoration: 'none',
    margin: '0 10px',
  };

  const socialMediaContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };
  
  const whatsappStyle: React.CSSProperties = {
    color: '#25D366', // WhatsApp green
    textDecoration: 'none',
    margin: '0 10px',
    fontWeight: 'bold'
  };

  return (
    <div style={topBarStyle}>
      <div style={socialMediaContainerStyle}>
        {/* Placeholder for a logo or brand on the left if ever needed */}
        {/* <span style={{ marginRight: 'auto' }}></span>  */}
      </div>
      <div style={socialMediaContainerStyle}>
        <a href="#" style={socialLinkStyle} title="Facebook">[F]</a>
        <a href="#" style={socialLinkStyle} title="Instagram">[I]</a>
        <a href="#" style={socialLinkStyle} title="Twitter">[T]</a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" style={whatsappStyle} title="WhatsApp">
          [W] +12 345 67890
        </a>
      </div>
    </div>
  );
}
