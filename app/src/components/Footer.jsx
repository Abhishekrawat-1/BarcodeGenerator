// Footer.js
import React from 'react';
import DateTime from './DateTime';
import '../scss/footer.scss';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p >App created by <a href="https://rwtron.in" target="_blank" rel="noopener noreferrer" style={styleAtag}>rwtron.in {<DateTime />}</a></p>
    </footer>
  );
};

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height:'fit-content',
  textAlign: 'center',
  padding: '10px',
  backgroundColor: '#f1f1f1',
  borderTop: '1px solid #e1e1e1',
  zIndex: '100'
};


const styleAtag = {
  color: 'blue',
  textDecoration: 'none',
  margin: '0.5rem auto',

}
export default Footer;
