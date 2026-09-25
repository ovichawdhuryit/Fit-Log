import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react';

type CardProps = {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
};

const Card = ({
    id,
    name,
    image,
    muscleGroups,
    equipment,
    duration,
    caloriesBurned,
    rating,
}: CardProps) => {
    return (

        
        <Link
            href={`/workouts/${id}`}
            className="card bg-neutral text-neutral-content  max-w-sm shadow-lg border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
        >
            <figure className="relative w-full h-48">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </figure>

            <div className="card-body p-4">
                <div className="flex gap-2 -mt-8 relative z-10 mb-2">
                    {muscleGroups.map((group) => (
                        <span
                            key={group}
                            className="badge bg-[#C2F800] text-black font-semibold border-none px-3 py-3"
                        >
                            {group.toUpperCase()}
                        </span>
                    ))}
                </div>

                <h2 className="text-lg font-extrabold uppercase tracking-wide">
                    {name}
                </h2>
                <p className="text-sm text-neutral-content/60">{equipment}</p>

                <div className="flex items-center gap-4 mt-3 text-sm text-neutral-content/80">
                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Flame size={16} />
                        <span>{caloriesBurned} kcal</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star size={16} className="fill-[#C2F800] text-[#C2F800]" />
                        <span>{rating}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;