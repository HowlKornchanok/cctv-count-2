import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StationData } from 'src/app/core/interfaces/station-data.interface';

@Component({
  selector: 'app-station-add-modal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './station-add-modal.component.html',
  styleUrls: ['./station-add-modal.component.scss'], // Corrected property name
})
export class StationAddModalComponent implements OnInit {

  @Input() newStation!: StationData;
  @Output() saveChangesAction: EventEmitter<StationData> = new EventEmitter<StationData>(); // Corrected event emitter type
  @Output() cancelAction: EventEmitter<void> = new EventEmitter<void>();

  editedStation!: StationData; // Corrected property name

  constructor() { }

  ngOnInit(): void {
    this.editedStation = { ...this.newStation };
  }

  saveChanges(): void {
    this.saveChangesAction.emit(this.newStation);
  }

  cancel(): void {
    this.cancelAction.emit();
  }
}
