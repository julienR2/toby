import fs from 'fs'
import path from 'path'

import { version } from '../package.json'

const previousVersionCode = version.split('.').slice(-1)[0]
const nextVersionCode = +previousVersionCode + 1
const nextVersion = `0.0.${nextVersionCode}`

const PACKAGE_PATH = path.join(__dirname, '../package.json')
const MANIFEST_PATH = path.join(
  __dirname,
  '../android/app/src/main/AndroidManifest.xml',
)

fs.writeFileSync(
  PACKAGE_PATH,
  fs.readFileSync(PACKAGE_PATH, 'utf-8').replace(version, nextVersion),
)
fs.writeFileSync(
  MANIFEST_PATH,
  fs
    .readFileSync(MANIFEST_PATH, 'utf-8')
    .replace(version, nextVersion)
    .replace(previousVersionCode, `${nextVersionCode}`),
)
