import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CameraDataService } from 'src/app/core/services/camera-data.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private cameraDataSubject = new BehaviorSubject<number | undefined>(undefined);
  cameraData$ = this.cameraDataSubject.asObservable();

  setCameraData(cameraData: any): void {
    console.log('Camera data set:', cameraData);
    this.cameraDataSubject.next(cameraData);
    
  }   
}
