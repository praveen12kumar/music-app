import uploadOnCloudinary from "../config/cloudinary-config.js";
import { SongRepository } from "../repository/index.js";
import {UserRepository} from "../repository/index.js"
class SongService{

    constructor(){
        this.songRepository = new SongRepository();
        this.userRepository = new UserRepository();
    }

    async createSong(data){
        const {title, artists, year, duration, localSongPath, localThumbnailPath } = data;
        try {
            const song = await this.songRepository.songByTitle(data.title);
        
        if(song){
            throw new Error("Song already exists");
        }

        if(!localSongPath || !localThumbnailPath){
            throw{
                message:"Song and thumbnail is required",
                success: false,
            }
        }

        const thumbnail = await uploadOnCloudinary(localThumbnailPath, "image");
        //console.log("thumbnail Cloudinary", thumbnail);
        if(!thumbnail){
            throw{
                message:"Thumbnail upload failed",
                success: false,
            }
        }

        const songUrl = await uploadOnCloudinary(localSongPath, "audio");
        //console.log("Song Cloudinary", songUrl);

        if(!songUrl){
            throw{
                message:"Song upload failed",
                success: false,
            }
        }

        const newSong = {
            title,
            artists,
            year,
            duration,
            songUrl: songUrl?.secure_url,
            thumbnail: thumbnail?.secure_url
        }

        const songResult = await this.songRepository.create(newSong);
        //console.log(songResult)
        return songResult;
        } catch (error) {
            throw{
                message: error.message,
                success: false
            }
        }
    }


    async findSongByArtist(artistId){
        const songs = await this.songRepository.songOfArtist(artistId);
        return songs
    }


    async getAllSongsOfArtist(artistId){
       
        const artist = await this.userRepository.get(artistId);        
        if(!artist){
            throw new Error("Artist not found");
        }
        const songs = await this.songRepository.songByArtist(artistId);
        return songs
    }


    async getSongByName(name){
        const song = await this.songRepository.songByTitle(name);
        return song
    }
}


export default SongService;