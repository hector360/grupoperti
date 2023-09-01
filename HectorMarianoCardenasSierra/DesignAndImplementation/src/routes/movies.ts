import express, { Request, Response} from "express";
import { createMovie, getMovies, updateMovie, getMovieByName, deleteMovie } from '../controller/movieController';
import { validateRequest } from '../middlewares/validate-request';
import { validateUser } from '../middlewares/validate-user';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/movies/create-movie', [
    body('title')
        .notEmpty()
        .withMessage('The "title" field must not be empty.'),
    body('description')
        .notEmpty()
        .withMessage('The "description" field must not be empty.'),
    body('director')
        .notEmpty()
        .withMessage('The "director" field must not be empty.'),
    body('releaseYear')
        .trim()
        .notEmpty()
        .withMessage('The "releaseYear" field must not be empty.'),
    body('genre')
        .notEmpty()
        .withMessage('The "releaseYear" field must not be empty.'),
], validateUser, validateRequest, createMovie);
router.get('/api/movies/get-movies', validateUser, getMovies);
router.put('/api/movies/update-movie/:movieId', [
    body('title')
        .notEmpty()
        .withMessage('The "title" field must not be empty.'),
    body('description')
        .notEmpty()
        .withMessage('The "description" field must not be empty.'),
    body('director')
        .notEmpty()
        .withMessage('The "director" field must not be empty.'),
    body('releaseYear')
        .trim()
        .notEmpty()
        .withMessage('The "releaseYear" field must not be empty.'),
    body('genre')
        .notEmpty()
        .withMessage('The "releaseYear" field must not be empty.'),
], validateUser, updateMovie);
router.get('/api/movies/get-movie-by-title', validateUser, getMovieByName);
router.delete('/api/movies/delete-movie/:movieId', validateUser, deleteMovie);

export { router as movieRouter}
