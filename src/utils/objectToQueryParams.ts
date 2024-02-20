export default function objectToQueryParams(
  obj: { [key: string]: unknown },
  omitKey?: string
): string {
  const queryParams = new URLSearchParams()

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && key !== omitKey) {
      queryParams.append(key, String(obj[key]))
    }
  }

  return queryParams.toString()
}
