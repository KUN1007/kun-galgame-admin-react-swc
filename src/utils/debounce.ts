// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void

let timeoutId: ReturnType<typeof setTimeout>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  options: { immediate?: boolean } = {}
): DebouncedFunction<T> => {
  return (...args) => {
    if (options.immediate && !timeoutId) {
      func()
    }

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
