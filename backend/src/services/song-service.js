import { SongRepository } from "../repository/index.js";
import {UserRepository} from "../repository/index.js"
class SongService{

    constructor(){
        this.songRepository = new SongRepository();
        this.userRepository = new UserRepository();
    }

    async createSong(data){
        const song = await this.songRepository.create(data);
        return song
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