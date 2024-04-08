import { signOut } from "@/auth";

interface LogoutButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LogoutButton = ({ children, ...props }: LogoutButtonProps) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button {...props} type="submit">
        {children}
      </button>
    </form>
  );
};
