export const calculatePagesCount = (items, perPage) =>
  items % perPage !== 0
    ? Number.parseInt(items / perPage) + 1
    : Number.parseInt(items / perPage);
