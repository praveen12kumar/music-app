
import AlbumCard from '../../atoms/albumCard/AlbumCard';
interface SongResponse {
    title: string;
    artist: string;
    album: string;
    duration: string;
    thumbnail: string; // URL when receiving
    song: string;      // URL when receiving
    albumId?: string;
}

interface Props {
    songs: SongResponse[];
}


const ForyouPlaylist :React.FC<Props> = ({songs}) => {
    
    return (
    <div className='w-full flex flex-row gap-4'>
        {
            songs && songs?.map((album, index)=>{
                return(
                    <AlbumCard key={index} image={album?.thumbnail} text={album?.title} />
                )
            })
        }
    </div>
  )
}

export default ForyouPlaylist