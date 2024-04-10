export const lookupItem = (
  tables: Record<string, unknown>,
  tableKey: string,
  index: number
) => {
  if (tables.hasOwnProperty(tableKey)) {
    const lookup = tables[tableKey];
    if (!Array.isArray(lookup)) throw new Error("Table appears corrupted");
    const item = lookup[index];
    return item?.description;
  } else throw new Error("Item table missing");
};
