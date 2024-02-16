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
import { mySecretFn } from "../secrets/mySecretFns"

const app = express()
const whPort = process.env.WH_PORT ?? 3009
const whPath = process.env.WH_PATH ?? "/webhook"
const whHost = process.env.WH_HOST ?? "http://localhost"

// Set up the middleware for parsing JSON
app.use(express.json())

app.post(whPath, (req, res) => {
  console.log("Webhook received!")
  // TODO - process the webhook payload - like run mySecretFn
  mySecretFn()
  res.status(200).send("Webhook received!")
})

app.listen(whPort, () => {
  console.log(`Webhook listener running on ${whHost}:${whPort}`)
})
