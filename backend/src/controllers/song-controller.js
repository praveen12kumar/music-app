import { SongService } from "../services/index.js";

const songService = new SongService();  

export const songCreate = async (req, res) => {
    const {title, artists, year, duration} = req.body;
    try {
        const song = await songService.createSong({title, artists, year, duration});
        return res.status(200).json({
            success: true,
            data: song,
            message: "Song created successfully",
            err:{}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
}

export const songByArtist= async (req, res) => {
    try {
        const songs = await songService.findSongByArtist(req.user._id);
        return res.status(200).json({
            success: true,
            data: songs,
            message: "Song found successfully",
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
} 


export const allSongsOfArtist = async(req, res)=>{
    try {
        const songs = await songService.getAllSongsOfArtist(req.params.id);
        return res.status(200).json({
            success: true,
            data: songs,
            message: "Song found successfully",
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
}

export const getSongByTitle = async(req, res)=>{
    try {
        const songs = await songService.getSongByName(req.params.name);
        return res.status(200).json({
            success: true,
            data: songs,
            message: "Song found successfully",
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
        })
    }
}
