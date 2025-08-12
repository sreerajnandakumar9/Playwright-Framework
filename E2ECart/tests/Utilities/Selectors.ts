export const SELECTORS = {
  shipping: {
    VerifyOrderMessage: 'h1:has-text(" Thankyou for the order. ")',
    orderIdLabel: "label[class='ng-star-inserted']",
    thankYouHeader: ".hero-primary",
  },
    payment: {
        mail: "label[type='text']",
        OrderButton: "//a[normalize-space()='Place Order']",
        ViewCountries: ".ta-results",
        choose_Country: "input[placeholder='Select Country']",
    },
    myOrders: {
        MyOrder: "button[routerlink*='myorders']",
        CheckTitle: "h1[class='ng-star-inserted']"
    },

};
