import { inject } from '@angular/core';
import { Router } from '@angular/router';

export interface RouteData {
  path: string;
  title: string;
  icon?: string;
  order?: number;
}

export class RouterExtension {
  public static readonly NOT_FOUND = '**';
  public static readonly HOME = 'home';
  public static readonly EXERCISES = 'exercises';
  public static readonly SESSION = 'session';

  private static readonly _routesData: Array<RouteData> = [
    {
      path: RouterExtension.NOT_FOUND,
      title: '404 Not Found',
    },
    {
      path: RouterExtension.HOME,
      title: 'Home',
      icon: 'assets/icons/home.svg',
      order: 0,
    },
    {
      path: RouterExtension.EXERCISES,
      title: 'Exercises',
      icon: 'assets/icons/exercises.png',
      order: 2,
    },
    {
      path: RouterExtension.SESSION,
      title: 'Session',
      icon: 'assets/icons/timer/clock-stopwatch.svg',
      order: 1,
    },
  ];

  public static getRoutesData() {
    if (RouterExtension._routesData.length === 0) {
      console.warn('Routes._routesData is empty');
      return [];
    }

    // Remove the first element - WILDCARD route
    const routes: Array<RouteData> = RouterExtension._routesData.slice(
      1,
      RouterExtension._routesData.length
    );

    return routes.sort((a, b) => {
      if (a.order === undefined || b.order === undefined) return 0;
      return a.order - b.order;
    });
  }

  public static getRouteByPath(path: string): RouteData | undefined {
    return RouterExtension._routesData.find((route) => route.path === path);
  }

  public static getRouteByTitle(title: string): RouteData | undefined {
    return RouterExtension._routesData.find((route) => route.title === title);
  }

  public static defineRouteOrder(path: string, order: number) {
    const route = RouterExtension.getRouteByPath(path);
    if (!route || route.order === order) {
      return;
    }

    route.order = order;
  }
}
