import React from 'react';

// Ini adalah komponen Button sederhana yang meniru gaya Anda
export function Button({ className, children, ...props }) {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    
    // Gabungkan kelas dasar dengan kelas yang diberikan dari props
    const combinedClasses = `${baseClasses} ${className}`;

    return (
        <button className={combinedClasses} {...props}>
        {children}
        </button>
    );
}