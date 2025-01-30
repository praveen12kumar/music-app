import express from 'express';
import {signup, 
        login, 
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
} from "../../controllers/auth-controller.js";

import { getUserDetails, 
        findUserById,
        updateUserProfile
} from '../../controllers/user-controller.js';

import { songCreate, 
        songByArtist, 
        allSongsOfArtist,
        getSongByTitle,

    } from '../../controllers/song-controller.js';

import { createPlaylist,   
        findPlaylistById,
        findAllPlaylistByArtist,
        addSongToPlaylist
 } from '../../controllers/playlist-controller.js';

import {authenticate} from "../../middlewares/authenticate.js";
import {upload} from "../../middlewares/multer-middlewarer.js";
import multer from 'multer';



const router = express.Router();

// -------auth-----------

router.post('/signup', upload.fields([
        {name:"avatar", maxCount:1}
]), signup);
router.post('/login', login);
router.post('/verify/email', verifyEmail);
router.post('/logout', logout);
router.post('/auth/forgot-password', forgotPassword);
router.post('/reset-password/:token',  resetPassword);


//--------------user----------------------

router.get("/user", authenticate, getUserDetails);
router.put('/user/update-profile',authenticate,(req, res, next)=>{
        upload.single("avatar")(req, res, (err)=>{
                if(err){
                        if(err instanceof multer.MulterError){
                                if(err.code === 'LIMIT_FILE_SIZE'){
                                        return res.status(413).json({
                                                message: "File too large",
                                                success:false
                                        })
                                }
                                else{
                                        return res.status(400).json({
                                                message: err.message,
                                                success:false
                                        })
                                }
                        }
                }
                next();
        })

}, updateUserProfile);
router.get('/user/:id', authenticate, findUserById);

// -------song-----------

router.post('/admin/songs/add',upload.fields([
        {name: 'song', maxCount: 1},
        {name: 'thumbnail', maxCount: 1},
]),   authenticate,  songCreate);
router.get('/songs', authenticate, songByArtist);
router.get('/artists/:artistId', authenticate, allSongsOfArtist);
router.get('/songs/:title', authenticate, getSongByTitle);


// -------playlist-----------

router.post('/playlists/create', authenticate, createPlaylist);
router.get('/playlists/:playlistId', authenticate, findPlaylistById);
router.get('/playlists/artist/:artistId', authenticate, findAllPlaylistByArtist);
router.post('/playlists/add/song', authenticate, addSongToPlaylist);


    
export default router;