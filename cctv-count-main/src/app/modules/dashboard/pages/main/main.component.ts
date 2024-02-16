import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../components/main/main-header/main-header.component';
import { MainColumnChart } from '../../components/main/column-chart/column-chart.component';
import { MapComponent } from '../../components/main/map/map.component';
import { ApiStackedColumnComponent } from '../../components/main/api-stacked-column/api-stacked-column.component';
import { CameraTableComponent } from '../../components/main/camera-table/camera-table.component';
import { WarningComponent } from '../../components/main/warning/warning.component';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    standalone: true,
    imports: [
        MainHeaderComponent,
        MainColumnChart,
        MapComponent,
        ApiStackedColumnComponent,
        CameraTableComponent,
        WarningComponent,

    ],
    
})
export class MainComponent  {
 
}
