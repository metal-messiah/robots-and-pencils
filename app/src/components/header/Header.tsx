import React from 'react';
import './Header.css';
import '../../styles/sizers.css';

/* forms header bar, aligns with RocketComponent(s) */
const HeaderComponent: React.FC<any> = () => {
  return (
    <div className="header">
      <div className="small">Badge</div>
      <div className="medium">Rocket Name</div>
      <div className="medium">Rocket Type</div>
      <div className="medium">Launch Date</div>
      <div className="large">Details</div>
      <div className="small">ID</div>
      <div className="small">Article</div>
    </div>
  );
};

export default HeaderComponent;
