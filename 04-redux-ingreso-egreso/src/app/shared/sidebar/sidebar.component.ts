import { Usuario } from './../../models/usuario.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  userData: Usuario;
  usuarioSubs: Subscription;

  constructor( private authService: AuthService,
               private store: Store<AppState>,
               private router: Router) { }

  ngOnInit() {
    this.usuarioSubs = this.store.select('user')
    .pipe(
      filter( ({user}) => user !== null )
    )
    .subscribe( ({user}) => {
      this.userData = user;
    });
  }

  ngOnDestroy(): void {
    this.usuarioSubs.unsubscribe();
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    })

  }

}
