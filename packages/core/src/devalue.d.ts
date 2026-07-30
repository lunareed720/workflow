/**
 * Local declarations for `devalue`. The dependency is pinned to a git commit
 * (sveltejs/devalue main, awaiting an npm release that includes the
 * pluggable stringify/parse operations interface), and git installs don't
 * run upstream's `prepublishOnly` type build, so the package ships no types.
 * Only the surface @workflow/core actually uses is declared here — delete
 * this file when the dependency moves back to a released npm version.
 */
declare module 'devalue' {
  export class DevalueError extends Error {
    path: string;
    value: unknown;
    root: unknown;
    constructor(
      message: string,
      keys: string[],
      value?: unknown,
      root?: unknown
    );
  }

  /**
   * The default implementations of every introspection operation `stringify`
   * performs on the value being serialized. Overridden members are passed
   * via `stringify`'s `options.operations`.
   */
  export const defaultStringifyOperations: {
    identify(value: unknown): unknown;
    typeOf(value: unknown): string;
    toPrimitive(value: unknown): unknown;
    tagOf(value: object): string;
    isThenable(value: object): boolean;
    toPromise(thenable: object): Promise<unknown>;
    unbox(boxed: object): unknown;
    toISOString(date: Date): string;
    toStringValue(value: object): string;
    regExpInfo(regexp: RegExp): { source: string; flags: string };
    valuesOf(set: Set<unknown>): Iterable<unknown>;
    entriesOf(map: Map<unknown, unknown>): Iterable<[unknown, unknown]>;
    viewInfo(view: ArrayBufferView): {
      buffer: ArrayBufferLike;
      byteOffset: number;
      byteLength: number;
      length?: number;
      bufferByteLength: number;
    };
    toArrayBuffer(buffer: ArrayBuffer): ArrayBuffer;
    lengthOf(array: unknown[]): number;
    hasOwn(value: object, key: string | number): boolean;
    indicesOf(array: unknown[]): Iterable<number>;
    shapeOf(value: object): { kind: string; keys?: string[] };
    get(value: object, key: string | number): unknown;
  };

  export type StringifyOperations = Partial<
    typeof defaultStringifyOperations
  >;

  export function stringify(
    value: unknown,
    reducers?: Record<string, (value: any) => any>,
    options?: { operations?: StringifyOperations }
  ): string;

  export function parse(
    serialized: string,
    revivers?: Record<string, (value: any) => any>,
    options?: { operations?: Record<string, unknown> }
  ): any;

  export function unflatten(
    parsed: unknown,
    revivers?: Record<string, (value: any) => any>,
    options?: { operations?: Record<string, unknown> }
  ): any;
}
