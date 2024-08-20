import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen h-full flex flex-col items-center justify-center gap-8 ">
      <h1 className="text-4xl font-semibold">DropFlow</h1>
      <Link href="/login">Login</Link>
    </main>
  );
}
