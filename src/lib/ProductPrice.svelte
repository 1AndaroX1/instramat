<script>
	export let price;
	export let discount;
	export let isRentable;
</script>

<div class="">
	<p>Цена товара:</p>
	{#if discount > 0}
		<span class="font-semibold text-rose-600 text-xl">
			{price - discount}
		</span>
		<span class="line-through text-zinc-500">
			{price}
		</span>
	{:else}
		<span>
			{price}
		</span>
	{/if}
	<span>{isRentable ? 'р. / сут' : 'р.'}</span>
</div>
