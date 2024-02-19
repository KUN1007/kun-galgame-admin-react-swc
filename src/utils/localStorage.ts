export const getLocalStorage = <T>(name: string) => {
  const localString = localStorage.getItem(name)
  if (localString) {
    return JSON.parse(localString) as T
  }
}
