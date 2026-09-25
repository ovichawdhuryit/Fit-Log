'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';
import { Clock, Flame, Star, Check, X } from 'lucide-react';

export default function MyPlanPage() {
    const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = usePlan();
    const [tab, setTab] = useState<'plan' | 'saved'>('plan');

    const list = tab === 'plan' ? plan : saved;

    const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-extrabold uppercase">My Plan</h1>
            <p className="text-neutral-content/60 mt-1">
                Cap of five lifts for today. Finish them, then load more.
            </p>

            {/* Metrics row */}
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

            {/* Tabs */}
            <div className="tabs tabs-boxed w-fit mt-6 bg-neutral">
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

            {/* List / empty state */}
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
                                        <button onClick={() => markAsDone(workout.id)} className="btn btn-sm btn-ghost">
                                            <Check size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            tab === 'plan' ? removeFromPlan(workout.id) : removeFromSaved(workout.id)
                                        }
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