export const url = 'api.28bookings.com/static/users';

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


export const  check_status = (status) => {
  switch (status) {
    case "rejected":
      return "failure";
      break;
    case "approved":
      return "success";
      break;
    case "completed":
      return "success";
      break;
    case "cancelled":
      return "failure";
      break;
    case "pending":
      return "info";
      break;
    default:
      return "info";
  }
};