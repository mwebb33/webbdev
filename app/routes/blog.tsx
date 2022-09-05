import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/components/ListLayout'
import {PageSEO} from '@/components/SEO'
import { getUserId } from "~/session.server";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const POSTS_PER_PAGE = 5

export async function loader({ request, context }: LoaderArgs) {
  const userId = await getUserId(request);
  const posts = []
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return json({ userId, posts, pagination, initialDisplayPosts});
}

export default function Blog() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={data.posts}
        initialDisplayPosts={data.initialDisplayPosts}
        pagination={data.pagination}
        title="All Posts"
      />
    </>
  )
}
