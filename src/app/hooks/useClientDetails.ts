'use client';

import { useEffect, useId, useRef } from 'react';

export function useClientDetails() {
    const detailsRef = useRef<HTMLDetailsElement | null>(null);
    const detailsID = useId();

    useEffect(() => {
        const closeDetails = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const details = detailsRef.current;

            if (details && details.open) {
                const stillMatch =
                    target &&
                    !target.matches(`#${detailsID}`) &&
                    !target.matches(`#${detailsID} summary`) &&
                    !target.matches(`#${detailsID} li`) &&
                    !target.matches(`#${detailsID} li a`);

                if (stillMatch) {
                    details.removeAttribute('open');
                }
            }
        };

        document.addEventListener('click', closeDetails);
        document.addEventListener('mouseover', closeDetails);

        return () => {
            document.removeEventListener('click', closeDetails);
            document.removeEventListener('mouseover', closeDetails);
        };
    }, [detailsID]);

    return { detailsID, detailsRef };
}
