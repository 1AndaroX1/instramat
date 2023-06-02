<script>
	export let list;
	import { addToCart } from '$lib/cartUtils.js';
</script>

<div class="grid grid-cols-4 gap-3 items-stretch mb-6 w-full">
	<!-- карточка товара -->
	{#each list as product}
		<div class="flex flex-col p-3 shadow-md gap-3 rounded-md">
			<div class="flex flex-1 min-h-min">
				<a href="../product/id">
					<img
						src={product.picture + '?thumb=512x512f'}
						alt="none"
						class="items-center rounded-sm w-full"
					/>
				</a>
			</div>
			<div class="text">{product.name}</div>
			<div class="text-2xl">
				{#if product.discount > 0}
					<span class=" font-semibold text-rose-600">
						{product.price - product.discount}
					</span>
					<span class="line-through text-zinc-500 text-xl">
						{product.price}
					</span>
				{:else}
					<span>
						{product.price}
					</span>
				{/if}
				<span>{product.isRentable ? 'р. / сут' : 'р.'}</span>
			</div>
			<button class="btn-main flex self-start" on:click={() => addToCart(product)}>В корзину</button
			>
		</div>
	{/each}
</div>
