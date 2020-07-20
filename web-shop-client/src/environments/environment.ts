// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiProducts:'https://localhost:44355/api/ProductDetails',
  apiOrders:'https://localhost:44355/api/OrdersDetails',
  apiOrderItems:'https://localhost:44355/api/OrderItemsDetails',
  apiUsers:'https://localhost:44355/api/UsersDetails',
  firebaseConfig :{
    apiKey: "AIzaSyD5H5vJ_hxNTuEqO5ZxUF-h8B0z1ojKTrM",
    authDomain: "web-shop-project-86eef.firebaseapp.com",
    databaseURL: "https://web-shop-project-86eef.firebaseio.com",
    projectId: "web-shop-project-86eef",
    storageBucket: "web-shop-project-86eef.appspot.com",
    messagingSenderId: "353252477834",
    appId: "1:353252477834:web:20f7580184cf501ef29673"
  },

};

/*https://localhost:44355/api/ProductDetails
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
