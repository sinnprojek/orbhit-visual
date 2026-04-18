// src/components/CustomCursor.jsx

import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        let moveTimeout;

        const updatePosition = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsMoving(true);
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => setIsMoving(false), 200); // Reset setelah 200ms tidak bergerak
        };

        window.addEventListener('mousemove', updatePosition);

        const handleMouseOver = () => setIsHovering(true);
        const handleMouseOut = () => setIsHovering(false);

        document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseover', handleMouseOver);
        el.addEventListener('mouseout', handleMouseOut);
        });

        return () => {
        window.removeEventListener('mousemove', updatePosition);
        document.querySelectorAll('a, button').forEach((el) => {
            el.removeEventListener('mouseover', handleMouseOver);
            el.removeEventListener('mouseout', handleMouseOut);
        });
        clearTimeout(moveTimeout);
        };
    }, []);

    const cursorClasses = `custom-cursor-wrapper ${isHovering ? 'hovering' : ''} ${isMoving ? 'moving' : ''}`;

    return (
        <div
        className={cursorClasses}
        style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
        }}
        >
        <div className="arrow-pointer">
            {/* SVG Panah */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0l24 12-5.455 3.03-8.545-8.545-3 8.545-2-1.5z"/>
            </svg>
        </div>
        <div className="star-dangle">
            {/* SVG Bintang */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.445l-7.416 4.968 1.48-8.279-6.064-5.828 8.332-1.151z"/>
            </svg>
        </div>
        </div>
    );
}