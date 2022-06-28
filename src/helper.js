export const url = import.meta.env.VITE_BASE_IMAGE_URL;

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: "currency",
    currency: 'NGN'
  }).format(amount);
};
