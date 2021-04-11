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
    let bodyElem = document.querySelector('.content-body');
    //기본 섹션값 및 새로고침시 sticky elem이 보일 수 있도록 대응

    bodyElem.setAttribute('id', `show-scene-0`);

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

      yOffset = window.pageYOffset;

      //해당 스크롤 섹션 및 스크롤위치에서 새로고침시 sticky elem 정보가 보이도록 작업
      //각 섹션마다 높이 누적값과 현재 스크롤 위치값을 비교
      let totalScrollHeight = 0;
      for (let i = 0; i < sceneInfo.length; i++) {
        totalScrollHeight += sceneInfo[i].scrollHeight;

        if (totalScrollHeight >= yOffset) {
          currentScene = i;
          break;
        }
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
        if (currentScene === 0) return; //브라우저 바운스 효과로 인해(e. 아이폰 새로고침) 마이너스가 되는 것을 방지(모바일)
        currentScene--;
      }

      //angular에서 해당 컴포넌트 내 외부 tag를 참조할 수 없습니다:)
      // document.body.setAttribute('id', `show-scene-${currentScene}`);
      bodyElem.setAttribute('id', `show-scene-${currentScene}`);
    }

    //window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset;
      scrollLoop();
    });
  }
}
