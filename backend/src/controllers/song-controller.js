import { SongService } from "../services/index.js";

const songService = new SongService();  

export const songCreate = async (req, res) => {

    const localThumbnailPath = req.files?.thumbnail[0]?.path;
    const localSongPath = req.files?.song[0]?.path;

    const {title, artists, year} = req.body;
    try {
        const song = await songService.createSong({title, artists, year,  localSongPath, localThumbnailPath});
        
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

// Hold to test

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



export const allSongsOfArtist = async(req, res) => {
    try {
        const songs = await songService.getAllSongsOfArtist(req.params.artistId);
        return res.status(200).json({
            success: true,
            data: songs,
            message: "Songs found successfully",
            err: {}
        });
    } catch (error) {
        if (error.message === "Artist not found") {
            return res.status(404).json({
                success: false,
                data: {},
                message: error.message,
                err: error
            });
        } else {
            return res.status(500).json({
                success: false,
                data: {},
                message: "Something went wrong",
                err: error
            });
        }
    }
};


export const getSongByTitle = async(req, res)=>{
    try {
        const songs = await songService.getSongByName(req.params.title);
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
