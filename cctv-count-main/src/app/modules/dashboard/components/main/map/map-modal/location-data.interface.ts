export interface LocationData {
    location_no: number;
    location_name: string;
    lat: number;
    lon: number;
    cameras: CameraData[];
  }
  
  export interface CameraData {
    camera_no: number;
    status: string;
    days_after_last_maintenance: number;
    streaming_link: string;
  }
  