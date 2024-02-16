import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Hls from 'hls.js';

@Component({
  selector: '[appHlsVideoPlayer]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hls-video-player.component.html',
  styleUrl: './hls-video-player.component.scss'
})

export class HlsVideoPlayerComponent implements OnInit {
  @Input() stream!: string;

  private video: HTMLVideoElement;
  private hls!: Hls;

  constructor(private elementRef: ElementRef) {
    this.video = this.elementRef.nativeElement.querySelector('video');
  }

  ngOnInit() {
    console.log('Stream: ', this.stream);
    this.establishHlsStream();
  }

  private establishHlsStream() {
    if (this.hls) {
      this.hls.destroy();
    }
    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.attachMedia(this.video);
      this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log('video and hls.js are now bound together !');
        this.hls.loadSource(this.stream);
        this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          console.log(
            'manifest loaded, found ' + data.levels.length + ' quality level'
          );
        });
      });

      this.hls.on(Hls.Events.ERROR, (event, data) => {
        console.log(data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('fatal network error encountered, try to recover');
              this.hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('fatal media error encountered, try to recover');
              this.hls.recoverMediaError();
              break;
            default:
              this.hls.destroy();
              break;
          }
        }
      });
    }
  }
}