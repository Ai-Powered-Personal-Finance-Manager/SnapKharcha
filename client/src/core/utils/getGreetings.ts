// Function to get dynamic greeting based on time
export function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { text: "Good morning" };
  } else if (hour >= 12 && hour < 17) {
    return { text: "Good afternoon" };
  } else if (hour >= 17 && hour < 21) {
    return { text: "Good evening" };
  } else {
    return { text: "Good night" };
  }
}
