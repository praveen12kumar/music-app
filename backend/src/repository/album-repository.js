import Album from "../models/ablum.model.js";
import CrudRepository from "./crud-repository.js";


class AlbumRepository extends CrudRepository{
    constructor() {
        super(Album);
    }

    async addSongToAlbum(albumId, songId){
        try {
            await Album.findByIdAndUpdate(albumId, {
                $push:{
                    songs: songId
                }
            })
        } catch (error) {
            throw error
        }
    }

    async removeSongFromAlbum(albumId, songId){
        try {
            await Album.findByIdAndUpdate(albumId, {
                $pull:{
                    songs:songId
                }
            })
        } catch (error) {
            throw error
        }
    }

    async deleteAlbum(albumId){
        try {
            await Album.findByIdAndDelete(albumId)
        } catch (error) {
            throw error
        }
    }


    

    


}

export default AlbumRepository;