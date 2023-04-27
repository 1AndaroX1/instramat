<script>
	import { each } from 'svelte/internal';
	import { cart } from '../cartStore';
	import { goto } from '$app/navigation';
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

	<div class="flex gap-2 flex-1 container flex-wrap flex-row m-3 justify-center">
		<button
			class={data.page == 1
				? 'pointer-events-none hover:bg-zinc-200 cursor-not-allowed bg-zinc-200 btn-main'
				: 'btn-main'}
			on:click={goto(`/?page=${data.page - 1}`)}
			disabled={data.page == 1}
		>
			Назад
		</button>

		<div class="flex self-center w-3 mx-3">
			{data.page}
		</div>

		<button
			class={data.page == data.totalPages
				? 'pointer-events-none hover:bg-zinc-200 cursor-not-allowed bg-zinc-200 btn-main'
				: 'btn-main'}
			on:click={goto(`/?page=${data.page + 1}`)}
			disabled={data.page == data.totalPages}
		>
			Вперед
		</button>
	</div>
</section>
