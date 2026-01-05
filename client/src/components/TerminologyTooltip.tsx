import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TerminologyTooltipProps {
  term: string;
  explanation: string;
  children: React.ReactNode;
}

export default function TerminologyTooltip({ 
  term, 
  explanation, 
  children 
}: TerminologyTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span 
            className="border-dotted border-b border-[#0066FF] dark:border-[#00ffae] cursor-help inline-flex items-center text-[22px] text-[#0066FF] dark:text-[#00ffae]" 
            aria-label={`${term}: ${explanation}`}
          >
            {children}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 h-5 w-5 text-[#0066FF] dark:text-[#00ffae]"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-md">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm">{term}</p>
            <p className="text-xs">{explanation}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}