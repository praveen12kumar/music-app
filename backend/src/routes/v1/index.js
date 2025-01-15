import express from 'express';
import {signup, login, findUserById} from "../../controllers/auth-controller.js";
import { songCreate, 
        songByArtist, 
        allSongsOfArtist,
        getSongByTitle,

    } from '../../controllers/song-controller.js';

import {authenticate} from "../../middlewares/authenticate.js";



const router = express.Router();

// -------user-----------

router.post('/signup', signup);
router.post('/login', login);
router.get('/user/:id', authenticate, findUserById);

// -------song-----------

router.post('/create', songCreate);
router.get('/songs', authenticate, songByArtist);
router.get('/artist/:name', authenticate, allSongsOfArtist);
router.get('/songs/:title', authenticate, getSongByTitle);



    
export default router;