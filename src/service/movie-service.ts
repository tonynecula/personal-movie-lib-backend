import { CrudService } from "./crud-service";
import * as mongooseTypes from "mongoose";
import MovieModel, { Movie } from "../models/movie";

export class MovieService extends CrudService<Movie> {
  constructor() {
    super(MovieModel);
  }

  public getById(id: string | mongooseTypes.ObjectId): Promise<Movie | null> {
    return this.model
      .findOne({ _id: id as any })
      .exec()
      .then((movie: Movie | null) => {
        if (!movie) {
          return null;
        }
        return movie;
      });
  }

  public getAll(): Promise<Movie[] | null> {
    return this.model.find().exec();
  }

  public async addOne(movie: Partial<Movie>): Promise<Movie> {
    return MovieModel.create<Partial<Movie>>(movie);
  }

  public findOne(
    match: mongooseTypes.FilterQuery<Movie>
  ): Promise<Movie | null> {
    return this.model.findOne({ ...match }).exec();
  }

  public updateOne(
    id: string | mongooseTypes.ObjectId,
    updates: Partial<Movie>
  ) {
    return this.model
      .findOneAndUpdate({ _id: id as any }, { ...updates }, { new: true })
      .exec();
  }

  public deleteById(id: string | mongooseTypes.ObjectId) {
    return this.model.deleteOne({ _id: id as any }).exec();
  }
  public async movieExists(
    movie: Partial<Movie>
  ): Promise<{ movieCreated: boolean }> {
    const existing_movie = await MovieModel.findOne({
      title: movie.title,
      director: movie.director,
    });
    return {
      movieCreated: existing_movie !== null,
    };
  }
}
