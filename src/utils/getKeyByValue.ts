export const getKeyByValue = (
  obj: object,
  value: string
): number | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const entry = Object.entries(obj).find(([_, v]) => v === value)
  return entry ? parseInt(entry[0]) : undefined
}
