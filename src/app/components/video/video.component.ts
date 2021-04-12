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

      init();
    });

    let progress;
    let currentFrame;
    function init() {
      window.addEventListener('scroll', function () {
        videoDuration = (videoElem as HTMLMediaElement).duration;
        progress =
          pageYOffset / (document.body.offsetHeight - window.innerHeight);
        console.log(progress);
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        requestAnimationFrame(function () {
          (videoElem as HTMLMediaElement).currentTime =
            videoDuration * progress;
        });
      });
    }
  }
}
