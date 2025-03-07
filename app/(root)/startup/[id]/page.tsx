
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";

// export default async function Home({searchParams} : {
//     searchParams : Promise<{ query?: string }>
//   }){
//     const query = (await searchParams).query
//     const params = {search : query || null }
    
//     const {data : posts} = await sanityFetch({query: STARTUP_QUERY, params}) }
    

export default async function Page({params} : {
    params: {id : string}}) {
    const id = (await params).id
    console.log("Sanity client:", client);
    console.log("Fetching post with ID:", id);

    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id})
    console.log("post stored:", post)
    if (!post) return notFound();

    return (
        <>
        <section className="pink_container !min-h-[230px]">
            hi
        </section>
        </>
    )
}

