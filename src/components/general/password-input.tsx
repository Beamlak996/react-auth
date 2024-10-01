import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent focus:outline-none cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          variant={"ghost"}
          size={"sm"}
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
