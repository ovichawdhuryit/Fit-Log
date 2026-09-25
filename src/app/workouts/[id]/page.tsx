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

async function getWorkout(id: string): Promise<Workout> {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch workout');
    }

    return res.json();
}

export default async function WorkoutDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const workout = await getWorkout(id);

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
            {/* Left: image */}
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                {/* Use next/image here once domain is confirmed working */}
                <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right: details */}
            <div>
                <h1 className="text-3xl font-extrabold uppercase">{workout.name}</h1>
                <p className="mt-2 text-neutral-content/70">{workout.description}</p>

                <div className="flex gap-2 mt-4">
                    {workout.muscleGroups.map((group) => (
                        <span
                            key={group}
                            className="badge bg-[#C2F800] text-black font-semibold"
                        >
                            {group.toUpperCase()}
                        </span>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-neutral-content/60">EQUIPMENT</span>
                    <span>{workout.equipment}</span>

                    <span className="text-neutral-content/60">DIFFICULTY</span>
                    <span>{workout.difficulty}</span>

                    <span className="text-neutral-content/60">SETS</span>
                    <span>{workout.sets}</span>

                    <span className="text-neutral-content/60">REPS</span>
                    <span>{workout.reps}</span>

                    <span className="text-neutral-content/60">DURATION</span>
                    <span>{workout.duration} min</span>

                    <span className="text-neutral-content/60">CALORIES</span>
                    <span>{workout.caloriesBurned} kcal</span>

                    <span className="text-neutral-content/60">RATING</span>
                    <span>{workout.rating}</span>
                </div>

                <h2 className="mt-8 font-bold uppercase">Instructions</h2>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                    {workout.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ol>

                <div className="flex gap-3 mt-6">
                    <button className="btn bg-[#C2F800] text-black">
                        Add to today's plan
                    </button>
                    <button className="btn btn-outline">Save for later</button>
                </div>
            </div>
        </div>
    );
}