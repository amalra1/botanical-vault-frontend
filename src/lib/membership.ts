export function withMembership(
  ids: Set<number>,
  collectionId: number,
  isMember: boolean,
) {
  const next = new Set(ids);
  if (isMember) {
    next.add(collectionId);
  } else {
    next.delete(collectionId);
  }
  return next;
}
