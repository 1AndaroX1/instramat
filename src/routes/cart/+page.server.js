/** @type {import('./$types').PageServerLoad} */
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		const firstName = data.get('firstName');
		const lastName = data.get('lastName');
		const phoneNumber = data.get('phoneNumber');
		const cart = data.get('cart');

		await locals.pb.collection('orders').create({
			firstNameOfCustomer: firstName,
			lastNameOfCustomer: lastName,
			phoneNumber: phoneNumber,
			cart: cart
		});
		return { success: true };
	}
};
