
import AlbumCard from '../../atoms/albumCard/AlbumCard';
interface SongResponse {
    _id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    thumbnail: string; // URL when receiving
    song: string;      // URL when receiving
    albumId: string | null;
    songUrl?:string;
}

interface Props {
    songs: SongResponse[];
}


const ForyouPlaylist :React.FC<Props> = ({songs}) => {
    console.log("Songs", songs);
    return (
    <div className='w-full flex flex-row gap-4'>
        {
            songs && songs?.map((song)=>{
                return(
                    <AlbumCard key={song._id} song={song} />
                )
            })
        }
    </div>
  )
}

export default ForyouPlaylist