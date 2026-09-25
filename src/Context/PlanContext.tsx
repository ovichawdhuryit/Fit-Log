'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Workout = {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
    done?: boolean;
};

type PlanContextType = {
    plan: Workout[];
    saved: Workout[];
    addToPlan: (workout: Workout) => void;
    addToSaved: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;
    removeFromSaved: (id: number) => void;
    markAsDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [hydrated, setHydrated] = useState(false);

    // Load from localStorage on first mount
    useEffect(() => {
        const storedPlan = localStorage.getItem('fitlog-plan');
        const storedSaved = localStorage.getItem('fitlog-saved');
        if (storedPlan) setPlan(JSON.parse(storedPlan));
        if (storedSaved) setSaved(JSON.parse(storedSaved));
        setHydrated(true);
    }, []);

    // Persist to localStorage whenever plan/saved changes (after initial hydration)
    useEffect(() => {
        if (hydrated) localStorage.setItem('fitlog-plan', JSON.stringify(plan));
    }, [plan, hydrated]);

    useEffect(() => {
        if (hydrated) localStorage.setItem('fitlog-saved', JSON.stringify(saved));
    }, [saved, hydrated]);

    const addToPlan = (workout: Workout) => {
        setPlan((prev) => {
            if (prev.some((w) => w.id === workout.id)) return prev; // no duplicates
            if (prev.length >= 5) return prev; // cap of 5, per your spec
            return [...prev, workout];
        });
    };

    const addToSaved = (workout: Workout) => {
        setSaved((prev) => {
            if (prev.some((w) => w.id === workout.id)) return prev;
            return [...prev, workout];
        });
    };

    const removeFromPlan = (id: number) => {
        setPlan((prev) => prev.filter((w) => w.id !== id));
    };

    const removeFromSaved = (id: number) => {
        setSaved((prev) => prev.filter((w) => w.id !== id));
    };

    const markAsDone = (id: number) => {
        setPlan((prev) =>
            prev.map((w) => (w.id === id ? { ...w, done: true } : w))
        );
    };

    return (
        <PlanContext.Provider
            value={{ plan, saved, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markAsDone }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error('usePlan must be used within a PlanProvider');
    }
    return context;
};