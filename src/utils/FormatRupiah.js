// reference: https://sekolahkoding.com/forum/membuat-format-rupiah-di-js-1592876607
export const formatRupiah = (money) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(money);
};
