import { NextFunction, Request, Response } from "express";
import { Movie } from '../models/movies';
import { BadRequestError } from '../errors/bad-request-error';
import { SavingError } from '../errors/saving-error';

export const createMovie = async (req: Request, res: Response) => {
    const { title, description, director, releaseYear, genre } = req.body;

    const existingMovie = await Movie.findOne({ title });

    if (existingMovie) {
        throw new BadRequestError('Movie already in database')
    }

    const movie = Movie.build({ title, description, director, releaseYear, genre });
    await movie.save();


    res.status(200).json({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        director: movie.director,
        releaseYear: movie.releaseYear,
        genre: movie.genre
    });


}

export const updateMovie = async (req: Request, res: Response) => {
    const movieId = req.params.movieId;
    const { title, description, director, releaseYear, genre } = req.body;

    const movie = await Movie.findOne({ _id: movieId });

    if (!movie) {
        throw new BadRequestError('Movie not found');
    }

    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.releaseYear = releaseYear;
    movie.genre = genre;

    await movie.save();

    res.status(200).json(movie);

};

export const getMovies = async (req: Request, res: Response) => {

    const movies = await Movie.find();

    if (!movies) {
        throw new BadRequestError('Movie not found');
    }

    res.status(200).json(movies);


}

export const getMovieByName = async (req: Request, res: Response, next: NextFunction) => {
    const title = req.query.title;

    const movie = await Movie.findOne({ title: title });

    if (!movie || null) {
        throw new BadRequestError('Movie not found');
    }

    res.status(200).json(movie);

}

export const deleteMovie = async (req: Request, res: Response) => {
    const movieId = req.params.movieId;

    const movie = await Movie.findOne({_id: movieId});

    if (!movie || null) {
        throw new BadRequestError('Movie not found');
    }

    await Movie.deleteOne({ _id: movieId });

    res.status(200).json({
        message: 'Movie deleted successfully',
    });

}





