<script>
	import { faker } from '@faker-js/faker';
	import { each } from 'svelte/internal';
	import { cart } from '../cartStore';

	const products = [];

	function createRandomProducts() {
		return {
			id: faker.datatype.uuid(),
			photo: faker.image.technics(640, 480),
			name: faker.commerce.productName(),
			price: parseFloat(faker.commerce.price())
		};
	}

	Array.from({ length: 8 }).forEach(() => {
		products.push(createRandomProducts());
	});

	function addToCart(product) {
		if ($cart.some((val) => val.id === product.id)) {
			alert('Товар уже добавлен в корзину');
			return;
		}

		cart.set([
			...$cart,
			{
				id: product.id,
				name: product.name,
				price: product.price
			}
		]);
	}
</script>

<section>
	<div />
</section>

<section
	class="flex flex-wrap flex-row flex-start container mx-auto mt-8 px-8 flex-1 whitespace-pre-line"
>
	<div class="grid grid-cols-2 gap-3 items-stretch mb-6 w-full">
		<!-- карточка товара -->
		{#each products as product}
			<div class="flex flex-col p-3 shadow-md gap-3 rounded-md">
				<div class="flex flex-1 min-h-min">
					<a href="a">
						<img src={product.photo} alt="none" class="items-center rounded-sm w-full" />
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
</section>

<!-- <section class="flex flex-wrap flex-row flex-start container mx-auto mt-8 px-8">
	<div class="flex flex-wrap flex-row gap-3 items-stretch mb-6">
		<div class="flex flex-initia flex-col w-64 p-3 shadow-md gap-3 rounded-md">
			<div class="flex flex-1 min-h-min">
				<a href="a">
					<img
						src="../picture/makita-df457dwe.jpg"
						alt="none"
						class="items-center rounded-sm w-full"
					/>
				</a>
			</div>
			<div class="text">Шуруповерт-дрель Makita-df457dwe</div>
			<div>25 р. / сут</div>
			<button
				class="font-semibold bg-main text-zinc-50 rounded-full px-4 cursor-pointer py-2 flex self-start"
				>В корзину</button
			>
		</div>
	</div>
</section> -->
