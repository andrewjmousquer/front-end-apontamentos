import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Menu } from '../shared/model/menu.model';

import { AuthenticationService } from '../shared/service/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    private byPassUrl = [
        "settings-form"
    ];

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if(currentUser.token){
                if(currentUser.token != '') {
                    let filteredByPassURL = this.byPassUrl.filter(bUrl => {return bUrl == route.routeConfig.path})[0];
                    if(filteredByPassURL){
                        return true;
                    }

                    let permittedRoute = currentUser.accessList.menus.filter(menu => {return this.filterMenu(menu, route.routeConfig.path)})[0];
                    if(permittedRoute) {
                        return true;
                    } else {
                        this.router.navigate(['/error'], { queryParams: { c: 403 } });
                        return false;
                    }
                }
            }
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        
        return false;
    }


    private filterMenu(menu: Menu, url) {            
        if(menu.submenus && menu.submenus.length > 0) {
            menu.submenus.forEach(submenu => {
                this.filterMenu(submenu, url);
            });
        } else {
            return menu.route.startsWith(url);
        }
    }
}
