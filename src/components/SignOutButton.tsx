import { motion } from "motion/react";
import { Icon } from "@/components/Primitives";
import { useSignOut } from "@/hooks/useSignOut";
import { cn } from "@/lib/utils";

/** Ghost button that signs the user out and returns to the sign-in screen. */
export function SignOutButton({
  className,
  label = "Sign out",
}: {
  className?: string;
  label?: string;
}) {
  const signOut = useSignOut();

  return (
    <motion.button
      type="button"
      onClick={() => void signOut()}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={cn("btn-base btn-ghost text-xs", className)}
    >
      <Icon name="logout" className="text-[16px]" />
      {label}
    </motion.button>
  );
}
