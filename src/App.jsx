/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import About from './components/About';
import Technologies from './components/Technologies';
import Experience from './components/Experience';
import Project from './components/Project';
import Contact from './components/Contact';
import PuzzleGame from './components/PuzzleGame';

const App = () => {
  return (
    <div className='overflow-x-hidden text-neutral-900 antialiased selection:bg-cyan-300 selection:text-cyan-900'>
      {/* Background */}
      <div className="fixed inset-0 -z-10 h-screen">
        <div className="relative h-full w-full [&>div]:absolute [&>div]:bottom-0 [&>div]:right-0 [&>div]:z-[-2] [&>div]:h-full [&>div]:w-full [&>div]:bg-gradient-to-b [&>div]:from-pink-200 [&>div]:to-white">
          <div></div>
        </div>
      </div>
      <div className="container mx-auto px-8">
        <Navbar/>
        <Hero/>
        <About/>
        <Experience/>
        <PuzzleGame/>
        <Contact/>
      </div>
    {/* Audio Autoplay */}
    <audio src="https://framerusercontent.com/assets/a63Qvt7HY9l3WiXmUtsczXXf7Q0.mp3" loop autoPlay preload="metadata"></audio>
    </div>
  )
}

export default App
