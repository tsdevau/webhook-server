/**
 * @license
 * tpsTech <https://tpstech.dev/>
 * License: MIT
 * Licence Copyright: Copyright (c) 2024 TPS Contractors Pty Ltd and its affiliates.  All rights reserved.
 * Licensed under the MIT License. See LICENCE in the project root for license information.
 *
 * @author @tsdevau
 */

import express from "express"
import { readFileSync } from "fs"
import http from "http"
import https from "https"
import { logOutput } from "./logger"
import { processPayload } from "./processPayload"
import { verifyPayload } from "./verifyPayload"

// Set up the environment variables.
const whPath = process.env.WH_PATH ?? "/webhook"
const whHost = process.env.WH_HOST ?? "localhost"

// HTTP variables - required if using an HTTP server.
// If not using HTTP, you can remove this block.
const httpPort = process.env.HTTP_PORT ?? 3001

// HTTPS variables - required if using an HTTPS server.
// If not using HTTPS, you can remove this block.
const httpsHost = process.env.HTTPS_HOST ?? whHost
const httpsPort = process.env.HTTPS_PORT ?? 3002
const httpsKey = process.env.HTTPS_KEY ?? readFileSync("path/to/https/key")
const httpsCert = process.env.HTTPS_CERT ?? readFileSync("path/to/https/cert")
const credentials = { key: httpsKey, cert: httpsCert }

// Set up the express app.
const app = express()

// Set up any required middlewares, like JSON Parsing, Verification etc.
// TODO - add any required middlewares here.

// Configure endpoint routes.
app.post(whPath, (req, res) => {
  // Verify the webhook payload is trusted if required. If it's not trusted, return a 401. If it is, return a 202.
  const isValid = verifyPayload(req)
  if (!isValid) {
    res.status(401).send("Unauthorised - Invalid payload signature.")
    logOutput("Unauthorised request received - Invalid payload signature.")
    return
  }
  res.status(202).send(`Webhook received on ${whHost}:${httpPort}${whPath}!`)
  logOutput("Validated request payload received.")

  // Process the webhook payload here.
  const payload = req.body
  const isProcessed = processPayload(payload)
  logOutput(`Payload was${isProcessed ? "" : " not"} processed successfully.`)
  return
})

// Start the HTTPS server.
const httpsServer = https.createServer(credentials, app)
httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS listener is running on https://${httpsHost}:${httpsPort}`)
})

// Start the HTTP server.
const httpServer = http.createServer(app)
httpServer.listen(httpPort, () => {
  console.log(`HTTP listener is running on http://${whHost}:${httpPort}`)
})
