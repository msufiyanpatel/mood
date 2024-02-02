import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { userId } = await auth()

  let href = userId ? '/journal' : '/new-user'


  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white"> 
    <div className="w-full max-w-[600px] mx-auto">
      <h1 className="text-6xl mb-4"> The Best Journal App In The Market</h1>
      <p className="text-2xl text-white/70 mb-4">This journal app is created by Sufiyan using AI system that define your mood and you know its FREE</p>
      <div>
        <Link href={href}>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">Get Started</button>
        </Link>
      </div>

    </div>
      
    </div>
    
  )
}
