import Control from 'ol/control/Control';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';

export class ZoomToCentralPin extends Control {
  private map: Map;

  constructor(map: Map, center: number[]) {
    const container = document.createElement('div');
    container.className = 'ol-zoom-to-central-pin ol-unselectable ol-control';

    const zoomToCentralPinButton = document.createElement('button');
    zoomToCentralPinButton.style.width = '100px';
    zoomToCentralPinButton.innerHTML = 'Center';
    zoomToCentralPinButton.style.position = 'absolute';
    zoomToCentralPinButton.style.top = '34rem';
    zoomToCentralPinButton.style.left = '0.5rem';
    zoomToCentralPinButton.addEventListener('click', () => {
      this.zoomToCentralPin(center);
    });

    container.appendChild(zoomToCentralPinButton);

    super({
      element: container,
      target: undefined,
    });

    this.map = map;
  }

  private zoomToCentralPin(center: number[]): void {
    const view = this.map.getView() as View;
    const centralPinCoordinates = fromLonLat(center);
    const zoomLevel = 13;
    view.animate({
      center: centralPinCoordinates,
      zoom: zoomLevel,
      duration: 1000,
    });
  }
}
