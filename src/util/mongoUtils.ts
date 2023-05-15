import mongoose, { PipelineStage } from "mongoose";

export interface PagedResponse<T> {
  total: number;
  data: T[];
}

export class MongoUtils {
  public static ObjectId(id: string) {
    return new mongoose.Types.ObjectId(id);
  }

  /**
   * This method is meant to be applied as the last stages of an aggregation pipeline for an admin list request
   *
   * It applies a group stage that returns the total number of documents found, and handles pagination by
   * slicing the resulting data array of documents.
   *
   * @param query - an object that contains information about pagination and sort
   */
  public static buildPaginationStages(
    query: FilterParams,
    pipelineData: PipelineStage[] = []
  ) {
    const { pageOffset, pageLength, sort, summary } = query;
    let $sort: { [key: string]: -1 | 1 } = { _id: -1 };
    if (sort) {
      $sort = {};
      $sort[sort.field] = sort.direction;
    }

    if (pageOffset != null && pageLength != null) {
      pipelineData.unshift({ $limit: pageLength });
      pipelineData.unshift({ $skip: pageOffset * pageLength });
    }

    if (summary) pipelineData.push({ $project: summary });

    return [
      { $sort },
      {
        $facet: {
          data: pipelineData,
          total: [{ $count: "total" }],
        },
      },
      { $unwind: "$total" },
      {
        $project: {
          data: "$data",
          total: "$total.total",
        },
      },
    ];
  }

  public static buildLookup(
    from: string,
    localField: string,
    foreignField: string,
    as: string
  ): PipelineStage[] {
    return [
      { $lookup: { from, localField, foreignField, as } },
      {
        $unwind: {
          path: `$${as}`,
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
  }
}
