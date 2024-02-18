import { logOutput } from "./logger"

/**
 * Processes the payload received from a webhook or other POST request.
 *
 * @param payload - The payload to be processed. It can be either a JSON object or a string.
 * @returns A boolean indicating whether the payload was successfully processed.
 */
export const processPayload = (payload: JSON | string) => {
  try {
    logOutput(
      `Do something with the request payload here:\n${JSON.stringify(payload, null, 2)}`,
      undefined,
      "info",
    )
    return true
  } catch (error: unknown) {
    logOutput(`Error processing request payload: ${error}`, "Processing Error", "error")
    return false
  }
}
