/**
 * Result type pattern matching utilities.
 */
export class ResultOf {
  static ok(): { ok: true; err: false };
  static ok<T>(type: T): { ok: true; err: false; val: T };
  static ok<T>(type?: T) {
    const condition = { ok: true, err: false } as const;

    if (type) return { ...condition, val: type } as const;
    return condition;
  }

  static err(): { ok: false; err: true };
  static err<E>(type: E): { ok: false; err: true; val: E };
  static err<E>(type?: E) {
    const condition = { ok: false, err: true } as const;

    if (type) return { ...condition, val: type } as const;
    return condition;
  }
}
export const resultOf = ResultOf;
