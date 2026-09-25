'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';
import { Clock, Flame, Star, Check, X, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

type SortOption = 'duration' | 'calories' | 'rating';

export default function MyPlanPage() {
    const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = usePlan();
    const [tab, setTab] = useState<'plan' | 'saved'>('plan');
    const [sortBy, setSortBy] = useState<SortOption>('duration');

    const rawList = tab === 'plan' ? plan : saved;

    const list = useMemo(() => {
        const sorted = [...rawList];
        switch (sortBy) {
            case 'duration':
                return sorted.sort((a, b) => a.duration - b.duration);
            case 'calories':
                return sorted.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating); // highest rating first
            default:
                return sorted;
        }
    }, [rawList, sortBy]);

    const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

    const handleMarkDone = (id: number, name: string) => {
        markAsDone(id);
        toast.success(`${name} marked as done!`);
    };

    const handleRemove = (id: number, name: string) => {
        if (tab === 'plan') {
            removeFromPlan(id);
        } else {
            removeFromSaved(id);
        }
        toast(`${name} removed`, { icon: '🗑️' });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-extrabold uppercase">My Plan</h1>
            <p className="text-neutral-content/60 mt-1">
                Cap of five lifts for today. Finish them, then load more.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-6 bg-neutral rounded-2xl p-6">
                <div>
                    <p className="text-sm text-neutral-content/60">Exercises</p>
                    <p className="text-3xl font-bold text-[#C2F800]">{plan.length}</p>
                </div>
                <div>
                    <p className="text-sm text-neutral-content/60">Minutes</p>
                    <p className="text-3xl font-bold">{totalMinutes}</p>
                </div>
                <div>
                    <p className="text-sm text-neutral-content/60">Calories</p>
                    <p className="text-3xl font-bold">{totalCalories}</p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className="tabs tabs-boxed w-fit bg-neutral">
                    <button
                        className={`tab ${tab === 'plan' ? 'tab-active' : ''}`}
                        onClick={() => setTab('plan')}
                    >
                        Today's Plan
                    </button>
                    <button
                        className={`tab ${tab === 'saved' ? 'tab-active' : ''}`}
                        onClick={() => setTab('saved')}
                    >
                        Saved
                    </button>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-content/60">Sort By</span>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-sm bg-neutral border-white/10 gap-1">
                            {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                            <ChevronDown size={14} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-neutral rounded-box z-10 w-40 p-2 shadow border border-white/10 mt-1">
                            <li><button onClick={() => setSortBy('duration')}>Duration</button></li>
                            <li><button onClick={() => setSortBy('calories')}>Calories</button></li>
                            <li><button onClick={() => setSortBy('rating')}>Rating</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-4 border border-white/10 rounded-2xl min-h-[300px] flex items-center justify-center">
                {list.length === 0 ? (
                    <div className="text-center py-16">
                        <h2 className="font-bold uppercase">Nothing here yet</h2>
                        <p className="text-neutral-content/60 mt-1">
                            Browse the library and add a lift to get today moving.
                        </p>
                        <Link href="/" className="btn bg-[#C2F800] text-black rounded-full mt-4">
                            Go to workouts
                        </Link>
                    </div>
                ) : (
                    <div className="w-full p-4 space-y-3">
                        {list.map((workout) => (
                            <div
                                key={workout.id}
                                className="flex items-center justify-between bg-neutral rounded-xl p-3"
                            >
                                <div>
                                    <p className="font-bold uppercase">{workout.name}</p>
                                    <p className="text-sm text-neutral-content/60">{workout.equipment}</p>
                                    <div className="flex gap-3 mt-1 text-xs text-neutral-content/70">
                                        <span className="flex items-center gap-1"><Clock size={14} />{workout.duration} min</span>
                                        <span className="flex items-center gap-1"><Flame size={14} />{workout.caloriesBurned} kcal</span>
                                        <span className="flex items-center gap-1"><Star size={14} />{workout.rating}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/workouts/${workout.id}`} className="btn btn-sm btn-outline">
                                        View Details
                                    </Link>
                                    {tab === 'plan' && (
                                        <button
                                            onClick={() => handleMarkDone(workout.id, workout.name)}
                                            className="btn btn-sm btn-ghost"
                                        >
                                            <Check size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleRemove(workout.id, workout.name)}
                                        className="btn btn-sm btn-ghost"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}