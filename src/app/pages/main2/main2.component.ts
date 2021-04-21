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
    const sceneInfo = [
      {
        //sceiont-0
        type: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-0'),
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

      console.log(sceneInfo);
    }

    setLayout();
  }
}
