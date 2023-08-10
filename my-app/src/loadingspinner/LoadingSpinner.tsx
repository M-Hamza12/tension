import React from 'react';
import './spinner.css';

export default function LoadingSpinner() {
  return (
    <div className="sk-chase mx-auto absolute z-50">
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
    </div>
  );
}
