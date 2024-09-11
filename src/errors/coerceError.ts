/**
 * This is utility function should be used in every `catch` block
 * that does something with the inputted `err`. This is because the
 * `catch` block's error input is not always guaranteed to be an `Error`.
 * It can be a string (ex: `throw "my silly string"`) or any other unpredictable type.
 *
 * Essentially, this function guarantees you are working with an error.
 *
 * @param {unknown} err Possibly an error
 * @returns {Error} The original error, or a newly constructed error if the input was not already an error
 */
export function coerceError(err: unknown): Error {
  if (err instanceof Error) {
    return err
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any --
   * There is no way to know what `err` is but we are safely accessing it to mitigate any risk */
  return new Error((err as any)?.message || 'Non-standard Error')
}
