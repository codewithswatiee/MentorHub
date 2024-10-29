import React from 'react';

function HighlightText({ text, color }) {
  return <span className={`${color} font-bold`}> {text}</span>;
}

export default HighlightText;
