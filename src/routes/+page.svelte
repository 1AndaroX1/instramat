<script>
	import { each } from 'svelte/internal';
	import { cart } from '../cartStore';
	/** @type {import('./$types').PageData} */
	export let data;

	function addToCart(product) {
		if ($cart.some((val) => val.id === product.id)) {
			alert('Товар уже добавлен в корзину');
			return;
		}

		cart.set([...$cart, product]);
	}
</script>

<section
	class="flex flex-wrap flex-row flex-start container mx-auto mt-8 px-8 flex-1 whitespace-pre-line"
>
	<div class="grid grid-cols-4 gap-3 items-stretch mb-6 w-full">
		<!-- карточка товара -->
		{#each data.result as product}
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
				<button class="btn-main flex self-start" on:click={() => addToCart(product)}
					>В корзину</button
				>
			</div>
		{/each}
	</div>

	<!-- Пагинация -->

	<div class="flex gap-2">
		{#if data.page > 1}
			<a class="btn-main" href="/?page={data.page - 1}"> Назад </a>
		{/if}

		<!-- {#each Array(data.totalPages).slice(data.page - 3, data.page + 2) as _, i}
			<a
				class={data.page - 3 + i + 1 === data.page ? 'btn-main-active' : 'btn-main'}
				href="/?page={data.page - 3 + i + 1}"
			>
				{data.page - 3 + i + 1}
			</a>
		{/each} -->
		<!-- 
		{#each Array(9) as _, i}
			{#if i + data.page - 2 < data.totalPages && i + data.page - 2 > 0}
				<a href="/?page={data.page + i - 2}">{data.page + i - 2}</a>
			{/if}
		{/each} -->

		<div>{data.page}</div>

		{#if data.page < data.totalPages}
			<a class="btn-main" href="/?page={data.page + 1}"> Вперед </a>
		{/if}
	</div>
</section>
