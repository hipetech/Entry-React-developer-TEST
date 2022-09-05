export default class LocalStorageService {

    constructor() {
        this.activeCurrency = 'activeCurrency';
        this.cartList = 'cartList';
    }

    setActiveCurrency = (value) => {
        localStorage.setItem(this.activeCurrency, value);
    };

    getActiveCurrency = () => {
        return localStorage.getItem(this.activeCurrency);
    };

    setCartList = (value) => {
        localStorage.setItem(this.cartList, JSON.stringify(value));
    };

    getCartList = () => {
        const res = localStorage.getItem(this.cartList);
        if (res === null) return [];
        return JSON.parse(res);
    };
}