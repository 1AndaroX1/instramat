import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let savedCart = [];

if (browser) savedCart = JSON.parse(localStorage.getItem('cart'));

if (!Array.isArray(savedCart)) {
	savedCart = [];
}

export const cart = writable(savedCart);

if (browser)
	cart.subscribe((val) => {
		localStorage.setItem('cart', JSON.stringify(val));
	});
