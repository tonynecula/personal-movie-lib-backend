import { Router } from "express";
import { authenticated, authenticatedAdmin } from "../../../middleware/auth";
import movieController from "./movie-controller";
import { AddMovieDto } from "./dtos/add-movie.dto";
import { validateBody } from "../../../middleware/validation";
import { UpdateMovieDto } from "./dtos/update-movie.dto";

const movieRouter = Router();

movieRouter.post(
  "/new",
  authenticatedAdmin,
  validateBody(AddMovieDto),
  movieController.addMovie
);
movieRouter.post(
  "/:id",
  authenticatedAdmin,
  validateBody(UpdateMovieDto),
  movieController.updateMovie
);

movieRouter.get("/", movieController.getAll);
movieRouter.get("/:id", movieController.getOne);

export default movieRouter;
