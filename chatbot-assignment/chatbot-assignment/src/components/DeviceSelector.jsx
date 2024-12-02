import React from 'react';
import { FaMobile, FaTabletAlt, FaLaptop } from 'react-icons/fa';

const DeviceSelector = ({ activeDevice, onDeviceChange }) => {
  return (
    <div className="device-selector">
      <button 
        className={`device-btn ${activeDevice === 'mobile' ? 'active' : ''}`}
        onClick={() => onDeviceChange('mobile')}
        title="View mobile layout (360px)"
      >
        <FaMobile /> Mobile
      </button>
      <button 
        className={`device-btn ${activeDevice === 'tablet' ? 'active' : ''}`}
        onClick={() => onDeviceChange('tablet')}
        title="View tablet layout (768px)"
      >
        <FaTabletAlt /> Tablet
      </button>
      <button 
        className={`device-btn ${activeDevice === 'laptop' ? 'active' : ''}`}
        onClick={() => onDeviceChange('laptop')}
        title="View laptop layout (1024px)"
      >
        <FaLaptop /> Laptop
      </button>
    </div>
  );
};

export default DeviceSelector; 