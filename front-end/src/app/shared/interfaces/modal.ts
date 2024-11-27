export interface IModal {
  title: string;
  description: string;
  btnTitle: string;
  isCentered: boolean;
  cancelBtnText: string;
  validateBtnText: string;

  setPosition(isCentered: boolean): void;
  onValidation(): void;
}
