import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const STORAGE_KEY = 'contactFormDraft';

export function useContactForm() {
    const [fields, setFields] = useState(() => {
        try {
            const savedFields = localStorage.getItem(STORAGE_KEY);
            return savedFields ? JSON.parse(savedFields) : { name: '', email: '', message: '' };
        } catch (error) {
            console.error("Ошибка при чтении из localStorage", error);
            return { name: '', email: '', message: '' };
        }
    });

    const [status, setStatus] = useState('idle');

    // 🔍 Лог переменных окружения при инициализации хука
    useEffect(() => {
        const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        console.group('📧 EmailJS ENV check');
        console.log('MODE:', import.meta.env.MODE);
        console.log('VITE_EMAILJS_SERVICE_ID:',  serviceId  ? `✅ "${serviceId}"`          : '❌ undefined');
        console.log('VITE_EMAILJS_TEMPLATE_ID:', templateId ? `✅ "${templateId}"`         : '❌ undefined');
        console.log('VITE_EMAILJS_PUBLIC_KEY:',  publicKey  ? `✅ "${publicKey.slice(0,4)}…"` : '❌ undefined');
        console.groupEnd();
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
    }, [fields]);

    const handleChange = (e) => {
        setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        // 🔍 Лог перед отправкой
        console.group('📤 EmailJS sendAttempt');
        console.log('serviceId:',  serviceId  ?? '❌ MISSING');
        console.log('templateId:', templateId ?? '❌ MISSING');
        console.log('publicKey:',  publicKey  ? publicKey.slice(0, 4) + '…' : '❌ MISSING');
        console.log('payload:', {
            name:    fields.name,
            email:   fields.email,
            message: fields.message.slice(0, 30) + '…',
        });
        console.groupEnd();

        // 🔍 Стоп если хоть одна переменная отсутствует
        if (!serviceId || !templateId || !publicKey) {
            console.error('❌ EmailJS: одна или несколько ENV-переменных не определены. Отправка прервана.');
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        try {
            const result = await emailjs.send(
                serviceId,
                templateId,
                {
                    name:    fields.name,
                    email:   fields.email,
                    message: fields.message,
                    title:   fields.name,
                },
                publicKey
            );

            // 🔍 Лог успешного ответа
            console.log('✅ EmailJS success:', result.status, result.text);
            setStatus('success');
            setFields({ name: '', email: '', message: '' });
            localStorage.removeItem(STORAGE_KEY);

        } catch (err) {
            // 🔍 Детальный лог ошибки
            console.group('❌ EmailJS error');
            console.error('message:', err?.message);
            console.error('status:',  err?.status);
            console.error('text:',    err?.text);
            console.error('full:',    err);
            console.groupEnd();

            setStatus('error');
        }

        setTimeout(() => setStatus('idle'), 3000);
    };

    return { fields, status, handleChange, handleSubmit };
}