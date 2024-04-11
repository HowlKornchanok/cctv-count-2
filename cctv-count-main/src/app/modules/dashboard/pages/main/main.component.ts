import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../components/main/main-header/main-header.component';
import { MapComponent } from '../../components/main/map/map.component';
import { ApiStackedColumnComponent } from '../../components/main/api-stacked-column/api-stacked-column.component';



@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    standalone: true,
    imports: [
        MainHeaderComponent,
        MapComponent,
        ApiStackedColumnComponent,
    ],
    
})
export class MainComponent  {
 
}
