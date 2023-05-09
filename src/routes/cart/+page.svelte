<script>
	import '../../styles.css';
	import { fade, fly } from 'svelte/transition';
	import { cart } from '../../cartStore';

	let cartConfirmForm = false;

	function removeFromCart(product) {
		$cart = $cart.filter((val) => val.id != product.id);
	}
	function cartConfirm() {
		cartConfirmForm = !cartConfirmForm;
	}
</script>

<div class="container mx-auto">
	<p class="text-xl leading-6 font-semibold">Корзина</p>
	<div class="flex flex-row py-8 items-start gap-6">
		<div class="flex flex-col h-full gap-4 bg-white w-full pointer-events-auto">
			{#if $cart.length === 0}
				<div class="w-full h-full flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class=" mt-6 w-24 h-24">
						<path
							d="M11 9H13V6H16V4H13V1H11V4H8V6H11M7 18C5.9 18 5 18.9 5 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18M17 18C15.9 18 15 18.9 15 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18M7.2 14.8V14.7L8.1 13H15.5C16.2 13 16.9 12.6 17.2 12L21.1 5L19.4 4L15.5 11H8.5L4.3 2H1V4H3L6.6 11.6L5.2 14C5.1 14.3 5 14.6 5 15C5 16.1 5.9 17 7 17H19V15H7.4C7.3 15 7.2 14.9 7.2 14.8Z"
						/></svg
					>
					<p class="">В корзине пусто</p>
				</div>
			{/if}
			{#each $cart as product}
				<div class="flex flex-row p-3 shadow-md gap-3 rounded-md border border-zinc-200">
					<img src={product.picture + '?thumb=300x300f'} class="w-32 h-32 rounded-md" alt="Товар" />

					<div class="flex flex-col gap-1 w-full">
						<p class="font-semibold">{product.name}</p>
						<p>{product.price} руб. / сут</p>
					</div>
					<div class="items-center flex flex-row">
						<input
							min="1"
							max={product.quantity}
							bind:value={product.count}
							class="px-3 py-2 rounded-md border border-zinc-300 w-32"
							type="number"
						/>
					</div>
					<div class="flex flex-row gap-4 items-center">
						<button on:click={() => removeFromCart(product)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-8 text-zinc-600 hover:text-zinc-800 cursor-pointer"
								viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"
								/></svg
							>
						</button>
					</div>
				</div>
			{/each}
		</div>
		<div
			class="flex flex-col gap-4 w-64 shadow-md rounded-md p-6 flex-shrink-0 border border-zinc-200"
		>
			<p class="text-xl font-bold">К оплате</p>

			<p>{$cart.reduce((total, el) => total + el.price * el.count, 0)} р. / сут</p>
			<button class="btn-main w-full" disabled={$cart.length === 0}> Заказать </button>
		</div>
	</div>
</div>

{#if cartConfirmForm}
	<div
		class="bg-zinc-400 w-full uppercase will-change-transform opacity-none"
		in:fly={{
			y: -100,
			duration: 1000
		}}
		out:fade
	>
		<div
			class="flex flex-col h-full gap-4 bg-white p-6 rounded-lg shadow-lg ring-1 ring-zinc-200 w-full overflow-auto pointer-events-auto"
		/>
	</div>
{/if}
