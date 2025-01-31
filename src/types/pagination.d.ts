export type PaginateType<T> = {
  data: T[];
  pagination: {
    total_pages: number;
    total_records: number;
    page: number;
    limit: number;
  };
};
