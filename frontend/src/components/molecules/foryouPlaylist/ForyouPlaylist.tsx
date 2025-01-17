
import AlbumCard from '../../atoms/albumCard/AlbumCard'
const ForyouPlaylist = () => {
    
    
    const albums = [
        {image:"https://i.pinimg.com/736x/b1/c4/07/b1c4073b9d78620abc2406870be5875e.jpg", text:"Catch all the latest music from artists you follow"},
        {image:"https://i.pinimg.com/736x/30/d5/19/30d519871be69fbc7767ceec9dacb91f.jpg", text:"Arjit Singh, Badshah, Jubin Nautiyal, Shreya Ghoshal"},
        {image:"https://i.pinimg.com/736x/48/d0/a4/48d0a43a2f533bd999ce5de0a9bce629.jpg", text:"Pritam , Badshah , Jubin Nautiyal , Shreya Ghoshal and more"},
        {image:"https://i.pinimg.com/736x/27/02/a4/2702a480b6f7ac25f764d5051d9c00ce.jpg", text:"Catch all the latest music from artists you follow"},
        {image:"https://i.pinimg.com/736x/30/d5/19/30d519871be69fbc7767ceec9dacb91f.jpg", text:"Arjit Singh, Badshah, Jubin Nautiyal, Shreya Ghoshal"},
        {image:"https://i.pinimg.com/736x/48/d0/a4/48d0a43a2f533bd999ce5de0a9bce629.jpg", text:"Pritam , Badshah , Jubin Nautiyal , Shreya Ghoshal and more"},
    ]
  
    return (
    <div className='w-full flex flex-row gap-4'>
        {
            albums.map((album, index)=>{
                return(
                    <AlbumCard key={index} image={album.image} text={album.text} />
                )
            })
        }
    </div>
  )
}

export default ForyouPlaylist