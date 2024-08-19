import { v4 as uuidv4 } from "uuid";
// Utility function to create a unique file key
export function generateFileKey(fileName: string): string {
  // Replace spaces with hyphens and convert to lowercase
  const sanitizedFileName = fileName.replace(/\s+/g, "-").toLowerCase();
  // Generate a unique identifier
  const uniqueId = uuidv4();
  // Create a unique file key combining sanitized name and unique identifier
  return `${sanitizedFileName}-${uniqueId}`;
}
