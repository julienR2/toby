export function ignoreList<S extends { [key: string]: any }>(
  keys: (keyof S)[],
) {
  return (state: S) =>
    Object.fromEntries(
      Object.entries(state).filter(([key]) => !keys.includes(key)),
    )
}
