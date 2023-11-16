import React from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon: React.ReactElement;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  className,
  icon,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `rounded-full flex items-center justify-center 
        bg-white border shadow-md p-2 hover:scale-110 transition`,
        className
      )}>
      {icon}
    </button>
  );
};
