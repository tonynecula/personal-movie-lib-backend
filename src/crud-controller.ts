/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import { CrudService } from "./service/crud-service";
import { PagerQueryParams } from "./middleware/pager";
import { errors } from "./util/constants";
import { User } from "./models/user";

/**
 * Provides request handlers for basic requests like get list,
 * get by id, create, update by id, delete by id.
 */
export abstract class CrudController<
  S extends CrudService<T>,
  T extends Document
> {
  /**
   * Protected constructor, not meant to be instantiated directly.
   *
   * @param service - this generic service will handle CRUD operations
   */
  protected constructor(protected service: S) {}

  public list = async (
    req: Request<{}, {}, {}, PagerQueryParams>,
    res: Response<{ total: number; data: T[] }>,
    next: NextFunction
  ) => {
    try {
      const resources = await this.service.list(req.filter, {}, req.options);
      if (!resources) return next(errors.notFound(typeof resources));
      return res.status(200).json(resources || { total: 0, data: [] });
    } catch (e) {
      return next(e);
    }
  };

  public getById = async (
    // not allowed to write IdDto as params type, but we can validate in router
    req: Request<{ id: string }, {}, {}>,
    res: Response<T>,
    next: NextFunction
  ) => {
    try {
      const resource = await this.service.getById(req.params.id);
      if (!resource) return next(errors.notFound(typeof resource));

      return res.status(200).json(resource);
    } catch (e) {
      return next(e);
    }
  };

  public remove = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<T>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data = await this.service.removeOne(id);
      if (!data) return next(errors.notFound(typeof data));
      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  };
  public update = async (
    req: Request<{ id: string }, {}, Partial<T>>,
    res: Response<T>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data = await this.service.updateOne(id, req.body);
      if (!data) return next(errors.notFound(typeof data));
      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  };

  public create = async (
    req: Request<{}, {}, T>,
    res: Response<T>,
    next: NextFunction
  ) => {
    try {
      const data = await this.service.addOne(req.body);
      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  };
}
