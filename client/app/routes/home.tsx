import { authClient } from "@/lib/auth-client";
import type { Route } from "./+types/home";
import { Button } from "@/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "KitaabKosh" },
    { name: "description", content: "Book Management Platform" },
  ];
}

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  console.log(session);

  return <Button className="text-lg font-medium">Button</Button>;
}
