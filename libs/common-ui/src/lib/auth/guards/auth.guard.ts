import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppPath, asyncEvery, Authority, getRouterLinkForAppPath, PartialRecord } from '@common';
import { Store } from '@ngrx/store';
import { isNullOrUndefined } from '@qntm-code/utils';
import { firstValueFrom, skipWhile } from 'rxjs';
import { AppRouteAuthorities, AppTreeRoute } from '../../interfaces';
import { AuthorityService } from '../../services';
import { selectAuthenticated, selectInitialRefreshCompleted, selectAuthUser, AuthActions } from '../store';

export const APP_ROUTING_TREE = new InjectionToken<AppTreeRoute[]>('APP_ROUTING_TREE');

type AppRoutesDictionary = PartialRecord<AppPath, AppRouteAuthorities>;

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
  private readonly appRoutesDictionary: AppRoutesDictionary = this.appRoutingTree.reduce((result, route) => {
    this.addRouteToDictionary(result, route);

    return result;
  }, {});

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly authorityService: AuthorityService,
    @Inject(APP_ROUTING_TREE) private readonly appRoutingTree: AppTreeRoute[]
  ) {
    void this.reportRoutingAuthorityConflicts();
  }

  public async canActivate(_route: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.isAuthenticated(url);
  }

  public async canActivateChild(_route: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.isAuthenticated(url);
  }

  public async hasAuthorityForRoute(url: string): Promise<boolean> {
    const path = this.findRoute(url)?.path;

    if (isNullOrUndefined(path)) {
      console.warn(`No route found in AppRoutingTree for url: ${url}`);

      return false;
    }

    const route = this.appRoutesDictionary[path];

    if (!route?.authorities.length) {
      return true;
    }

    const user = await firstValueFrom(this.store.select(selectAuthUser));

    if (!(await asyncEvery(route.authorities, async authority => await this.authorityService.hasAuthority(authority, user)))) {
      console.warn(`User does not have authority to access route "${url}". Required authorities: ${route.authorities.join(', ')}`);

      return false;
    }

    return true;
  }

  private async isAuthenticated(url: string): Promise<boolean | UrlTree> {
    await firstValueFrom(this.store.select(selectInitialRefreshCompleted).pipe(skipWhile(completed => !completed)));

    const isLoginUrl = url.includes(getRouterLinkForAppPath(AppPath.Login));

    if (await firstValueFrom(this.store.select(selectAuthenticated))) {
      if (isLoginUrl) {
        this.router.navigate([AppPath.Root]);

        return false;
      }
    } else if (!isLoginUrl) {
      this.store.dispatch(AuthActions.logout());

      return false;
    }

    if (!(await this.hasAuthorityForRoute(url))) {
      return false;
    }

    return true;
  }

  private addRouteToDictionary(
    dictionary: AppRoutesDictionary,
    { path, authority, children }: AppTreeRoute,
    parentAuthorities: Authority[] = []
  ): void {
    if (dictionary[path]) {
      throw new Error(
        `Duplicate route found in AppRoutingTree when creating AppRoutingDictionary - "${path}". Routes should be unique for permissions logic to work.`
      );
    }

    dictionary[path] = {
      authorities: [...parentAuthorities],
      authority,
    };

    if (authority) {
      dictionary[path]?.authorities.push(authority);
    }

    children?.forEach(child => this.addRouteToDictionary(dictionary, child, [...(dictionary[path]?.authorities || [])]));
  }

  private async reportRoutingAuthorityConflicts(): Promise<void> {
    const routes: string[][] = Object.entries(this.appRoutesDictionary)
      .filter(
        ([_key, routeConfig]) =>
          // The route has an authority
          !!routeConfig.authority &&
          // A parent route also has an authority
          routeConfig.authorities.length > 1 &&
          // The parent authority is not related to the child authority, so rather than alert and alert.manage its alert and targets
          !routeConfig.authorities.map(authority => authority.split('.')[0]).every((item, _index, array) => item === array[0])
      )
      .map(([route, config]) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const result = this.findParentRouteWithAuthority(route, config.authorities)!;

        const [parentRoute, parentConfig] = result;
        const parentAuthorities = parentConfig.authorities;

        return [parentRoute, parentAuthorities.join(', '), route, config.authority || ''];
      });

    if (routes.length) {
      const table = (await import('markdown-table')).markdownTable([
        ['Parent Route', 'Parent Authority', 'Child Route', 'Child Authority'],
        ...routes,
      ]);

      console.warn(
        `There are parent routes that have authorities unrelated to the authorities applied to it's child routes. This may mean that although the user has a granted authority for the child route, they will not be able to access it if they do not have the authority required to access the parent route.\n\n${table}`
      );
    }
  }

  private findParentRouteWithAuthority(childRoute: string, authorities: Authority[]) {
    const pathParts = childRoute.split('/').slice(0, -1);

    const pathsToCheck: string[] = [];

    let currentPath = '';

    pathParts.forEach(part => {
      currentPath += `${part}/`;

      pathsToCheck.push(currentPath.slice(0, -1));
    });

    return Object.entries(this.appRoutesDictionary).find(
      ([path, config]) => pathsToCheck.includes(path) && config.authorities.some(authority => authorities.includes(authority))
    );
  }

  private findRoute(url: string, routes: AppTreeRoute[] = this.appRoutingTree): AppTreeRoute | undefined {
    const routeMatch = routes.find(route => this.urlToPathMatch(url, route.path));

    if (routeMatch) {
      return routeMatch;
    }

    for (const route of routes) {
      if (route.children) {
        const childMatch = this.findRoute(url, route.children);

        if (childMatch) {
          return childMatch;
        }
      }
    }

    return;
  }

  private urlToPathMatch(url: string, path: AppPath): boolean {
    const pathParts = path.split('/');
    const urlParts = decodeURIComponent(url).split('?')[0].split('#')[0].replace(/^\//, '').replace(/\/$/, '').split('/');

    return (
      pathParts.length === urlParts.length &&
      pathParts.every((part, index) => part.charAt(0) === ':' || part.toLowerCase() === urlParts[index].toLowerCase())
    );
  }
}
