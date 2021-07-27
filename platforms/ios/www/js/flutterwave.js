console.log("Initializing Cordova FLW plugin ")
const inlineSdk = "https://checkout.flutterwave.com/v3.js";
const script = document.createElement("script");
script.src = inlineSdk;
if (!document.querySelector(`[src="${inlineSdk}"]`)) {
    document.head.appendChild(script);
}
  function Flutterwave () {


  }

Flutterwave.prototype.makePayment = function (paymentData) {
    FlutterwaveCheckout(paymentData);
};

// change arrow functions to normal functions
Flutterwave.prototype.makePaymentAsync = function (paymentData) {
    return new Promise(function (resolve, reject) {
        const payData = {
            ...paymentData,
            callback: function ($event) {
                resolve($event);
            },
            onclose: function () {
                resolve("closed");
            },
            errorCallback: function (error) {
                reject(error);
            },
        };

        window.FlutterwaveCheckout(payData);
    });
};

Flutterwave.prototype.closePaymentModal = function (waitDuration = 0) {
    setTimeout(() => {
        document
            .getElementsByName("checkout")[0]
            .setAttribute(
                "style",
                "position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;"
            );
        document.body.style.overflow = "";
        // document.getElementsByName('checkout')[0].setAttribute('style', 'z-index: -1; opacity: 0')
    }, waitDuration * 1000);
};


//module.exports = Flutterwave

/*Flutterwave.install = function () {
    const inlineSdk = "https://checkout.flutterwave.com/v3.js";
    const script = document.createElement("script");
    script.src = inlineSdk;
    if (!document.querySelector(`[src="${inlineSdk}"]`)) {
        document.body.appendChild(script);
    }

    if (!window.plugins) {
        window.plugins = {};
    }
    window.plugins.flutterwavePlugin = new Flutterwave();
    return window.plugins.flutterwavePlugin;
};

cordova.addConstructor(Flutterwave.install);*/
