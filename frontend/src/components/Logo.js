import React from 'react'

const Logo = ({w,h}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60">
    <rect width="120" height="60" fill="white"/>
    <g id="cart" transform="translate(10, 5)">
      <path d="M10 10 H80 L75 40 H20 Z" fill="#00BFFF" stroke="#000" stroke-width="2" rx="5" ry="5">
        <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0,0; 0,-5; 0,0" dur="0.5s" repeatCount="indefinite" keyTimes="0;0.5;1" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1"/>
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="0; 5; -5; 0" dur="1.5s" repeatCount="indefinite" additive="sum"/>
        <animate attributeName="fill" values="#00BFFF;#1E90FF;#00BFFF;#00BFFF" dur="1s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" attributeType="XML" type="scale" values="1; 1.05; 1" dur="0.5s" repeatCount="indefinite"/>
      </path>
  
      <circle cx="25" cy="45" r="5" fill="#000">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 25 45" to="360 25 45" dur="0.5s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" attributeType="XML" type="scale" values="1; 1.2; 1" dur="0.5s" repeatCount="indefinite"/>
        <animate attributeName="fill" values="#000;#696969;#000" dur="1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="65" cy="45" r="5" fill="#000">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 65 45" to="360 65 45" dur="0.5s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" attributeType="XML" type="scale" values="1; 1.2; 1" dur="0.5s" repeatCount="indefinite"/>
        <animate attributeName="fill" values="#000;#696969;#000" dur="1s" repeatCount="indefinite"/>
      </circle>
  
      <line x1="10" y1="10" x2="5" y2="2" stroke="#000" stroke-width="2">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="0 5 2; 10 5 2; 0 5 2" dur="0.5s" repeatCount="indefinite" keyTimes="0;0.5;1" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1" additive="sum"/>
        <animateTransform attributeName="transform" attributeType="XML" type="scale" values="1; 1.1; 1" dur="0.5s" repeatCount="indefinite"/>
        <animate attributeName="stroke" values="#000;#696969;#000" dur="1s" repeatCount="indefinite"/>
      </line>
      <line x1="80" y1="10" x2="85" y2="2" stroke="#000" stroke-width="2">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="0 85 2; -10 85 2; 0 85 2" dur="0.5s" repeatCount="indefinite" keyTimes="0;0.5;1" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1" additive="sum"/>
        <animateTransform attributeName="transform" attributeType="XML" type="scale" values="1; 1.1; 1" dur="0.5s" repeatCount="indefinite"/>
        <animate attributeName="stroke" values="#000;#696969;#000" dur="1s" repeatCount="indefinite"/>
      </line>
  
      <line x1="35" y1="40" x2="35" y2="25" stroke="#000" stroke-width="2">
        <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0,0; 0,5; 0,0" dur="0.5s" repeatCount="indefinite" keyTimes="0;0.5;1" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1"/>
        <animateTransform attributeName="transform" attributeType="XML" type="scale" values="1; 1.1; 1" dur="0.5s" repeatCount="indefinite"/>
        <animate attributeName="stroke" values="#000;#696969;#000" dur="1s" repeatCount="indefinite"/>
      </line>
      <line x1="55" y1="40" x2="55" y2="25" stroke="#000" stroke-width="2">
        <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0,0; 0,5; 0,0" dur="0.5s" repeatCount="indefinite" keyTimes="0;0.5;1" keySplines="0.42,0,0.58,1; 0.42,0,0.58,1"/>
        <animateTransform attributeName="transform" attributeType="XML" type="scale" values="1; 1.1; 1" dur="0.5s" repeatCount="indefinite"/>
        <animate attributeName="stroke" values="#000;#696969;#000" dur="1s" repeatCount="indefinite"/>
      </line>
    </g>
  </svg>
  
  )
}

export default Logo