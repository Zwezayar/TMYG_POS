'use client';

import * as React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';

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
        const { data } = await supabaseClient
            .from('categories')
            .select('*')
            .order('name');
        setCategories((data ?? []) as Category[]);
        setLoading(false);
    }, []);

    React.useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, loading, refresh: fetchCategories };
}
