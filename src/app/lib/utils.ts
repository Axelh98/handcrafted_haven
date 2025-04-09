export const formatCurrency = (amount: number) => {
	return (amount / 100).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD'
	});
};

export const formatRating = (rate: number) => {
	return rate.toFixed(1);
};

export const formatDate = (date: Date) => {
	return new Date(date).toLocaleString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric'
	});
};
