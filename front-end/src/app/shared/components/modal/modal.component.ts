import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) cancelBtnText!: string;
  @Input({ required: true }) validateBtnText!: string;
}
