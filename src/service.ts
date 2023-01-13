


export default {
    // engine(settings: Settings, cart: Cart) {
    //     // console.log(settings);
    //     switch (settings.type) {
    //         case 'split-payment':
    //             const { minimum } = settings;
    //             const total = cart.talents.map(item => item.budget).reduce((prev, curr): any => prev + curr, 0)
    //             const to_pay = ((parseInt(minimum) / 100) * total).toFixed(2)
    //             const remaining_to_pay = (((100 - parseInt(minimum)) / 100) * total).toFixed(2);
    //             return {applied_rules: settings, ...cart, total: total.toFixed(2), to_pay, remaining_to_pay }
    //         default:
    //             return cart
    //     }
    // },

    generateUUID(length: number, start: string) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return start + result;
    }
}