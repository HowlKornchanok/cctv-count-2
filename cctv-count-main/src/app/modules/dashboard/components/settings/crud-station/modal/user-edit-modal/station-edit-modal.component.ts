import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StationData } from 'src/app/core/interfaces/station-data.interface';

@Component({
  selector: 'app-station-edit-modal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './station-edit-modal.component.html',
  styleUrls: ['./station-edit-modal.component.scss'], // Corrected property name
})
export class StationEditModalComponent implements OnInit {

  @Input() station!: StationData; 
  @Output() saveChangesAction: EventEmitter<StationData> = new EventEmitter<StationData>();
  @Output() cancelAction: EventEmitter<void> = new EventEmitter<void>();

  selectStation!: StationData; 

  constructor() { }

  ngOnInit(): void {
    this.selectStation = { ...this.station }; 
  }

  saveChanges(): void {
    this.saveChangesAction.emit(this.selectStation); 
  }

  cancel(): void { 
    this.cancelAction.emit();
  }
}
