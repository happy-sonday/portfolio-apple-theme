import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';

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
    let enterNewScene = false; //새로운 scene이 시작되는 순간 true;

    //기본 섹션값 및 새로고침시 sticky elem이 보일 수 있도록 대응
    bodyElem.setAttribute('id', `show-scene-0`);

    const sceneInfo = [
      {
        type: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0, //각 스크롤의 높이 정보
        objs: {
          container: document.querySelector('#scroll-section-0'),
          messageA: document.querySelector('#scroll-section-0 .main-message.a'),
          messageB: document.querySelector('#scroll-section-0 .main-message.b'),
          messageC: document.querySelector('#scroll-section-0 .main-message.c'),
          messageD: document.querySelector('#scroll-section-0 .main-message.d'),
          canvas: document.querySelector('#video-canvas-0'),
          context: (document.querySelector(
            '#video-canvas-0'
          ) as HTMLCanvasElement).getContext('2d'),
          videoImages: [],
        },
        values: {
          ///opcity
          messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
          messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
          messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
          messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],

          messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
          messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
          messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
          messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],

          ///translate
          messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
          messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
          messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
          messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],

          messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
          messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
          messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
          messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],

          //canvas Image
          videoImageCount: 300,
          imageSequence: [0, 299],

          //canvas opcity fade out
          canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        },
      },
      {
        type: 'normal',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-1'),
          content: document.querySelector('#scroll-section-1 .description'),
        },
      },
      {
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-2'),
          messageA: document.querySelector('#scroll-section-2 .a'),
          messageB: document.querySelector('#scroll-section-2 .b'),
          messageC: document.querySelector('#scroll-section-2 .c'),
          pinB: document.querySelector('#scroll-section-2 .b .pin'),
          pinC: document.querySelector('#scroll-section-2 .c .pin'),
          canvas: document.querySelector('#video-canvas-1'),
          context: (document.querySelector(
            '#video-canvas-1'
          ) as HTMLCanvasElement).getContext('2d'),
          videoImages: [],
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
          //canvas Image
          videoImageCount: 960,
          imageSequence: [0, 959],

          //canvas opcity fade in out
          canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
          canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        },
      },
      {
        type: 'sticky',
        //heightNum: 5,//범위 오류로 주석처리
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-3'),
          canvasCaption: document.querySelector('.canvas-caption'),
        },
      },
    ];

    setLayout();

    function setCanvasImages() {
      let imgElem;
      for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
        imgElem = new Image();
        imgElem.src = `../../../assets/video/001/IMG_${6726 + i}.JPG`;
        sceneInfo[0].objs.videoImages.push(imgElem);
      }
      let imgElem2;
      for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
        imgElem2 = new Image();
        //imgElem2.src = `../../../assets/video/001/IMG_${6726 + i}.JPG`;
        imgElem2.src = `../../../assets/video/002/IMG_${7027 + i}.JPG`;
        sceneInfo[2].objs.videoImages.push(imgElem2);
      }
    }

    setCanvasImages();

    /** 각 스크롤의 섹션 높이 세팅 */
    function setLayout() {
      for (let i = 0; i < sceneInfo.length; i++) {
        if (sceneInfo[i].type === 'sticky') {
          sceneInfo[i].scrollHeight =
            sceneInfo[i].heightNum * window.innerHeight;
          (sceneInfo[i].objs
            .container as HTMLElement).style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        //없어도 무방 불필요한 section의 높이 지정때문에 설정
        else if (sceneInfo[i].type === 'normal') {
          (sceneInfo[i].objs.container as HTMLElement).style.height = `${
            (sceneInfo[i].objs.container as HTMLElement).scrollHeight
          }px`;
        }
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

      const heightRatio = window.innerHeight / 1000;
      (sceneInfo[0].objs
        .canvas as HTMLCanvasElement).style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
      (sceneInfo[2].objs
        .canvas as HTMLCanvasElement).style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    function scrollLoop() {
      enterNewScene = false; //스크롤 동작할때마다 초기화
      prevScrollHeight = 0;
      for (let i = 0; i < currentScene; i++) {
        prevScrollHeight += sceneInfo[i].scrollHeight;
      }

      if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
        enterNewScene = true;
        currentScene++;
      }

      if (yOffset < prevScrollHeight) {
        enterNewScene = true;
        if (currentScene === 0) return; //브라우저 바운스 효과로 인해(e. 아이폰 새로고침) 마이너스가 되는 것을 방지(모바일)

        currentScene--;
      }

      //angular에서 해당 컴포넌트 내 외부 tag를 참조할 수 없습니다:)
      // document.body.setAttribute('id', `show-scene-${currentScene}`);
      bodyElem.setAttribute('id', `show-scene-${currentScene}`);

      //scen이 바뀌는 찰나에 음수값이 발생 방지
      //scene이 바뀔때 playAnimation함수가 동작하지 않도록 return
      if (enterNewScene) return;

      playAnimation();
    }

    /**해당 구간에서 애니메이션 실행 */
    function playAnimation() {
      const obj = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;
      const currentYOffset = yOffset - prevScrollHeight;
      //console.log(currentScene, currentYOffset);

      const scrollHeight = sceneInfo[currentScene].scrollHeight;

      const scrollRatio = currentYOffset / scrollHeight;

      switch (currentScene) {
        case 0:
          let sequence = Math.round(
            calcValues(values.imageSequence, currentYOffset)
          );
          //console.log(sequence);
          obj.context.drawImage(obj.videoImages[sequence], 0, 0);
          (obj.canvas as HTMLCanvasElement).style.opacity = calcValues(
            values.canvas_opacity,
            currentYOffset
          );
          if (scrollRatio <= 0.22) {
            //in
            (obj.messageA as HTMLElement).style.opacity = calcValues(
              values.messageA_opacity_in,
              currentYOffset
            );
            (obj.messageA as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageA_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            //out
            (obj.messageA as HTMLElement).style.opacity = calcValues(
              values.messageA_opacity_out,
              currentYOffset
            );
            (obj.messageA as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageA_translateY_out,
              currentYOffset
            )}%)`;
          }
          if (scrollRatio <= 0.42) {
            //in
            (obj.messageB as HTMLElement).style.opacity = calcValues(
              values.messageB_opacity_in,
              currentYOffset
            );
            (obj.messageB as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageB_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            //out
            (obj.messageB as HTMLElement).style.opacity = calcValues(
              values.messageB_opacity_out,
              currentYOffset
            );
            (obj.messageB as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageB_translateY_out,
              currentYOffset
            )}%)`;
          }
          if (scrollRatio <= 0.62) {
            //in
            (obj.messageC as HTMLElement).style.opacity = calcValues(
              values.messageC_opacity_in,
              currentYOffset
            );
            (obj.messageC as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageC_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            //out
            (obj.messageC as HTMLElement).style.opacity = calcValues(
              values.messageC_opacity_out,
              currentYOffset
            );
            (obj.messageC as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageC_translateY_out,
              currentYOffset
            )}%)`;
          }
          if (scrollRatio <= 0.82) {
            //in
            (obj.messageD as HTMLElement).style.opacity = calcValues(
              values.messageD_opacity_in,
              currentYOffset
            );
            (obj.messageD as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageD_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            //out
            (obj.messageD as HTMLElement).style.opacity = calcValues(
              values.messageD_opacity_out,
              currentYOffset
            );
            (obj.messageD as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageD_translateY_out,
              currentYOffset
            )}%)`;
          }

          break;

        case 2:
          let sequence2 = Math.round(
            calcValues(values.imageSequence, currentYOffset)
          );
          //console.log(sequence);
          obj.context.drawImage(obj.videoImages[sequence2], 0, 0);

          if (scrollRatio <= 0.5) {
            //in
            (obj.canvas as HTMLCanvasElement).style.opacity = calcValues(
              values.canvas_opacity_in,
              currentYOffset
            );
          } else {
            //out
            (obj.canvas as HTMLCanvasElement).style.opacity = calcValues(
              values.canvas_opacity_out,
              currentYOffset
            );
          }

          if (scrollRatio <= 0.32) {
            //in
            (obj.messageA as HTMLElement).style.opacity = calcValues(
              values.messageA_opacity_in,
              currentYOffset
            );
            (obj.messageA as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageA_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            //out
            (obj.messageA as HTMLElement).style.opacity = calcValues(
              values.messageA_opacity_out,
              currentYOffset
            );
            (obj.messageA as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageA_translateY_out,
              currentYOffset
            )}%)`;
          }
          if (scrollRatio <= 0.67) {
            //in
            (obj.messageB as HTMLElement).style.opacity = calcValues(
              values.messageB_opacity_in,
              currentYOffset
            );
            (obj.messageB as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageB_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            //out
            (obj.messageB as HTMLElement).style.opacity = calcValues(
              values.messageB_opacity_out,
              currentYOffset
            );
            (obj.messageB as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageB_translateY_out,
              currentYOffset
            )}%)`;
          }
          if (scrollRatio <= 0.93) {
            //in
            (obj.messageC as HTMLElement).style.opacity = calcValues(
              values.messageC_opacity_in,
              currentYOffset
            );
            (obj.messageC as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageC_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            //out
            (obj.messageC as HTMLElement).style.opacity = calcValues(
              values.messageC_opacity_out,
              currentYOffset
            );
            (obj.messageC as HTMLElement).style.transform = `translateY(${calcValues(
              values.messageC_translateY_out,
              currentYOffset
            )}%)`;
          }

          break;
        case 3:
          break;
      }
    }

    /** 현재 scene에서 scroll 비율 */
    function calcValues(values, currentYOffset) {
      let rv;
      const scrollHeight = sceneInfo[currentScene].scrollHeight;
      //현재 씬(스크롤섹션)에서 크롤된 범위를 비율로 구하기
      let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

      if (values.length === 3) {
        //start ~ end 사이 애니메이션 실행
        const partScrollStart = values[2].start * scrollHeight;
        const partScrollEnd = values[2].end * scrollHeight;
        //const partScrollHeight = partScrollEnd - partScrollStart;
        const partScrollHeight =
          scrollHeight * (values[2].end - values[2].start);
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
        } else if (currentYOffset > partScrollStart) {
          rv = values[1];
        }
      } else {
        rv = scrollRatio * (values[1] - values[0]) + values[0];
      }
      return rv;
    }

    //window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', () => {
      setLayout();
      sceneInfo[0].objs.context.drawImage(
        sceneInfo[0].objs.videoImages[0],
        0,
        0
      );
    });
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset;
      scrollLoop();
    });
  }
}
