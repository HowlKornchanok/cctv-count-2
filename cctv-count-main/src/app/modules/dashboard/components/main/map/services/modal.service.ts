import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocationData } from '../map-modal/location-data.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ModalService {


  private locationDataSubject = new BehaviorSubject<LocationData[]>([]);
  locationData$ = this.locationDataSubject.asObservable();


  setLocationData(data: LocationData[]): void {
    this.locationDataSubject.next(data);
    console.log('Location data set:', data);
  }

  getLocationDataByNumber(locationNumber: number): Observable<LocationData | undefined> {
    return this.locationData$.pipe(
      map((locationData: LocationData[]) => {
        const foundLocation = locationData.find((data: LocationData) => data.location_no === locationNumber);
        console.log('Location data retrieved:', foundLocation);
        return foundLocation;
      })
    );
  }
}
