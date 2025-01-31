import uploadOnCloudinary from "../config/cloudinary-config.js";
import AlbumRepository from "../repository/album-repository.js";
import SongRepository from "../repository/song-repository.js";

class AlbumService {
    constructor() {
        this.albumRepository = new AlbumRepository();
        this.songRepository = new SongRepository();
    }


    async createAlbum(data) {
        try {
            const {title, artist, releaseYear, localThumbnailPath} = data;
            if(!title || !artist || !releaseYear){
                throw {
                    message:"All fields are required",
                    success: false
                }
            }

            if(!localThumbnailPath){
                throw {
                    message:"Thumbnail is required",
                    success: false
                }
            }

            const result = await uploadOnCloudinary(localThumbnailPath, "image");

            if(!result){
                throw {
                    message:"Thumbnail upload failed",
                    success: false
                }
            }

            const album = await this.albumRepository.create({
                title,
                artist,
                releaseYear,
                thumbnail: result?.secure_url
            })

            return album;
        } catch (error) {
            
        }
    }

    async deleteAlbum(albumId) {
        try {
            const result = await this.songRepository.deleteSongs(albumId)

            if(!result.acknowledged){
                throw{
                    message:"Songs not deleted",
                    success: false
                }
            }

            await this.albumRepository.deleteAlbum(albumId);

        } catch (error) {
            throw error
        }
    }

    async getAllAlbums() {
        try {
            const albums = await this.albumRepository.getAll();
            return albums;
        } catch (error) {
            throw error;
        }
    }

    async getAlbumDetails(albumId) {
        try {
            const ablum = await this.albumRepository.get(albumId).populate("songs");
            console.log("album",ablum);

            if(!ablum){
                throw{
                    message:"Album not found",
                    success: false
                }
            }
            return ablum;

        } catch (error) {
            throw error
        }
    }

   

}

export default AlbumService;