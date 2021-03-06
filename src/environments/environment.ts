// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  websocket: {
    PUSHER_APP_ID:123456,
    PUSHER_APP_KEY: "ASD1234FG",
    PUSHER_APP_SECRET: "ASD1234HJ",
    PUSHER_APP_CLUSTER: "mt1",
    PUSHER_APP_HOST: 'www.seekingterms.com',
    PUSHER_APP_PORT: 8443
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
