import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen h-full flex flex-col items-center justify-center gap-8 ">
      <h1 className="text-4xl font-semibold">DropFlow</h1>
      <Button>Login</Button>
    </main>
  );
}
