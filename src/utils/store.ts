export const ignoreList =
  <S extends { [key: string]: any }>(keys: Array<keyof S>) =>
  (state: S) =>
    Object.fromEntries(
      Object.entries(state).filter(([key]) => !keys.includes(key)),
    )