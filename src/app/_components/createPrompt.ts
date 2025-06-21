"use client";

function createPrompt(
  noPromptTill: string | null | undefined,
  openModal: () => void
): void {
  //   noPromptTill = null;
  console.log("This is a test alert to ensure the code is running correctly.");
  if (noPromptTill && !isInPast(noPromptTill)) {
    console.log(
      "You have opted out of prompts until a future date. Please check your settings."
    );
    return;
  }

  const randomNumber = Math.floor(Math.random() * 10);
  if (randomNumber < 4) {
    console.log(
      randomNumber +
        " " +
        "You have been randomly selected to receive a prompt! Please check your settings."
    );
    openModal();
  }
}

function isInPast(isoLocalDateTime: string): boolean {
  // Truncate fractional seconds to 3 digits (milliseconds)
  const msTruncated = isoLocalDateTime.replace(
    /\.(\d{3})\d+/, // find dot + first 3 digits + any more digits
    ".$1" // keep only dot + first 3 digits
  );

  const dt = new Date(msTruncated);
  if (isNaN(dt.getTime())) {
    throw new Error(`Invalid date string: "${isoLocalDateTime}"`);
  }

  return dt.getTime() < Date.now();
}

export default createPrompt;
