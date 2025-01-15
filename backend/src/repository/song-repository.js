import Song from "../models/song.model.js";
import CrudRepository from "./crud-repository.js";


class SongRepository extends CrudRepository{

    constructor() {
        super(Song);
    }

    async songOfArtist(id){
        const songs = await Song.find({artists: id}).populate("artists");
        return songs
    }

    async songByArtist(id){
        const songs = await Song.getAll({artists: id});
        return songs
    }

    async songByTitle(title){
        const songs = await Song.getAll({title: title});
        return songs
    }
};

export default SongRepository;