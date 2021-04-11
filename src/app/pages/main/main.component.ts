import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const seceInfo = [
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
      for (let i = 0; i < seceInfo.length; i++) {
        seceInfo[i].scrollHeight = seceInfo[i].heightNum * window.innerHeight;
        (seceInfo[i].objs
          .container as HTMLElement).style.height = `${seceInfo[i].scrollHeight}px`;
      }
    }

    window.addEventListener('resize', setLayout);
  }
}
