import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-4xl bg-red-400">
      hello world
      <Button variant={"ghost"}>click me</Button>

    </div>
  );
}
