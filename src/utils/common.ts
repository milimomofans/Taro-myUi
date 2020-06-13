export function assert(condition: any, msg: string): void {
  if (!condition) {
    throw new Error(`[Apior] ${msg}`)
  }
}
