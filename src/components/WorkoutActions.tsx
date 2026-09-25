'use client';

import React from 'react';
import { usePlan, Workout } from '@/context/PlanContext';
import { CalendarPlus, Bookmark } from 'lucide-react';

const WorkoutActions = ({ workout }: { workout: Workout }) => {
    const { plan, addToPlan, addToSaved } = usePlan();

    const handleAddToPlan = () => {
        addToPlan(workout);
        // Toast placeholder — see note below on adding a toast library
        alert("Added to today's plan");
    };

    const handleSave = () => {
        addToSaved(workout);
        alert('Saved for later');
    };

    const planFull = plan.length >= 5 && !plan.some((w) => w.id === workout.id);

    return (
        <div className="flex gap-3 mt-6">
            <button
                onClick={handleAddToPlan}
                disabled={planFull}
                className="btn bg-[#C2F800] text-black disabled:opacity-40"
            >
                <CalendarPlus size={18} />
                Add to today's plan
            </button>
            <button onClick={handleSave} className="btn btn-outline">
                <Bookmark size={18} />
                Save for later
            </button>
        </div>
    );
};

export default WorkoutActions;