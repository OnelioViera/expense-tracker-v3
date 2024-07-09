'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'

const EditBudget = () => {

  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  return (
    <div>

      <Dialog>
        <DialogTrigger asChild>
        <Button className="flex gap-2"> <PenBox />Edit</Button>

        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >{emojiIcon}</Button>

                <div className='absolute z-20'>
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji)
                      setOpenEmojiPicker(false)
                    }}

                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Name</h2>
                  <Input placeholder='e.g. Home Decor'
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                  <Input
                    type='number'
                    placeholder='e.g. 5000$'
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateBudget()}
                className="mt-5 w-full">Edit Budget</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  )
}

export default EditBudget;
