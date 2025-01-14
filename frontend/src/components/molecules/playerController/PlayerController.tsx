import { useRef, useState } from 'react';
import ReactHowler from 'react-howler';
import Audio1 from "../../../assets/audio/1.mp3";
import Audio2 from "../../../assets/audio/2.mp3";
import Audio3 from "../../../assets/audio/luffy.mp3";

import {
    MdShuffle,
    MdSkipNext,
    MdSkipPrevious,
    MdOutlinePlayCircleFilled,
    MdOutlineRepeat,
    MdOutlinePauseCircleFilled,
} from "react-icons/md";




export const PlayerController = () => {
    const songs = [
        {
          id:1,
          title: "Song 1",
          artist: {
            name: "Album 1",
            image: "https://robohash.org/sanket",
          },
          url: Audio1
        },
        {
          id:2,
          title: "Song 2",
          artist: {
            name: "Album 2",
            image: "https://robohash.org/luffy",
          },
          url:Audio2
        },
        {
          id:3,
          title: "Song 3",
          artist: {
            name: "Album 3",
            image: "https://robohash.org/arjit",
          },
          url:Audio3
        }
      ]

    const soundRef = useRef(null);

    const [playerState, setPlayerState] = useState({
        playing:false,
        index:0,
        seek:0,
        repeat:false,
        shuffle:false,
        duration:0.0,
    });

    const handleNext = ()=>{
        setPlayerState((prev)=>({
            ...prev, index: (prev.index + 1) % songs.length
        }))
    }

    const handlePrevious = ()=>{
        setPlayerState((prev)=>({
            ...prev, index: (prev.index - 1 + songs.length) % songs.length
        }))
    }

    return(
        <div className=" text-white ">
            <ReactHowler ref={soundRef} src={songs[playerState.index].url} playing={playerState.playing} onEnd={() => {}}/>

            <div className="flex items-center justify-center space-x-6 py-5 text-gray-400">
                <button className="text-xl text-gray-400 hover:text-white">
                    <MdShuffle className="size-6"/>
                </button>
                <button 
                    onClick={handlePrevious}
                className="text-xl text-gray-400 hover:text-white">
                    <MdSkipPrevious className="size-7"/>
                </button>
                {
                    playerState.playing ?(
                        <button onClick={() => setPlayerState({...playerState,playing:false})}
                            className='text-xl text-white'
                        >
                            <MdOutlinePauseCircleFilled className="size-10"/>
                        </button>
                    ) :(
                        <button onClick={() => setPlayerState({...playerState,playing:true})} 
                            className="text-xl text-white">
                            <MdOutlinePlayCircleFilled className="size-10"/>
                        </button>
                    )
                }
                
                <button 
                    onClick={handleNext}
                    className="text-xl text-gray-400 hover:text-white">
                    <MdSkipNext className="size-7"/>
                </button>
                <button className="text-xl text-gray-400 hover:text-white">
                    <MdOutlineRepeat className="size-6"/>
                </button>
            </div>
        </div>
    )
}