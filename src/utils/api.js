// src/utils/api.js

const BASE_URL = import.meta.env.VITE_API_URL;

// 🔐 Ambil admin password dari localStorage
const getAdminHeaders = () => {
    const password = localStorage.getItem('admin_password');
    return password ? { 'x-admin-password': password } : {};
};

// 📦 Handle response global
const handleResponse = async (res) => {
    if (!res.ok) {
        let message = 'Request failed';
        try {
            const data = await res.json();
            message = data.message || message;
        } catch {
            message = await res.text();
        }
        throw new Error(message);
    }
    return res.json();
};

// =======================
// 🔹 GET
// =======================
export const apiGet = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            ...getAdminHeaders(),
        },
    });
    return handleResponse(res);
};

// =======================
// 🔹 POST (JSON)
// =======================
export const apiPost = async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAdminHeaders(),
        },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
};

// =======================
// 🔹 PUT
// =======================
export const apiPut = async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAdminHeaders(),
        },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
};

// =======================
// 🔹 DELETE
// =======================
export const apiDelete = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            ...getAdminHeaders(),
        },
    });
    return handleResponse(res);
};

// =======================
// 🔹 UPLOAD (FORM DATA)
// =======================
export const apiUpload = async (endpoint, formData) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            ...getAdminHeaders(), // ❗ JANGAN pakai Content-Type
        },
        body: formData,
    });
    return handleResponse(res);
};