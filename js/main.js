const API = "https://dummyjson.com/products?limit=0";
const CATEGORY_API = "https://dummyjson.com/products/categories"


let productsContainer = document.querySelector("#products-container");
let categoryFilters = document.querySelector("#category-filters")

async function fetchProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    renderProducts(data.products)
    // console.log(data);
}

fetchProducts()

function renderProducts(products) {
    productsContainer.innerHTML = ""
    products.forEach((product) => {
        let article = document.createElement("article")
        let card = `<article
          class="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition">
          <div class="h-48 w-full flex items-center justify-center p-3 mb-4 bg-white">
            <img src=${product.thumbnail}
              alt="Calvin Klein CK One" class="max-h-full max-w-full object-contain" loading="lazy">
          </div>
          <div class="flex-grow flex flex-col">
            <span class="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
              ${product.category}
            </span>
            <h2 class="font-semibold text-slate-900 text-sm mb-2 line-clamp-2" title="Calvin Klein CK One">
              ${product.title}
            </h2>
            <div class="mt-auto pt-2">
              <span class="text-lg font-bold text-slate-900">
                ₹${(product.price * 96.82).toFixed(2)}
              </span>
            </div>
            <a href="product-details.html"
              class="mt-4 block w-full text-center bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition">
              View Details
            </a>
          </div>
        </article>
        `
        article.innerHTML = card;
        productsContainer.append(article)
    })
}

async function fetchCategories() {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();
    renderCategories(data)
    console.log(data);
}

fetchCategories()

function renderCategories(categories) {
    categoryFilters.innerHTML = ""
    let sab = [{ name: "all", slug: "all" }, ...categories]
    sab.forEach((category) => {
        let button = document.createElement("article")
        button.className = "px-4 py-1.5 rounded-md text-sm capitalize font-medium bg-teal-700 text-white transition"

        button.innerHTML = `${category.slug}`
        categoryFilters.append(button)
    })
}

