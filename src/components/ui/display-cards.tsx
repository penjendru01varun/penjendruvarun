"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    date?: string;
    iconClassName?: string;
    titleClassName?: string;
    link?: string;
}

function DisplayCard({
    className,
    icon = <Sparkles className="size-4 text-blue-300" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    iconClassName = "text-blue-500",
    titleClassName = "text-blue-500",
    link = "#",
}: DisplayCardProps) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-neutral-900/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 hover:border-white/20 hover:bg-neutral-800 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                className
            )}
        >
            <div>
                <span className={cn("relative inline-block rounded-full p-1 bg-blue-900/50", iconClassName)}>
                    {icon}
                </span>
                <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
            </div>
            <p className="whitespace-nowrap text-lg text-white">{description}</p>
            <p className="text-neutral-500 text-sm">{date}</p>
        </a>
    );
}

interface DisplayCardsProps {
    cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
    return (
        <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
            {cards?.map((cardProps, index) => (
                <DisplayCard key={index} {...cardProps} />
            ))}
        </div>
    );
}
