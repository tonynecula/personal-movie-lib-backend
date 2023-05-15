/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from "express";
import { MovieService } from "../../../service/movie-service";
import { AddMovieDto } from "./dtos/add-movie.dto";
import { Movie } from "../../../models/movie";
import { errors } from "../../../util/constants";
import { PagerQueryParams } from "../../../middleware/pager";
import mongoose from "mongoose";
import { UpdateMovieDto } from "./dtos/update-movie.dto";

export class MovieController {
  private movieService = new MovieService();
  public addMovie = async (
    req: Request<{}, {}, AddMovieDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newMovie: Partial<Movie> = req.body;
      const movieExists = await this.movieService.movieExists(newMovie);
      if (movieExists.movieCreated) {
        return next(errors.movieCreated);
      }
      newMovie._id = new mongoose.Types.ObjectId().toHexString();

      const movie = await this.movieService.addOne(newMovie);

      return res.status(200).json({ movie });
    } catch (e) {
      return next(e);
    }
  };
  public updateMovie = async (
    req: Request<{ id: string }, {}, UpdateMovieDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedMovie: Partial<Movie> = req.body;
      const movieId = req.params.id;
      const currentMovie = await this.movieService.getById(movieId);
      if (!currentMovie) {
        return next(errors.notFound);
      }

      const movie = await this.movieService.updateOne(movieId, updatedMovie);

      return res.status(200).json({ movie });
    } catch (e) {
      return next(e);
    }
  };
  public getAll = async (
    req: Request<{}, {}, {}, PagerQueryParams>,
    res: Response<{ movies: Movie[]; moviesCount: number }>,
    next: NextFunction
  ) => {
    try {
      const movies = await this.movieService.getAll();
      if (!movies) {
        return next(errors.notFound);
      }
      return res.status(200).json({ movies, moviesCount: movies.length });
    } catch (e) {
      return next(e);
    }
  };
  public getOne = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response<{ movie: Movie }>,
    next: NextFunction
  ) => {
    try {
      const movieId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return next(errors.notFound);
      }
      const movie = await this.movieService.getById(movieId);
      if (!movie) {
        return next(errors.notFound);
      }

      return res.status(200).json({ movie });
    } catch (e) {
      return next(e);
    }
  };
}

export default new MovieController();
