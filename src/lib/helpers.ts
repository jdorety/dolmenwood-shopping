type LookupFunction<T = unknown> = (
  tables: Record<string, unknown>,
  tableKey: string,
  index: number
) => T;

export const lookupItem: LookupFunction<GameItem> = (
  tables: Record<string, unknown>,
  tableKey: string,
  index: number
) => {
  if (!tables.hasOwnProperty(tableKey)) throw new Error("Item table missing");
  const lookup = tables[tableKey];
  if (!Array.isArray(lookup)) throw new Error("Table is not an Array");
  const item = lookup[index];
  if (!item) throw new Error("Item not found in table");
  return item;
};

export const lookupItemDescription: LookupFunction<string> = (...args) => {
  const item = lookupItem(...args);
  const { description } = item;
  if (!description) throw new Error("No description available");
  return description;
};

export function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
