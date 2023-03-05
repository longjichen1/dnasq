import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Typewriter from 'typewriter-effect';
const Home: NextPage = () => {
  return (
    <div className="h-screen">
    <Navbar/>
    <div className="flex h-[80%] overflow-y-clip text-3xl flex-col items-center justify-center py-2">
      <h1>DNA-SeQ: </h1>
    <Typewriter
    options={{autoStart:true, loop:true, delay:40, strings:["Secure", "Easy", "Reliable"]}}
        
      />
    </div>
    </div>
  )
}

export default Home
