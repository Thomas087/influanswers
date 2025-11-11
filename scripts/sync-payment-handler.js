#!/usr/bin/env node

/**
 * Sync script to copy the shared payment intent handler to both function directories
 * This ensures DRY while maintaining compatibility with Supabase Edge Function deployment
 */

import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootDir = join(__dirname, '..')
const sharedFile = join(rootDir, 'supabase/functions/_shared/payment-intent-handler.ts')
const targetDirs = [
  join(rootDir, 'supabase/functions/create-payment-intent'),
  join(rootDir, 'supabase/functions/create-payment-intent-test'),
]

if (!existsSync(sharedFile)) {
  console.error(`Error: Shared file not found at ${sharedFile}`)
  process.exit(1)
}

console.log('Syncing payment intent handler to function directories...')

targetDirs.forEach((targetDir) => {
  if (!existsSync(targetDir)) {
    console.warn(`Warning: Target directory not found: ${targetDir}`)
    return
  }

  const targetFile = join(targetDir, 'payment-intent-handler.ts')
  copyFileSync(sharedFile, targetFile)
  console.log(`✓ Copied to ${targetFile}`)
})

console.log('Sync complete!')

