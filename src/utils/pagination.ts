import prisma from '../../prisma/client';

export const paginate = async (model: string, customFilter: any = {}, page: number = 1, limit: number = 40) => {
  const offset = (page - 1) * limit;
  // @ts-ignore
  const data = await prisma[model].findMany({
    ...customFilter,
    skip: +offset,
    take: +limit,
  });
  // Pass the where clause only to the count method
  const { where } = customFilter;
  // @ts-ignore
  const total = await prisma[model].count({ where });
  return {
    pagination: {
      total_pages: Math.ceil(total / limit) || 1,
      total_records: total,
      page: +page,
      limit: +limit,
    },
    data,
  };
};
