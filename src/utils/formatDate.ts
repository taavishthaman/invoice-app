export function formatDate(dateString: string, daysToAdd: number = 0): string {
  const date: Date = new Date(dateString);
  date.setDate(date.getDate() + daysToAdd);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}
