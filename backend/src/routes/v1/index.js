import express from 'express';
import {signup, 
        login, 
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
        findUserById} from "../../controllers/auth-controller.js";

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



const router = express.Router();

// -------user-----------

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify/email', verifyEmail);
router.post('/logout',  authenticate, logout);
router.post('/auth/forgot-password', forgotPassword);
router.post('/reset-password/:token',  resetPassword);
router.get('/user/:id', authenticate, findUserById);


// -------song-----------

router.post('/songs/create', songCreate);
router.get('/songs', authenticate, songByArtist);
router.get('/artists/:artistId', authenticate, allSongsOfArtist);
router.get('/songs/:title', authenticate, getSongByTitle);


// -------playlist-----------

router.post('/playlists/create', authenticate, createPlaylist);
router.get('/playlists/:playlistId', authenticate, findPlaylistById);
router.get('/playlists/artist/:artistId', authenticate, findAllPlaylistByArtist);
router.post('/playlists/add/song', authenticate, addSongToPlaylist);


    
export default router;