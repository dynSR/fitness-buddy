import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeFormatter {
  /**
   * Formats a given time in seconds to a string with the format MM:SS.
   * @param {number} time - The time in seconds to be formatted.
   * @returns {string} The formatted time as a string.
   */
  public formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Format the time and add a leading zero to have two digits (00:00)
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
