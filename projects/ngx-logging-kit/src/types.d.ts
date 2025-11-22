declare module 'vlq' {
  export function decode(string: string): number[];
  export function encode(value: number | number[]): string;
}
