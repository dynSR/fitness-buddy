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
  public formatToSecondsMinutes(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Format the time and add a leading zero to have two digits (00:00)
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  public formatToSecondsMinutesMilliseconds(time: number): string {
    const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format (00:00:000)
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0');

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }
}
