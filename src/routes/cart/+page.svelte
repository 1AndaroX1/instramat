<script>
	import '../../styles.css';
	import { fade, fly } from 'svelte/transition';
	import { cart } from '../../cartStore';
	import { faker } from '@faker-js/faker';

	let cartConfirmForm = false;

	function removeFromCart(product) {
		$cart = $cart.filter((val) => val.id != product.id);
	}
	function cartConfirm() {
		cartConfirmForm = !cartConfirmForm;
	}
</script>

<container class="container mx-auto flex pt-8">
	<div />
	<div class="flex flex-row mx-auto px-4 h-full ">
		<div
			class="flex flex-col h-full gap-4 bg-white p-6 rounded-lg shadow-lg ring-1 ring-zinc-200 w-full overflow-auto pointer-events-auto"
		>
			<p class="text-xl leading-6 font-semibold">Корзина</p>
			{#if $cart.length === 0}
				<p class="">В корзине пусто. товарчик Добавь пж ((((</p>
			{/if}
			{#each $cart as product}
				<div class="flex flex-col p-3 shadow-md gap-3 rounded-md">
					<img src={faker.image.technics(640, 480)} class="w-26 rounded-md" alt="Товар" />

					<div class="flex flex-col gap-1">
						<p class="font-semibold">{product.name}</p>
						<p>{product.price} руб. / сут</p>
					</div>
					<div class="flex flex-row gap-4 w-full items-center">
						<button on:click={() => removeFromCart(product)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-6 text-zinc-600 hover:text-zinc-800 cursor-pointer"
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
			<div class="flex flex-col mt-auto gap-4">
				<p>{$cart.reduce((total, el) => total + el.price, 0)} р. / сут</p>
				<button class="btn-main w-full" disabled={$cart.length === 0}> Заказать </button>
			</div>
		</div>
	</div>
</container>

{#if cartConfirmForm}
	<div
		class="bg-zinc-400 w-full uppercase will-change-transform opacity-none "
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
