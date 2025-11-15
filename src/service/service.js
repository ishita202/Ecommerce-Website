import kidsProducts from "../data/kidsProducts.json";
import sportsProducts from "../data/sportsProducts.json";

export async function fetchProductsByCategory(type) {
  try {
    const menUrl = "https://fakestoreapi.com/products/category/men's%20clothing";
    const womenUrl = "https://fakestoreapi.com/products/category/women's%20clothing";

    if (type === "kids") return kidsProducts;
    if (type === "sports") return sportsProducts;

    if (type === "all") {
      const [menRes, womenRes] = await Promise.all([
        fetch(menUrl),
        fetch(womenUrl),
      ]);
      const [menData, womenData] = await Promise.all([
        menRes.json(),
        womenRes.json(),
      ]);
      return [...menData, ...womenData, ...kidsProducts, ...sportsProducts];
    }

    let apiCategory = "";
    if (type === "men") apiCategory = "men's clothing";
    if (type === "women") apiCategory = "women's clothing";

    if (apiCategory) {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(
          apiCategory
        )}`
      );
      const data = await res.json();
      return data;
    }

    return [];
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}
