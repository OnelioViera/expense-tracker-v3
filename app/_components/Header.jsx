'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

const Header = () => {

  const { user, isSignedIn } = useUser();

  return (
    <div className='flex items-center justify-between border shadow-sm p-5'>
      <Image
        src={'./logo-1.svg'}
        alt={'logo-1'}
        height={80}
        width={80}
      />
      {isSignedIn ?
        <UserButton /> :
        <Link href={'/sign-in'}>
          <Button>Get Started</Button>
        </Link>
      }
    </div>
  )
}

export default Header