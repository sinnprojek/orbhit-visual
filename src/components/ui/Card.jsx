// src/components/ui/Card.jsx

import React from 'react';

// Komponen Card utama
export function Card({ className, children, ...props }) {
    return (
        <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`} {...props}>
        {children}
        </div>
    );
}

// Komponen CardContent (sudah ada)
export function CardContent({ className, children, ...props }) {
    return (
        <div className={`p-6 pt-0 ${className}`} {...props}>
        {children}
        </div>
    );
}

// ==========================================================
// TAMBAHKAN DUA KOMPONEN BARU DI BAWAH INI
// ==========================================================

// Komponen CardHeader (BARU)
export function CardHeader({ className, children, ...props }) {
    return (
        <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
        {children}
        </div>
    );
}

// Komponen CardTitle (BARU)
export function CardTitle({ className, children, ...props }) {
    return (
        <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
        {children}
        </h3>
    );
}