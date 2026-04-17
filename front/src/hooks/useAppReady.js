import { useState, useEffect } from 'react';

export function useAppReady() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function waitForAssets() {
            try {
                await document.fonts.ready;
                const images = Array.from(document.images);
                const imagePromises = images.map((img) => {
                    if (img.complete) return Promise.resolve();

                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                });

                await Promise.all(imagePromises);

                await new Promise(res => setTimeout(res, 500));

            } catch (error) {
                console.error("Ошибка при проверке готовности ассетов:", error);
            } finally {
                if (isMounted) {
                    setIsReady(true);
                }
            }
        }

        setTimeout(waitForAssets, 0);

        return () => {
            isMounted = false;
        };
    }, []);

    return isReady;
}