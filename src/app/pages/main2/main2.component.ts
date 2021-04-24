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
          canvas: document.querySelector('#video-canvas-0'),
          context: (document.querySelector(
            '#video-canvas-0'
          ) as HTMLCanvasElement).getContext('2d'),
          videoImages: [],
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
          videoImageCount: 300,
          imageSequence: [0, 299],
          canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
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
          videoImageCount: 960,
          imageSequence: [0, 959],
          canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
          canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
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
          canvas: document.querySelector('.image-blend-canvas'),
          context: (document.querySelector(
            '.image-blend-canvas'
          ) as HTMLCanvasElement).getContext('2d'),
          imagesPath: [
            '/assets/img/blend-image-1.jpg',
            '/assets/img/blend-image-2.jpg',
          ],
          images: [],
        },
        values: {
          rect1X: [0, 0, { start: 0, end: 0 }],
          rect2X: [0, 0, { start: 0, end: 0 }],
          blendHeight: [0, 0, { start: 0, end: 0 }],
          canvas_scale: [0, 0, { start: 0, end: 0 }],
          rectStartY: 0,
        },
      },
    ];

    function setCanvasImages() {
      let imgElem;
      for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
        imgElem = new Image();
        imgElem.src = `/assets/video/001/IMG_${6726 + i}.JPG`;
        sceneInfo[0].objs.videoImages.push(imgElem);
      }
      let imgElem2;
      for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
        imgElem2 = new Image();
        imgElem2.src = `/assets/video/002/IMG_${7027 + i}.JPG`;
        sceneInfo[2].objs.videoImages.push(imgElem2);
      }
      let imgElem3;
      for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
        imgElem3 = new Image();
        imgElem3.src = sceneInfo[3].objs.imagesPath[i];
        sceneInfo[3].objs.images.push(imgElem3);
      }
      console.log(sceneInfo[3].objs.images);
    }

    setCanvasImages();

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

      const heightRatio = window.innerHeight / 1080;
      (sceneInfo[0].objs
        .canvas as HTMLCanvasElement).style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
      (sceneInfo[2].objs
        .canvas as HTMLCanvasElement).style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
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
          let sequence = Math.round(
            calcValues(values.imageSequence, currentYOffset)
          );
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
          (objs.canvas as HTMLCanvasElement).style.opacity = calcValues(
            values.canvas_opacity,
            currentYOffset
          );
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
          let sequence2 = Math.round(
            calcValues(values.imageSequence, currentYOffset)
          );
          objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

          if (scrollRatio <= 0.5) {
            (objs.canvas as HTMLCanvasElement).style.opacity = calcValues(
              values.canvas_opacity_in,
              currentYOffset
            );
          } else {
            (objs.canvas as HTMLCanvasElement).style.opacity = calcValues(
              values.canvas_opacity_out,
              currentYOffset
            );
          }
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

          //currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
          if (scrollRatio > 0.9) {
            const objs = sceneInfo[3].objs;
            const values = sceneInfo[3].values;
            const widthRatio =
              window.innerWidth / (objs.canvas as HTMLCanvasElement).width;
            const heightRatio =
              window.innerHeight / (objs.canvas as HTMLCanvasElement).height;

            let canvasScaleRatio;

            if (widthRatio <= heightRatio) {
              //캔버스보다 브라우저 창이 홀쭉한 경우
              canvasScaleRatio = heightRatio;
            } else {
              canvasScaleRatio = widthRatio;
            }
            (objs.canvas as HTMLCanvasElement).style.transform = `scale(${canvasScaleRatio})`;
            objs.context.fillStyle = 'white';
            objs.context.drawImage(objs.images[0], 0, 0);

            //캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
            //innerWidth값은 스크롤 width가 포함되서 offsetWidth값으로 변경
            const recalculattedInnerWidth =
              document.body.offsetWidth / canvasScaleRatio;
            const recalculattedInnerHeight =
              window.innerHeight / canvasScaleRatio;

            // if (!values.rectStartY) {
            //   //values.rectStartY = (objs.canvas as HTMLCanvasElement).getBoundingClientRect().top;
            //   values.rectStartY =
            //     (objs.canvas as HTMLCanvasElement).offsetTop +
            //     ((objs.canvas as HTMLCanvasElement).height -
            //       (objs.canvas as HTMLCanvasElement).height *
            //         canvasScaleRatio) /
            //       2;
            //   values.rect1X[2]['start'] = window.innerHeight / 2 / scrollHeight;
            //   values.rect2X[2]['start'] = window.innerHeight / 2 / scrollHeight;
            //   values.rect1X[2]['end'] = values.rectStartY / scrollHeight;
            //   values.rect2X[2]['end'] = values.rectStartY / scrollHeight;
            // }

            const whiteRectWidth = recalculattedInnerWidth * 0.15;
            values.rect1X[0] =
              ((objs.canvas as HTMLCanvasElement).width -
                recalculattedInnerWidth) /
              2;
            values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
            values.rect2X[0] =
              values.rect1X[0] + recalculattedInnerWidth - whiteRectWidth;
            values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

            objs.context.fillRect(
              values.rect1X[0],
              0,
              Math.round(whiteRectWidth),
              (objs.canvas as HTMLCanvasElement).height
            );
            objs.context.fillRect(
              values.rect2X[0],
              0,
              Math.round(whiteRectWidth),
              (objs.canvas as HTMLCanvasElement).height
            );
          }
          break;
        case 3:
          let step = 0;
          //가로 세로 모두 꽉차게 하기 위해 여기서 세팅(계산필요)
          const widthRatio =
            window.innerWidth / (objs.canvas as HTMLCanvasElement).width;
          const heightRatio =
            window.innerHeight / (objs.canvas as HTMLCanvasElement).height;

          let canvasScaleRatio;

          if (widthRatio <= heightRatio) {
            //캔버스보다 브라우저 창이 홀쭉한 경우
            canvasScaleRatio = heightRatio;
          } else {
            canvasScaleRatio = widthRatio;
          }
          (objs.canvas as HTMLCanvasElement).style.transform = `scale(${canvasScaleRatio})`;
          objs.context.fillStyle = 'white';
          objs.context.drawImage(objs.images[0], 0, 0);

          //캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
          //innerWidth값은 스크롤 width가 포함되서 offsetWidth값으로 변경
          const recalculattedInnerWidth =
            document.body.offsetWidth / canvasScaleRatio;
          const recalculattedInnerHeight =
            window.innerHeight / canvasScaleRatio;

          if (!values.rectStartY) {
            //values.rectStartY = (objs.canvas as HTMLCanvasElement).getBoundingClientRect().top;
            values.rectStartY =
              (objs.canvas as HTMLCanvasElement).offsetTop +
              ((objs.canvas as HTMLCanvasElement).height -
                (objs.canvas as HTMLCanvasElement).height * canvasScaleRatio) /
                2;
            values.rect1X[2]['start'] = window.innerHeight / 2 / scrollHeight;
            values.rect2X[2]['start'] = window.innerHeight / 2 / scrollHeight;
            values.rect1X[2]['end'] = values.rectStartY / scrollHeight;
            values.rect2X[2]['end'] = values.rectStartY / scrollHeight;
          }

          const whiteRectWidth = recalculattedInnerWidth * 0.15;
          values.rect1X[0] =
            ((objs.canvas as HTMLCanvasElement).width -
              recalculattedInnerWidth) /
            2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] =
            values.rect1X[0] + recalculattedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          //좌우 흰색박스 그리기
          // objs.context.fillRect(
          //   values.rect1X[0],
          //   0,
          //   Math.round(whiteRectWidth),
          //   recalculattedInnerHeight
          // );
          // objs.context.fillRect(
          //   values.rect2X[0],
          //   0,
          //   Math.round(whiteRectWidth),
          //   recalculattedInnerHeight
          // );
          objs.context.fillRect(
            calcValues(values.rect1X, currentYOffset),
            0,
            whiteRectWidth,
            (objs.canvas as HTMLCanvasElement).height
          );
          objs.context.fillRect(
            calcValues(values.rect2X, currentYOffset),
            0,
            whiteRectWidth,
            (objs.canvas as HTMLCanvasElement).height
          );

          if (scrollRatio < values.rect1X[2]['end']) {
            step = 1;
            //console.log('캔버스 닿기전');
            objs.canvas.classList.remove('sticky');
          } else {
            step = 2;
            //이미지 블렌드
            //console.log('캔버스 닿은후');
            values.blendHeight[0] = 0;
            values.blendHeight[1] = (objs.canvas as HTMLCanvasElement).height;
            values.blendHeight[2]['start'] = values.rect1X[2]['end'];
            values.blendHeight[2]['end'] = values.blendHeight[2]['start'] + 0.2;

            const blendHeight = calcValues(values.blendHeight, currentYOffset);
            objs.context.drawImage(
              objs.images[1],
              0,
              (objs.canvas as HTMLCanvasElement).height - blendHeight,
              (objs.canvas as HTMLCanvasElement).width,
              blendHeight,
              0,
              (objs.canvas as HTMLCanvasElement).height - blendHeight,
              (objs.canvas as HTMLCanvasElement).width,
              blendHeight
            );
            objs.canvas.classList.add('sticky');
            (objs.canvas as HTMLCanvasElement).style.top = `${
              -(
                (objs.canvas as HTMLCanvasElement).height -
                (objs.canvas as HTMLCanvasElement).height * canvasScaleRatio
              ) / 2
            }px`;
            if (scrollRatio > values.blendHeight[2]['end']) {
              console.log('축소시작');
              values.canvas_scale[0] = canvasScaleRatio;
              values.canvas_scale[1] =
                document.body.offsetWidth /
                (1.5 * (objs.canvas as HTMLCanvasElement).width);

              values.canvas_scale[2]['start'] = values.blendHeight[2]['end'];
              values.canvas_scale[2]['end'] =
                values.canvas_scale[2]['start'] + 0.2;
              (objs.canvas as HTMLCanvasElement).style.transform = `scale(${calcValues(
                values.canvas_scale,
                currentYOffset
              )})`;
            }
          }
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
    window.addEventListener('load', () => {
      setLayout();
      sceneInfo[0].objs.context.drawImage(
        sceneInfo[0].objs.videoImages[0],
        0,
        0
      ); //첫번째장면만 로드
    });
    window.addEventListener('resize', setLayout);

    setLayout();
  }
}
