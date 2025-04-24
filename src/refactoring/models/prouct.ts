export const toggleProductIdInSet = (set: Set<string>, productId: string) => {
  const newSet = new Set(set);
  if (newSet.has(productId)) {
    newSet.delete(productId);
  } else {
    newSet.add(productId);
  }
  return newSet;
};
