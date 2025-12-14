import { cn } from "../../utils/cn";

export const Input = ({ label, className, ...props }) => {
    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-medium text-white/70 ml-1">{label}</label>}
            <input
                className={cn(
                    "input-field",
                    className
                )}
                {...props}
            />
        </div>
    );
};
