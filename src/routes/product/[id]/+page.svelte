<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import { addToCart } from '$lib/cartUtils.js';
	import ProductPrice from '$lib/ProductPrice.svelte';
</script>

<!-- красный -->
<div class="container mx-auto flex flex-row mt-6">
	<!-- синий 1 -->
	<div class="flex flex-col">
		<!-- желтый 1 -->
		<div class="flex flex-row">
			<!-- зеленый 1 -->
			<div class="flex flex-col m-8">
				<!-- img -->
				<!-- {#each  as }
			
			{/each} -->
				<img src={data.picturesURLs[0]} alt="none" class="items-center rounded-sm w-96" />
			</div>
			<!-- зеленый 2 -->
			<div class="flex flex-col">
				<div class="text-lg font-semibold">
					<!-- name -->
					{data.name}
				</div>
				<div>
					<!-- attributes -->
					{data.attributes}
				</div>
			</div>
		</div>
		<!-- желтый 2 -->
		<div class="flex flex-col gap-3 border-zinc-400">
			<h1 class=" font-semibold">Описание</h1>
			<!-- description -->
			{@html data.description}
		</div>
	</div>

	<!-- синий 2 -->
	<div
		class="flex flex-col h-full gap-4 bg-white p-6 rounded-lg shadow-lg ring-1
	ring-zinc-200 pointer-events-auto"
	>
		<!-- price and other -->
		<div>
			<ProductPrice price={data.price} discount={data.discount} isRentable={data.isRentable} />
		</div>

		<button
			class="font-semibold flex justify-center gap-2 bg-main text-zinc-50 rounded-full px-8 cursor-pointer py-4 w-36"
			on:click={addToCart({ ...data, picture: data.picturesURLs[0] })}
		>
			В корзину
		</button>
	</div>
</div>
