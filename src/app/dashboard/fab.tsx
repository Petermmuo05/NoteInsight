"use client"
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useModal } from './modal_context';

export default function Fab() {
      const { openModal } = useModal();
  
  return (
        <div
          onClick={openModal}
          className="
          fixed bottom-6 right-6
          bg-dark-gray 
          text-white
          w-14 h-14
          rounded-full
          flex items-center justify-center
          shadow-[0px_5px_15px_rgba(0,0,0,0.4)]
          hover:shadow-2xl
          hover:scale-105
          active:shadow-md
          active:scale-90
          transition-all duration-300
          sm:hidden
          xs:bottom-8 xs:right-8
          xs:w-16 xs:h-16
        "
        >
          <FaPlus size={20} />
        </div>  )
}
