import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCameraComponent } from '../../components/cameras/all-camera/all-camera.component';
@Component({
  selector: 'app-cameras',
  standalone: true,
  imports: [
    CommonModule,
    AllCameraComponent],
  templateUrl: './cameras.component.html',
  styleUrl: './cameras.component.scss'
})
export class CamerasComponent {

}
