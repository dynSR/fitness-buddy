export class InputSystem {
  private static KEY_DOWN = 'keydown';
  private static KEY_UP = 'keyup';

  public static handleKeyDown(key: string, onKeyDown: () => void): void {
    document.addEventListener('keydown', (event) => {
      if (event.code === key && event.type === InputSystem.KEY_DOWN) {
        event.preventDefault();
        onKeyDown();
      }
    });
  }

  public static handleKeyUp(key: string, onKeyUp: () => void): void {
    document.addEventListener('keydown', (event) => {
      if (event.code === key && event.type === InputSystem.KEY_UP) {
        event.preventDefault();
        onKeyUp();
      }
    });
  }
}
