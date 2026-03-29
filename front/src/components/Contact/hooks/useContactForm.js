import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const STORAGE_KEY = 'contactFormDraft';

export function useContactForm() {
    // 1. Ленивая инициализация: при первой загрузке достаем данные из хранилища
    const [fields, setFields] = useState(() => {
        try {
            const savedFields = localStorage.getItem(STORAGE_KEY);
            return savedFields ? JSON.parse(savedFields) : { name: '', email: '', message: '' };
        } catch (error) {
            console.error("Ошибка при чтении из localStorage", error);
            return { name: '', email: '', message: '' };
        }
    });

    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    // 2. Эффект: при любом изменении полей сохраняем их в localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
    }, [fields]);

    const handleChange = (e) => {
        setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: fields.name,
                    email: fields.email,
                    message: fields.message,
                    title: fields.name, // Используем имя в качестве заголовка, как было у тебя
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setStatus('success');

            // 3. После успешной отправки очищаем форму и удаляем черновик из памяти
            setFields({ name: '', email: '', message: '' });
            localStorage.removeItem(STORAGE_KEY);

        } catch (err) {
            console.error('Ошибка отправки EmailJS:', err);
            setStatus('error');
        }

        setTimeout(() => setStatus('idle'), 3000);
    };

    return { fields, status, handleChange, handleSubmit };
}