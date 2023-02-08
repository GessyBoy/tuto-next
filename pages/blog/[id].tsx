import React from 'react';
import Link from 'next/link';

interface PostProps {
  post: {
    title: string;
    body: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <main>
      <Link href="/">
  <h2>Accueil</h2>
</Link>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </main>
    </>
  );
}
interface GetStaticPropsParams {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params }: GetStaticPropsParams) {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  )
    .then((r) => r.json());

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
    .then((r) => r.json());

  return {
    paths: posts.map(( post: { id: { toString: () => any; }; } ) => ({ params: { id: post.id.toString() } })),
    fallback: false,
  };
}