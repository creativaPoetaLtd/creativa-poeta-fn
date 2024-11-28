import React, { useState, useEffect } from 'react';

interface TypewriterLabelProps {
  text: string;
  className?: string;
}

const Typewriter: React.FC<TypewriterLabelProps> = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setIsTypingComplete(true);
        }, 500);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <label className={`block text-lg font-semibold text-white relative ${className}`}>
      <span className="break-words whitespace-normal">{displayText}</span>
      {!isTypingComplete && (
        <span className="absolute right-0 top-0 animate-blink"></span>
      )}
    </label>
  );
};

export default Typewriter;