"use client ";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button className="w-full" variant="outline">
        <FaGithub size={20} />
      </Button>
      <Button className="w-full" variant="outline">
        <FcGoogle size={20} />
      </Button>
    </div>
  );
};
