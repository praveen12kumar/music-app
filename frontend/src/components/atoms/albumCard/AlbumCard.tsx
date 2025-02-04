import { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaPause } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { togglePlay, setCurrentSong } from '../../../redux/slices/player-slice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

interface AlbumCardProps {
    _id:string;
    title: string;
    artist: string;
    thumbnail: string; // URL when receiving
    songUrl: string; 
    albumId: string | null;
    duration:number;
    createdAt?:string;
    updatedAt?:string

}
interface SongProp{
    song:AlbumCardProps
}

const AlbumCard = ({song}:SongProp) => {
    const dispatch = useAppDispatch();

    const {currentSong, isPlaying} = useSelector((state: RootState)=> state.player);

    const isCurrentSong = song?._id === currentSong?._id;


    const [play, setPlay] = useState(false);

    const handlePlay = ()=>{
       if(isCurrentSong){
        dispatch(togglePlay())
       }
       else{
        dispatch(setCurrentSong(song));
       }
    }
  
    return (
    <div className='w-48 h-auto flex flex-col rounded-md p-2 hover:bg-[#333333] cursor-pointer'
        onMouseEnter={() => setPlay(true)}
        onMouseLeave={() => setPlay(false)}
    >
        <div className="w-full h-full relative">
            <div className="w-full h-44">
                <img className='w-full h-full rounded-md ' src={song?.thumbnail} alt="" />
            </div>
            <p className='text-sm text-gray-300 mt-1 font-poppins line-clamp-2 '>{song?.title}</p>

            {
                play && <div 
                    onClick={handlePlay}
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center absolute bottom-14 right-2 animate-moveUp">
                {
                    isCurrentSong && isPlaying ? 
                    <FaPause className="size-4 text-black cursor-pointer" />
                    :
                    <FaPlay className="size-4 text-black cursor-pointer" />
                }
            </div>
            }
        </div>
    </div>
  )
}

export default AlbumCard