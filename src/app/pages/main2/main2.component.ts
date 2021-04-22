import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main2',
  templateUrl: './main2.component.html',
  styleUrls: ['./main2.component.scss'],
})
export class Main2Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let yOffset = 0;
    let prevScrollHeight = 0; //현재 스크롤에 위치 이전의 누적 높이 값
    let currentScene = 0; //현재 활성화된 섹션

    const sceneInfo = [
      {
        //sceiont-0
        type: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-0'),
          messageA: document.querySelector('#scroll-section-0 .main-message.a'),
          messageB: document.querySelector('#scroll-section-0 .main-message.b'),
          messageC: document.querySelector('#scroll-section-0 .main-message.c'),
          messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        },
        values: {
          messageA_opacity: [0, 1],
        },
      },
      {
        //section-1
        type: 'normal',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-1'),
        },
      },
      {
        //section-2
        type: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-2'),
        },
      },
      {
        //section-3
        type: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-3'),
        },
      },
    ];

    function setLayout() {
      for (let i = 0; i < sceneInfo.length; i++) {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        (sceneInfo[i].objs
          .container as HTMLElement).style.height = `${sceneInfo[i].scrollHeight}px`;
      }

      let totalScrollHeight = 0;
      for (let i = 0; i < sceneInfo.length; i++) {
        totalScrollHeight += sceneInfo[i].scrollHeight;
        if (totalScrollHeight >= pageYOffset) {
          currentScene = i;
          break;
        }
      }
      document
        .querySelector('.content-body')
        .setAttribute('id', `show-scene-section-${currentScene}`);
    }

    function calcValues(values, currentYOffset) {
      let rv;
      let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
      rv = scrollRatio * (values[1] - values[0]) + values[0];
      return rv;
    }
    function playAnimation() {
      const objs = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;
      const currentYOffset = yOffset - prevScrollHeight;

      switch (currentScene) {
        case 0:
          let messageA_opacity_in = calcValues(
            values.messageA_opacity,
            currentYOffset
          );
          console.log(messageA_opacity_in);
          (objs.messageA as HTMLElement).style.opacity = messageA_opacity_in;

          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
      }
    }

    function scrollLoop() {
      prevScrollHeight = 0;
      for (let i = 0; i < currentScene; i++) {
        prevScrollHeight += sceneInfo[i].scrollHeight;
      }

      if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
        currentScene++;
        document
          .querySelector('.content-body')
          .setAttribute('id', `show-scene-section-${currentScene}`);
      }

      if (yOffset < prevScrollHeight) {
        if (currentScene === 0) return;
        currentScene--;
        document
          .querySelector('.content-body')
          .setAttribute('id', `show-scene-section-${currentScene}`);
      }

      //document.body.setAttribute('id', `show-scene-section-${currentScene}`);
      playAnimation();
    }

    window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset; //현재 스크롤 위치;
      scrollLoop();
    });
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

    setLayout();
  }
}
