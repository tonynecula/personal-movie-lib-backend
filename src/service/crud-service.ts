import mongoose, { ObjectId, PipelineStage } from "mongoose";
import { MongoUtils, PagedResponse } from "../util/mongoUtils";

/**
 * Provides simple handlers for CRUD operations.
 */
export abstract class CrudService<T extends mongoose.Document> {
  /**
   * Protected constructor, not meant to be instantiated directly.
   *
   * @param model - this generic model will handle CRUD operations
   */
  protected constructor(protected model: mongoose.Model<T>) {}

  public async list(
    query: FilterParams,
    match: Partial<T>,
    options: any = {}
  ): Promise<PagedResponse<T>> {
    const [data] = await this.model.aggregate(
      this.buildAggregations(query, match, options)
    );
    return data || { data: [], total: 0 };
  }

  public async addOne(data: T): Promise<T> {
    return this.model.create<any>(data);
  }

  // conversion to any --> make compiler happy (didn't found other way)
  public async getById(id: string | ObjectId): Promise<T | null> {
    return this.model.findOne({ _id: id as any });
  }

  public async updateOne(id: string | ObjectId, updates: Partial<T>) {
    return this.model.findOneAndUpdate(
      { _id: id as any },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { ...updates },
      { new: true }
    );
  }

  public async removeOne(id: string | ObjectId) {
    return this.model.findOneAndRemove({ _id: id as any });
  }

  // TODO: create adminBuildAggregations and adminList ?

  /**
   * This method is meant to be overridden in child services to provide the appropriate aggregation stages in get
   * requests like get list or get by id.
   *
   * This implementation should handle basic aggregation stages like $sort, $skip, $limit.
   *
   * Some implementation may want to include particular fields with $lookup, or exclude others. Use the options
   * parameter to specify such preferences, check their presence and push the stages.
   *
   * @param query - a filter to be applied
   * @param options
   */
  protected buildAggregations(
    query: FilterParams,
    match: Partial<T>,
    pipelineData?: PipelineStage[]
  ): PipelineStage[] {
    const { ids } = query;
    const $match: any = match || {};

    if (ids) {
      $match._id = { $in: ids.map((id: string) => ObjectId(id)) };
    }

    const aggregations: any[] = [
      { $match },
      ...MongoUtils.buildPaginationStages(query, pipelineData || []),
    ];
    return aggregations;
  }
}
