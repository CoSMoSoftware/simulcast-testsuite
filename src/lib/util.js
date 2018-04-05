import fs from 'fs'
import crypto from 'crypto'
import { promisify } from 'util'

export const readFile = promisify(fs.readFile)
export const randomBytes = promisify(crypto.randomBytes)

export const randomId = async () => {
  const buffer = await randomBytes(16)
  return buffer.toString('hex')
}

export const wrapHandler = handler =>
  (request, response, next) =>
    handler(request, response)
      .catch(next)
