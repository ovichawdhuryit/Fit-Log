import React from 'react';
import Card from './Card';

type Workout = {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    difficulty: string;
    duration: number;
    caloriesBurned: number;
    sets: number;
    reps: string;
    rating: number;
    description: string;
    instructions: string[];
};

async function getWorkouts(): Promise<Workout[]> {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch workouts');
    }

    return res.json();
}

const WorkoutList = async () => {
    const workouts = await getWorkouts();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {workouts.map((workout) => (
                <Card
                    key={workout.id}
                    id={workout.id}
                    name={workout.name}
                    image={workout.image}
                    muscleGroups={workout.muscleGroups}
                    equipment={workout.equipment}
                    duration={workout.duration}
                    caloriesBurned={workout.caloriesBurned}
                    rating={workout.rating}
                />
            ))}
        </div>
    );
};

export default WorkoutList;