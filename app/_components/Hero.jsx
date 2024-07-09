import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    
<section className="bg-gray-50 flex items-center flex-col pb-40">
  <div className="mx-auto max-w-screen-xl px-4 py-10 lg:py-20 lg:flex">
    <div className="mx-auto max-w-xl text-center justify-center">
      <h1 className="text-center justify-center text-3xl font-extrabold lg:text-5xl">
        Manage Your Expenses
        <strong className="font-extrabold text-primary sm:block"> Control your Money </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Start Creating your budget and save tons of money.
      </p>

      <div className="my-4 lg:mt-4 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring sm:w-auto"
          href="/sign-in"
        >
          Get Started
        </a>
      </div>
    </div>
      </div>
      <Image
        src="/2799915.png"
        alt="hero"
        width={600}
        height={600}
      className='-mt-9 rounded-xl border-2'
      />
</section>
  )
}

export default Hero