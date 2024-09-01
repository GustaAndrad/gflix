import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [LoginService],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  isOpen = false;
  @ViewChild('searchContainer') searchContainer!: ElementRef;

  @Output() searchEvent = new EventEmitter<string>();

  isScrolled = false;
  user: any;
  searchQuery: string = '';
  private authSubscription!: Subscription;

  constructor(private loginService: LoginService, private route: Router, private authService: AuthService, private searchService: SearchService) { }

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe(token => {
      this.user = token;
    });
    document.addEventListener('click', this.onClickOutside.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onClickOutside.bind(this));
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

  onSearch() {
    this.searchEvent.emit(this.searchQuery);
    this.searchService.setSearchQuery(this.searchQuery);
  }

  isCurrentPathFilmesOrSeries(): boolean {
    const currentPath = this.route.url;
    return currentPath === '/filmes' || currentPath === '/series';
  }
}
