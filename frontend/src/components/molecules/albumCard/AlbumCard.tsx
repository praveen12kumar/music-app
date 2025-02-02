interface AlbumProp{
    title:string,
    artist:string,
    thumbnail:string;
    releaseYear:number 
}

interface Albumcardprop{
    album:AlbumProp
}


const AlbumCard : React.FC<Albumcardprop> = ({album}) => {
    console.log(album);
    return (
        <div>
                clj
        
        </div>
    )
};

export default AlbumCard;