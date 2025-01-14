import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";

interface AlbumCardProps {
    image:string;
    text:string;
}

const AlbumCard : React.FC<AlbumCardProps> = ({image, text}) => {
    
    const [play, setPlay] = useState(false);
  
    return (
    <div className='w-48 h-auto flex flex-col rounded-md p-2 hover:bg-[#333333] cursor-pointer'
        onMouseEnter={() => setPlay(true)}
        onMouseLeave={() => setPlay(false)}
    >
        <div className="w-full h-full relative">
            <div className="w-full h-44">
                <img className='w-full h-full rounded-md ' src={image} alt="" />
            </div>
            <p className='text-sm text-gray-300 mt-1 font-poppins line-clamp-2 '>{text}</p>

            {
                play && <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center absolute bottom-14 right-2 animate-moveUp">
                <FaPlay className="size-5 pl-1 text-black cursor-pointer"/>
            </div>
            }
        </div>
    </div>
  )
}

export default AlbumCard