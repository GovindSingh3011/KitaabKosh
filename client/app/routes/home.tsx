import SignUpForm from "@/components/sign-up-form";
import type { Route } from "./+types/home";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "KitaabKosh" },
    { name: "description", content: "Book Management Platform" },
  ];
}

export default function Home() {
  // const { data: session, isPending } = authClient.useSession();

  // console.log(session);

  return (
    <div>
      <SignUpForm />
    </div>
  )
}
