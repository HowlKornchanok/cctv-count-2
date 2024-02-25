import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-larger-size',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './larger-size.component.html',
  styleUrls: ['./larger-size.component.scss'] 
})
export class LargerSizeComponent {
  @Input() selectedCamera: any;
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }


  onClickOutside(): void {
    this.closeModal.emit();
  }

}
