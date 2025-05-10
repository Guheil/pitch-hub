import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  animate?: boolean;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, text, animate = true, ...props }, ref) => {
    const dividerContent = !text ? (
      <hr
        className={cn("border-t border-black/[.08] dark:border-white/[.08] my-4", className)}
        {...props}
      />
    ) : (
      <div
        ref={ref}
        className={cn("flex items-center my-4", className)}
        {...props}
      >
        <div className="flex-grow border-t border-black/[.08] dark:border-white/[.08]"></div>
        <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">{text}</span>
        <div className="flex-grow border-t border-black/[.08] dark:border-white/[.08]"></div>
      </div>
    );

    if (animate && text) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {dividerContent}
        </motion.div>
      );
    }

    return dividerContent;
  }
);

Divider.displayName = "Divider";

export { Divider };
export default Divider;
