// Each key here is a category of events, pulled from its own published
// Google Sheet tab. To add a new category:
//   1. Create a new tab in the Sheet (e.g. "Youth Events")
//   2. File > Share > Publish to web > select that tab > CSV
//   3. Paste the resulting link below under a new key
//
// Leave a link empty ("") to use placeholder data for that category until
// the real sheet is ready.

export const EVENT_SHEETS = {
  general: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3VJoSxC-RTvwb8JU9jNHkBe4nRCnMmc3HGNshRpXcUaGzM8rtGLfXhTFd74Nnk3PJLdzOJOOUnCWq/pub?gid=0&single=true&output=csv", // e.g. "https://docs.google.com/spreadsheets/d/e/xxxxx/pub?output=csv"
  youth: "",
  prayer: "",
};