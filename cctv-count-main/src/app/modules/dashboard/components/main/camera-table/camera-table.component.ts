import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDataService } from '../map/services/map-data.service';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: '[camera-table]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera-table.component.html',
  styles: [],
  providers: [MapDataService]
})

export class CameraTableComponent implements OnInit, OnDestroy {
  public jsonData: any[] = [];
  public groupedData: any[] = [];
  private dataServiceSubscription: Subscription | undefined;
  currentLanguage: string = 'th';
  translations = this.languageService.translations
  

  constructor(private cameraLocationService: MapDataService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });

    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
  }

  private loadData(): void {
    // Assuming you have a method in your service to get camera data
    this.cameraLocationService.getMapData().subscribe((data) => {
      this.jsonData = data;
    });
  }

  getActiveCameraCount(cameras: any[]): number {
    return cameras.filter(camera => camera.status === 'active').length;
  }

  getInactiveCameras(cameras: any[]): string[] {
    return cameras.filter(camera => camera.status === 'inactive').map(camera => `camera ${camera.camera_no}`);
  }
}

