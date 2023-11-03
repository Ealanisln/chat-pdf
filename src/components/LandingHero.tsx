"use client";

import TypewriterComponent from "typewriter-effect";
import React from 'react'

const LandingHero = () => {
  return (
    <div className="text-neutral-950 font-bold py-10 text-center space-y-5">
    <div className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl space-y-5 font-extrabold">
      <h1>Experimenta el uso de la IA</h1>
      <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
      <TypewriterComponent
            options={{
              strings: [
                "Charla PDF.",
                "Interactúa.",
                "Ahorra tiempo.",
                "Simplifica."
              ],
              autoStart: true,
              loop: true,
            }}
          />
      </div>
    </div>
  </div>


  )
}

export default LandingHero