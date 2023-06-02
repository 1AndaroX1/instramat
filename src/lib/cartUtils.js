import { cart } from '../cartStore.js';
let cartStore = [];
cart.subscribe((val) => (cartStore = val));
export function addToCart(product) {
	if (cartStore.some((val) => val.id === product.id)) {
		alert('Товар уже добавлен в корзину');
		return;
	}
	cart.set([...cartStore, { ...product, count: 1 }]);
}
