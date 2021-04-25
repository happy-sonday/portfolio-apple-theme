import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    function checkMenu() {
      if (window.pageYOffset > 44) {
        document.querySelector('header').classList.add('local-nav-sticky');
      } else {
        document.querySelector('header').classList.remove('local-nav-sticky');
      }
    }

    window.addEventListener('scroll', () => {
      checkMenu();
    });
  }
}
