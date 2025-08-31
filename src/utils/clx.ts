export function clx (...args: (string | number | undefined | unknown)[]): string {
  return args.filter(Boolean).join(' ')
}