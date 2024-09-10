import type { Result } from "ts-results";
import { Ok, Err } from "ts-results";

export function ok<_, E>(value: Err<E>): Err<E>;
export function ok<T, _>(value: Ok<T>): Ok<T>;
export function ok<T, _>(value: T): Ok<T>;
export function ok<T, E>(value: Err<E> | Ok<T> | T) {
  if (value instanceof Err) return value;
  if (value instanceof Ok) return value;
  return new Ok(value);
}

export function err<_, E>(value: Err<E>): Err<E>;
export function err<_, E>(value: E): Err<E>;
export function err<_, E>(value: Err<E> | E) {
  if (value instanceof Err) return value;
  return new Err(value);
}

export const result = <T = never, E = unknown>(
  scope: () => Result<T, E>,
): Result<T, E & unknown> => {
  try {
    return scope();
  } catch (error) {
    return new Err(error as E);
  }
};
