import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAlbumDetails } from "../../redux/slices/album-slice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { FaPlay } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";




function AlbumPage() {
    const {albumId} = useParams();
    const id = albumId || "";
    
    const dispatch = useAppDispatch();
    const {album}  = useSelector((state: RootState)=> state.albums);
    console.log(album);
    
    function formatDuration(duration: number) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }



    useEffect(()=>{
        if(id){
            dispatch(getAlbumDetails(id));
        }
    },[id, dispatch])



    return (
        <div className="w-full min-h-fit h-full rounded-md custom-gradient-black">
            <div className="w-full flex flex-col items-center gap-2 p-6 custom-gradient-green rounded-tl-lg rounded-tr-lg">
                <div className="w-full flex items-center gap-4 ">
                    <img className="w-60 h-60 object-cover rounded-md" src={album?.thumbnail} alt="" />
                    <div className="w-full flex flex-col gap-2 ">
                    <h1 className="text-8xl font-bold font-poppins text-white">{album?.title}</h1>
                    <div className="w-full flex  items-center gap-1 font-poppins">
                        <p className="text-md font-medium font-nunito text-white">{album?.artist}</p><span className="text-xl text-white mb-3">{"."}</span>
                        <p className="text-sm text-gray-300">{album?.songs?.length} songs</p><span className="text-xl text-white mb-3">{"."}</span>
                        <p className="text-sm text-gray-300">
                            {album?.createdAt?.split("T")[0]}
                        </p>
                    </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-10 py-4">
                    <div className="w-16 h-16 bg-green-600 flex items-center rounded-full justify-center hover:bg-green-500 transition-all ease-in-out duration-200 hover:scale-105  cursor-pointer">
                        <FaPlay className="size-6 text-black"/>
                    </div>
            </div>
            <div className="w-full">
               <div className="font-nunito grid grid-cols-[0.5fr_3fr_1.5fr_1fr] w-full text-gray-300 gap-4 p-2 border-b border-gray-700 px-10">
                <p>#</p>
                <p>Title</p>
                <p>Album</p>
                <p><IoTimeOutline className="w-4 h-4 text-gray-400"/></p>
                </div> 
                <div className="w-full ">
                    {
                        album?.songs?.map((song,index)=>{
                            return(
                                <div key={song._id} className="font-nunito grid grid-cols-[0.5fr_3fr_1.5fr_1fr] w-full text-sm text-gray-300 gap-4 p-2  hover:bg-white/5 rounded-md group cursor-pointer border-b border-gray-700 px-10">
                                    <div className="flex items-center justify-center">
                                        <span className="group-hover:hidden">{index+1}</span>
                                        <FaPlay className="h-4 w-4 hidden group-hover:block" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src={song.thumbnail} alt={song?.title} className="size-10"/>
                                        <div className="">
                                            <div className={`font-medium text-white`}>{song?.title}</div>
                                            <div className="">{song?.artist}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">{song?.createdAt.split("T")[0]}</div>
                                    <div className="flex items-center">{formatDuration(song?.duration)}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default AlbumPage