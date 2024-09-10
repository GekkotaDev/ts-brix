class Pipeline<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  /**
   * Use the result of the previous expression as the input of this current
   * unary function.
   */
  to<R>(unary: (value: T) => Pipeline<R>): Pipeline<R>;

  /**
   * Use the result of the previous expression as the input of this current
   * unary function.
   */
  to<R>(unary: (value: T) => R): Pipeline<R>;

  to<R>(unary: ((value: T) => R) | ((value: T) => Pipeline<R>)): Pipeline<R> {
    const result = unary(this.value);
    if (result instanceof Pipeline) return result;
    return new Pipeline<R>(result);
  }
}

export const pipe = Object.assign(
  <T>(initialValue: T): Pipeline<T> => new Pipeline(initialValue),
  {
    line: <T>(pipeline: Pipeline<T>): T => pipeline.value,
  },
);
