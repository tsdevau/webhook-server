/**
 * @license
 * tpsTech <https://tpstech.dev/>
 * License: MIT
 * Licence Copyright: Copyright (c) 2024 TPS Contractors Pty Ltd and its affiliates.  All rights reserved.
 * Licensed under the MIT License. See LICENCE in the project root for license information.
 *
 * @author @tsdevau
 */

import chalk from "chalk"

/**
 * Logging variants union type
 */
export type LoggerVariant = "success" | "info" | "warning" | "error"

/**
 * Parameters for logOutputFormat function
 */
export interface LoggerProps {
  message: string
  name?: string
  variant?: LoggerVariant
}

/**
 * Logs a message to the console with a variant.
 * @param {string} message The message to log.
 * @param {string} name The name of the message.
 * @param {LoggerVariant} variant The variant of the message.
 */
export function logOutput(message: string, name?: string, variant: LoggerVariant = "success") {
  return formatOutput({
    message,
    name,
    variant,
  })
}

/**
 * Handles the formatting of log and error output.
 * @param {LoggerProps} options object containing the message, name, variant, and showIcon properties.
 */
function formatOutput(options: LoggerProps) {
  const defaultOptions: LoggerProps = {
    message: "No further detail available.",
    name: undefined,
    variant: "error",
  }
  const { variant, name, message } = { ...defaultOptions, ...options }
  const variantFormat = {
    info: { icon: "ⓘ ", colour: chalk.cyan, logFn: console.info },
    success: { icon: "✔ ", colour: chalk.green, logFn: console.log },
    warning: { icon: "⚠ ", colour: chalk.yellow, logFn: console.warn },
    error: { icon: "! ", colour: chalk.redBright, logFn: console.error },
  }
  const vf = variantFormat[variant as keyof typeof variantFormat]

  vf.logFn(
    `${vf.colour(vf.icon)}${chalk.grey(`${logDate()}: `)}${name ? `${vf.colour.inverse(` ${name} `)}\n${vf.colour(vf.icon)}${chalk.grey(`${logDate()}: `)}` : ""}${vf.colour(message)}`,
  )
}

/**
 * Generates the current date in locale timezone in the format `DD-MM-YYYY, HH:MM:SS`
 * @returns {string} date string as `DD-MM-YYYY, HH:MM:SS`
 *
 * @note Uses `"en-GB"` locale settings to get the log format without needing extra option parameters.
 */
function logDate(): string {
  return new Date().toLocaleString("en-GB")
}
