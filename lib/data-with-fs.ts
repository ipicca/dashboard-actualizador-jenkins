// Alternative implementation that reads from the JSON file
// Uncomment and use this instead of the mock data if you want to read from the file
/*
import fs from 'fs/promises'
import path from 'path'

export async function getData() {
  const filePath = path.join(process.cwd(), 'data/dashboard-data.json')
  const fileContents = await fs.readFile(filePath, 'utf8')
  return JSON.parse(fileContents)
}
*/
