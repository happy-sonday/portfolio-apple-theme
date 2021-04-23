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
    let enterNewScene = false; //새로운 scene이 시작된 순간 true;

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
          messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
          messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
          messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
          messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
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
      let scrollHeight = sceneInfo[currentScene].scrollHeight;
      let scrollRatio = currentYOffset / scrollHeight;

      //객체 프로퍼티 갯수가 3개인 경우
      if (values.length === 3) {
        //start~end 사이에 애니메이션 실행
        const partScrollStart = values[2].start * scrollHeight;
        const partScrollEnd = values[2].end * scrollHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;
        //rv = scrollRatio * (values[1] - values[0]) + values[0];

        if (
          currentYOffset >= partScrollStart &&
          currentYOffset <= partScrollEnd
        ) {
          rv =
            ((currentYOffset - partScrollStart) / partScrollHeight) *
              (values[1] - values[0]) +
            values[0];
        } else if (currentYOffset < partScrollStart) {
          rv = values[0];
        } else if (currentYOffset > partScrollEnd) {
          rv = values[1];
        }
      } else {
        rv = scrollRatio * (values[1] - values[0]) + values[0];
      }

      return rv;
    }
    function playAnimation() {
      const objs = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;
      const currentYOffset = yOffset - prevScrollHeight;
      const scrollHeight = sceneInfo[currentScene].scrollHeight;
      //const scrollRatio = (yOffset-prevScrollHeight) / scrollHeight; //현재 씬의 scrollHeight
      const scrollRatio = currentYOffset / scrollHeight; //현재 씬의 scrollHeight

      switch (currentScene) {
        case 0:
          const messageA_opacity_in = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          const messageA_opacity_out = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );
          const messageA_translateY_in = calcValues(
            values.messageA_translateY_in,
            currentYOffset
          );
          const messageA_translateY_out = calcValues(
            values.messageA_translateY_out,
            currentYOffset
          );

          if (scrollRatio <= 0.22) {
            //in
            (objs.messageA as HTMLElement).style.opacity = messageA_opacity_in;
            (objs.messageA as HTMLElement).style.transform = `translateY(${messageA_translateY_in}%)`;
          } else {
            //out
            (objs.messageA as HTMLElement).style.opacity = messageA_opacity_out;
            (objs.messageA as HTMLElement).style.transform = `translateY(${messageA_translateY_out}%)`;
          }
          console.log(messageA_opacity_in);

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
      enterNewScene = false;
      prevScrollHeight = 0;
      for (let i = 0; i < currentScene; i++) {
        prevScrollHeight += sceneInfo[i].scrollHeight;
      }

      if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
        enterNewScene = true;
        currentScene++;
        document
          .querySelector('.content-body')
          .setAttribute('id', `show-scene-section-${currentScene}`);
      }

      if (yOffset < prevScrollHeight) {
        enterNewScene = true;
        if (currentScene === 0) return;
        currentScene--;
        document
          .querySelector('.content-body')
          .setAttribute('id', `show-scene-section-${currentScene}`);
      }

      if (enterNewScene) return;

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
