/**
 * @license
 * tpsTech <https://tpstech.dev/>
 * License: MIT
 * Licence Copyright: Copyright (c) 2024 TPS Contractors Pty Ltd and its affiliates.  All rights reserved.
 * Licensed under the MIT License. See LICENCE in the project root for license information.
 *
 * @author @tsdevau
 */

import { createHmac, timingSafeEqual } from "crypto"
import { type Request } from "express"

const whSecret = process.env.WH_SECRET ?? "my-super-secure-secret"

/**
 * Verifies the payload signature of a request.
 * @param {Request} req - The request object.
 * @returns {boolean} A boolean indicating whether the payload signature is valid.
 */
export function verifyPayload(req: Request): boolean {
  const requestSignature = req?.headers?.["some-signature-header"] as string
  if (!requestSignature) {
    return false
  }
  const localSignature = createHmac("sha256", whSecret)
    .update(JSON.stringify(req.body))
    .digest("hex")
  const trustedSignature = Buffer.from(`sha256=${localSignature}`, "ascii")
  const unverifiedSignature = Buffer.from(requestSignature, "ascii")
  return timingSafeEqual(trustedSignature, unverifiedSignature)
}
