import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const videoElem = document.querySelector('.sample-video');
    let videoDuration;

    videoElem.addEventListener('loadeddata', function () {
      console.log('비디오 로드 완료');
      videoDuration = (videoElem as HTMLMediaElement).duration;
      console.log(videoDuration);
      init();
    });

    function init() {}
  }
}
