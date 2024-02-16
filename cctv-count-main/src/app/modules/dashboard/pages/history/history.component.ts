import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryTableComponent } from '../../components/history/history-table/history-table.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule,HistoryTableComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

}
