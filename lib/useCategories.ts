'use client';

import * as React from 'react';
export interface Category {
    id: string;
    name: string;
    parent_id: string | null;
}

export function useCategories() {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [loading, setLoading] = React.useState(true);

    const fetchCategories = React.useCallback(async () => {
        setLoading(true);
        const res = await fetch('/api/categories', { method: 'GET' });
        const data = await res.json().catch(() => []);
        if (res.ok) {
            setCategories((data ?? []) as Category[]);
        } else {
            setCategories([]);
        }
        setLoading(false);
    }, []);

    React.useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, loading, refresh: fetchCategories };
}
