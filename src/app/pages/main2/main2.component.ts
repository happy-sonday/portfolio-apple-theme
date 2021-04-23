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
          messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
          messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
          messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
          messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
          messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
          messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
          messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
          messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
          messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
          messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
          messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
          messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
          messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
          messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
          messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        },
      },
      {
        //section-1
        type: 'normal',
        //heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
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
          messageA: document.querySelector('#scroll-section-2 .a'),
          messageB: document.querySelector('#scroll-section-2 .b'),
          messageC: document.querySelector('#scroll-section-2 .c'),
          pinB: document.querySelector('#scroll-section-2 .b .pin'),
          pinC: document.querySelector('#scroll-section-2 .c .pin'),
        },
        values: {
          messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
          messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
          messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
          messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
          messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
          messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
          messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
          messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
          messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
          messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
          messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
          messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
          pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
          pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }],
        },
      },
      {
        //section-3
        type: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-3'),
          canvasCaption: document.querySelector('.canvas-caption'),
        },
        values: {},
      },
    ];

    function setLayout() {
      for (let i = 0; i < sceneInfo.length; i++) {
        if (sceneInfo[i].type === 'sticky') {
          sceneInfo[i].scrollHeight =
            sceneInfo[i].heightNum * window.innerHeight;
        } else if (sceneInfo[i].type === 'normal') {
          sceneInfo[i].scrollHeight = (sceneInfo[i].objs
            .container as HTMLElement).offsetHeight;
        }
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
          if (scrollRatio <= 0.22) {
            //in
            (objs.messageA as HTMLElement).style.opacity = calcValues(
              values.messageA_opacity_in,
              currentYOffset
            );
            (objs.messageA as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageA_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            //out
            (objs.messageA as HTMLElement).style.opacity = calcValues(
              values.messageA_opacity_out,
              currentYOffset
            );
            (objs.messageA as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageA_translateY_out,
              currentYOffset
            )}%)`;
          }

          if (scrollRatio <= 0.42) {
            // in
            (objs.messageB as HTMLElement).style.opacity = calcValues(
              values.messageB_opacity_in,
              currentYOffset
            );
            (objs.messageB as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageB_translateY_in,
              currentYOffset
            )}%, 0)`;
          } else {
            // out
            (objs.messageB as HTMLElement).style.opacity = calcValues(
              values.messageB_opacity_out,
              currentYOffset
            );
            (objs.messageB as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageB_translateY_out,
              currentYOffset
            )}%, 0)`;
          }

          if (scrollRatio <= 0.62) {
            // in
            (objs.messageC as HTMLElement).style.opacity = calcValues(
              values.messageC_opacity_in,
              currentYOffset
            );
            (objs.messageC as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageC_translateY_in,
              currentYOffset
            )}%, 0)`;
          } else {
            // out
            (objs.messageC as HTMLElement).style.opacity = calcValues(
              values.messageC_opacity_out,
              currentYOffset
            );
            (objs.messageC as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageC_translateY_out,
              currentYOffset
            )}%, 0)`;
          }

          if (scrollRatio <= 0.82) {
            // in
            (objs.messageD as HTMLElement).style.opacity = calcValues(
              values.messageD_opacity_in,
              currentYOffset
            );
            (objs.messageD as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageD_translateY_in,
              currentYOffset
            )}%, 0)`;
          } else {
            // out
            (objs.messageD as HTMLElement).style.opacity = calcValues(
              values.messageD_opacity_out,
              currentYOffset
            );
            (objs.messageD as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageD_translateY_out,
              currentYOffset
            )}%, 0)`;
          }

          break;

        case 2:
          if (scrollRatio <= 0.32) {
            // in
            (objs.messageA as HTMLElement).style.opacity = calcValues(
              values.messageA_opacity_in,
              currentYOffset
            );
            (objs.messageA as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageA_translateY_in,
              currentYOffset
            )}%, 0)`;
          } else {
            // out
            (objs.messageA as HTMLElement).style.opacity = calcValues(
              values.messageA_opacity_out,
              currentYOffset
            );
            (objs.messageA as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageA_translateY_out,
              currentYOffset
            )}%, 0)`;
          }

          if (scrollRatio <= 0.67) {
            // in
            (objs.messageB as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageB_translateY_in,
              currentYOffset
            )}%, 0)`;
            (objs.messageB as HTMLElement).style.opacity = calcValues(
              values.messageB_opacity_in,
              currentYOffset
            );
            (objs.pinB as HTMLElement).style.transform = `scaleY(${calcValues(
              values.pinB_scaleY,
              currentYOffset
            )})`;
          } else {
            // out
            (objs.messageB as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageB_translateY_out,
              currentYOffset
            )}%, 0)`;
            (objs.messageB as HTMLElement).style.opacity = calcValues(
              values.messageB_opacity_out,
              currentYOffset
            );
            (objs.pinB as HTMLElement).style.transform = `scaleY(${calcValues(
              values.pinB_scaleY,
              currentYOffset
            )})`;
          }

          if (scrollRatio <= 0.93) {
            // in
            (objs.messageC as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageC_translateY_in,
              currentYOffset
            )}%, 0)`;
            (objs.messageC as HTMLElement).style.opacity = calcValues(
              values.messageC_opacity_in,
              currentYOffset
            );
            (objs.pinC as HTMLElement).style.transform = `scaleY(${calcValues(
              values.pinC_scaleY,
              currentYOffset
            )})`;
          } else {
            // out
            (objs.messageC as HTMLElement).style.transform = `translate3d(0, ${calcValues(
              values.messageC_translateY_out,
              currentYOffset
            )}%, 0)`;
            (objs.messageC as HTMLElement).style.opacity = calcValues(
              values.messageC_opacity_out,
              currentYOffset
            );
            (objs.pinC as HTMLElement).style.transform = `scaleY(${calcValues(
              values.pinC_scaleY,
              currentYOffset
            )})`;
          }

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
