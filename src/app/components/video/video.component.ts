import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    /*    const videoElem = document.querySelector('.sample-video');
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
    } */

    //const imgElem = document.querySelector('.sample-img');

    /**TODO: 1분코딩 캔버스 검색, 이 2줄 코딩은 캔버스 기본 context로 그리는 역할 */
    const canvas = document.querySelector('.sample-canvas');
    const context = (canvas as HTMLCanvasElement).getContext('2d');

    let loadedImgeCount = 0;
    //이미지가 960개니깐 10%는 96개
    let totalImgesCount = 960;
    const videoImages = [];

    function loadImages() {
      for (let i = 0; i < totalImgesCount; i++) {
        let imgElem = new Image();
        imgElem.src = `../../../assets/video/002/IMG_${7027 + i}.JPG`;
        videoImages.push(imgElem);

        imgElem.addEventListener('load', function () {
          loadedImgeCount++;
          if (loadedImgeCount === totalImgesCount) {
            console.log('이미지 로드 완료');
            init();
          }
        });
      }
    }

    loadImages();

    let progress;
    let currentFrame;
    function init() {
      window.addEventListener('scroll', function () {
        progress =
          pageYOffset / (document.body.offsetHeight - window.innerHeight);
        console.log(progress);
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        requestAnimationFrame(function () {
          currentFrame = Math.round((totalImgesCount - 1) * progress);
          /* (imgElem as HTMLImageElement).src = (videoImages[
            currentFrame
          ] as HTMLImageElement).src; */
          context.drawImage(videoImages[currentFrame], 0, 0);
        });
      });
    }
  }
}
