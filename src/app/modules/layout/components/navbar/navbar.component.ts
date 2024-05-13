import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { BACKGROUNDS_NAV, Colors } from '@models/colors.models';

import { AuthService } from '@services/auth.service';
import { BoardsService } from '@services/boards.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoard = false;

  navColorBackground: Colors = 'sky';
  colors_nav = BACKGROUNDS_NAV;

  user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private boardService: BoardsService
  ) {
    this.boardService.backgroundColor$.subscribe((color) => {
      this.navColorBackground = color;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  closeOverlay(event: boolean) {
    this.isOpenOverlayCreateBoard = event;
  }

  get colorsNav() {
    const classes = this.colors_nav[this.navColorBackground];
    return classes ? classes : {};
  }
}
