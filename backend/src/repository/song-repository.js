import Song from "../models/song.model.js";
import CrudRepository from "./crud-repository.js";


class SongRepository extends CrudRepository{

    constructor() {
        super(Song);
    }

    async songOfArtist(id){
                
        const songs = await Song.find({artists: id});
        console.log("songs", songs);
        
        return songs
    }

    async songByArtist(id){
        const songs = await Song.find({artists: id});
        return songs
    }

    async songByTitle(title){
        
        const songs = await Song.findOne({title});
        //console.log("songs", songs);
        return songs
    }
};

export default SongRepository;