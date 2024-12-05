export interface Icon {
  src: string;
  alt: string;
  title: string;
  class: string | undefined;

  setIcon(src: string): void;
  setAlt(alt: string): void;
  setTitle(title: string): void;
}
