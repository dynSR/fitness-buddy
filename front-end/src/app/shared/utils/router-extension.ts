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

  /**
   * Route data | Defines all the app's routes, it's used to reference them in different parts of the application.
   * @param path The path of the route.
   * @param title The title of the route (the page's name).
   * @param icon The icon is used in the sidebar or relative components that need an icon to be displayed.
   * @param order The order is used to sort the routes.
   * @example const homeRoute: RouteData = { path: 'home', title: 'Home', icon: 'assets/icons/home.svg', order: 1 };
   */
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

  /**
   * Gets the app's routes data in the correct order.
   *
   * The first element of the `_routesData` array is the WILDCARD route, so it's removed.
   * The routes are then sorted by their order property.
   *
   * @returns {Array<RouteData>} The sorted routes data.
   */
  public static getRoutesData(): Array<RouteData> {
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

  /**
   * Gets a route by path.
   *
   * @param {string} path The route's path.
   * @returns {RouteData | undefined} The route if found, undefined otherwise.
   */
  public static getRouteByPath(path: string): RouteData | undefined {
    return RouterExtension._routesData.find((route) => route.path === path);
  }

  /**
   * Gets a route by title.
   *
   * @param {string} title The route's title.
   * @returns {RouteData | undefined} The route if found, undefined otherwise.
   */
  public static getRouteByTitle(title: string): RouteData | undefined {
    return RouterExtension._routesData.find((route) => route.title === title);
  }
}
