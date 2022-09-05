import { Link } from "@remix-run/react";
import ThreeCanvas from "@/components/ThreeCanvas";
import { getUserId } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  return json({ userId });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <ThreeCanvas />
      </div>
    </>
  )
}