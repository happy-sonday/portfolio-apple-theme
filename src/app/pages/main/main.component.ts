import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let yOffset = 0; //window.pageYOffset 대신
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; //현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
    const sceneInfo = [
      {
        typeof: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0, //각 스크롤의 높이 정보
        objs: {
          container: document.querySelector('#scroll-section-0'),
        },
      },
      {
        type: 'normal',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0, //각 스크롤의 높이 정보
        objs: {
          container: document.querySelector('#scroll-section-1'),
        },
      },
      {
        typeof: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0, //각 스크롤의 높이 정보
        objs: {
          container: document.querySelector('#scroll-section-2'),
        },
      },
      {
        typeof: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0, //각 스크롤의 높이 정보
        objs: {
          container: document.querySelector('#scroll-section-3'),
        },
      },
    ];

    setLayout();

    /** 각 스크롤의 섹션 높이 세팅 */
    function setLayout() {
      for (let i = 0; i < sceneInfo.length; i++) {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        (sceneInfo[i].objs
          .container as HTMLElement).style.height = `${sceneInfo[i].scrollHeight}px`;
      }
    }

    /** */
    function scrollLoop() {
      prevScrollHeight = 0;
      for (let i = 0; i < currentScene; i++) {
        prevScrollHeight += sceneInfo[i].scrollHeight;
      }

      if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
        currentScene++;
      }

      if (yOffset < prevScrollHeight) {
        currentScene--;
      }

      console.log(currentScene);
    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset;
      scrollLoop();
    });
  }
}
