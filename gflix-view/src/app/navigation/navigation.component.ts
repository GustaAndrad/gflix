import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  providers: [LoginService],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  isOpen = false;
  @ViewChild('searchContainer') searchContainer!: ElementRef;

  isScrolled = false;
  user: any;
  private authSubscription!: Subscription;

  constructor(private loginService: LoginService, private route: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe(token => {
      this.user = token;
    });
    document.addEventListener('click', this.onClickOutside.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onClickOutside.bind(this));
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleSearch() {
    this.isOpen = !this.isOpen;
  }

  private onClickOutside(event: MouseEvent) {
    const clickedInside = this.searchContainer.nativeElement.contains(event.target);
    if (!clickedInside && this.isOpen) {
      this.isOpen = false;
    }
  }

  logout() {
    this.loginService.logOut();
    this.authService.clearUser();
    this.route.navigate(['login']);
  }

}
