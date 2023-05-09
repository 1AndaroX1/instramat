<script>
	import { cart } from '../cartStore';
	export let list;

	function addToCart(product) {
		if ($cart.some((val) => val.id === product.id)) {
			alert('Товар уже добавлен в корзину');
			return;
		}

		cart.set([...$cart, { ...product, count: 1 }]);
	}
</script>

<div class="grid grid-cols-4 gap-3 items-stretch mb-6 w-full">
	<!-- карточка товара -->
	{#each list as product}
		<div class="flex flex-col p-3 shadow-md gap-3 rounded-md">
			<div class="flex flex-1 min-h-min">
				<a href="a">
					<img
						src={product.picture + '?thumb=512x512f'}
						alt="none"
						class="items-center rounded-sm w-full"
					/>
				</a>
			</div>
			<div class="text">{product.name}</div>
			<div>{product.price} р. / сут</div>
			<button class="btn-main flex self-start" on:click={() => addToCart(product)}>В корзину</button
			>
		</div>
	{/each}
</div>
