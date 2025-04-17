import Component from '@ember/component';

export default Component.extend({

    didInsertElement() {
        this._super(...arguments);
        this.autoReadSMS();
    },

    autoReadSMS() {
        // used AbortController with setTimeout so that WebOTP API (Autoread sms) will get disabled after 1min
         const signal = new AbortController();
         setTimeout(() => {
           signal.abort();
         }, 1 * 60 * 1000);

         const main = async () => {
           if ('OTPCredential' in window) {
              try {
                 if (navigator.credentials) {
                    try {
                       await navigator.credentials
                       .get({ abort: signal, otp:{ transport: ['sms']}})
                       .then(content => {
                         if (content && content.code) {
                           this.set('otp', content.code);
                         }
                       })
                       .catch(e => console.log(e));
                    } 
                    catch (e) {
                      return;
                    }
                 }
              } 
              catch (err) {
                console.log(err);
              }
            }
         }
         main();
        }
});
