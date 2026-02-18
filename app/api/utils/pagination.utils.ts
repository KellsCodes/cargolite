import prisma from "@/lib/prisma";

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageLength: number;
  };
}

export const paginate = async <T>(
  model: any,
  options: {
    page?: number;
    limit?: number;
    where?: object;
    include?: object;
    orderBy?: object;
  }
): Promise<PaginatedResult<T>> => {
  const page = Math.max(1, options.page || 1);
  const limit = Math.max(1, options.limit || 10);
  const skip = (page - 1) * limit;

  // Run count and findMany in parallel
  const [items, totalItems] = await Promise.all([
    model.findMany({
      skip,
      take: limit,
      where: options.where,
      include: options.include,
      orderBy: options.orderBy || { createdAt: "desc" },
    }),
    model.count({ where: options.where }),
  ]);

  return {
    data: items,
    meta: {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      pageLength: items.length,
    },
  };
};
