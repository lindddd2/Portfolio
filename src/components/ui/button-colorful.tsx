import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    gradientFrom?: string;
    gradientVia?: string;
    gradientTo?: string;
}

export function ButtonColorful({
    className,
    label = "Explore",
    gradientFrom = "from-[#c8913a]",
    gradientVia = "via-[#e8c875]",
    gradientTo = "to-[#c8913a]",
    ...props
}: ButtonColorfulProps) {
    return (
        <Button
            className={cn(
                "relative h-12 px-8 overflow-hidden rounded-full",
                "bg-[#161310]",
                "transition-all duration-200",
                "group cursor-pointer",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "absolute inset-0",
                    `bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo}`,
                    "opacity-30 group-hover:opacity-70",
                    "blur-sm transition-opacity duration-500"
                )}
            />
            <div className="relative flex items-center justify-center gap-2">
                <span className="text-white text-sm font-semibold">{label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
            </div>
        </Button>
    );
}
