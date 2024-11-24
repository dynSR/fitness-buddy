export interface IDisplayable {
  isDisplayed: boolean;
  isDisplayable: boolean;

  displayedClassName: string;
  hiddenClassName: string;

  display(): void;
  hide(): void;
}
