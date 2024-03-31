import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-extend-session-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './extend-session-modal.component.html',
  styleUrl: './extend-session-modal.component.scss'
})
export class ExtendSessionModalComponent {
  @Output() sessionExtended = new EventEmitter<boolean>();

  extendSession(extend: boolean): void {
    this.sessionExtended.emit(extend);
  }
}