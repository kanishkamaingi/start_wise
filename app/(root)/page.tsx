import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams} : {
  searchParams : Promise<{ query?: string }>
}){
  const query = (await searchParams).query

  const posts = [{
    _createdAt : 'Yesterday',
    views : 55,
    author : {_id : 1},
    _id : 1,
    description : 'A marketplace for sustainable and eco-friendly products.',
    image : "https://plus.unsplash.com/premium_photo-1661368421663-13b2d8115241?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWNvJTIwZnJpZW5kbHl8ZW58MHx8MHx8fDA%3D",
    category : 'Nature',
    title : 'EcoNest'

  }]

  return(
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch your startup, <br /> Connect with entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and get noticed in virtual competitions.
        </p>


        <SearchForm query = {query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "$query"` : `All Startups`}
        </p>
        <ul className="mt-7 card_grid">
          {
            posts?.length > 0 ? (
              posts.map((post : StartupCardType, index : number) => (
                <StartupCard key = { post?._id} post = {post  }/>
              ))
            ) : (
              <p className="no-results">No startups found</p>
            )
          }
        </ul>
      </section>
      
    </>
  )
}