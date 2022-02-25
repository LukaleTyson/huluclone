import Head from 'next/head'

import Nav from '../components/Nav'
import Results from '../components/Results'
import {moviesreq} from '../utils/requests'



export default function Home({results,category}) {

  return (
    <div>
      <Head>
          <title>Hulu By Tyson</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Nav moviesreq={moviesreq}/>
      
      <Results results={results} category={category}/>
    </div>
  )
}

export async function getServerSideProps(context) {
  //get the genre query value from the url
  const genre = context.query.genre;
  try {
    //make an api call with url part one or default to second part if the query variable is undefined
    const res = await fetch(`https://api.themoviedb.org/3${moviesreq[genre]?.url || moviesreq.fetchTrending.url}`);  
    const data = await res.json()
    return {
    props: {
        results: data.results,
        category:"movie",
    }
  }
  } catch (error) {
    return {
      notFound: true,
    }
  }


}
