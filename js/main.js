const API = "https://dummyjson.com/products?limit=0";
const CATEGORY_API = "https://dummyjson.com/products/categories"


let productsContainer = document.querySelector("#products-container");
let categoryFilters = document.querySelector("#category-filters");
let searchInput = document.querySelector("#search-input")
let allCategories = []

async function fetchProducts(url) {
  const response = await fetch(url);
  const data = await response.json();
  renderProducts(data.products)

}



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
            <a href="product-details.html?id=${product.id}"
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
  console.log(data);
  allCategories = [{name : "all",slug: "all", url : API},...data]
  renderCategories()
}



function renderCategories(currentCategory="all") {
  categoryFilters.innerHTML = ""
  allCategories.forEach(({name,slug,url}) => {
    let button = document.createElement("article")
    if(currentCategory===slug){
      button.className = "px-4 py-1.5 rounded-md text-sm capitalize font-medium bg-teal-700 text-white transition"
    }
    else{
        button.className = "px-4 py-1.5 rounded-md text-sm capitalize font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition"
    }
    
    button.innerHTML = `${slug}`
    button.dataset.url = url
    button.dataset.category = slug
    
    categoryFilters.append(button)
  })
}

categoryFilters.addEventListener("click", (e) => {
  e.stopPropagation();
  const element = e.target;
  let url = element.dataset.url
  console.log(url);
  const category = element.dataset.category;
  fetchProducts(url);
  renderCategories(category)

})

if(productsContainer){
  fetchProducts(API);
  fetchCategories();
}

if(searchInput){
  searchInput.addEventListener("input",(e)=>{
  e.stopPropagation();
  let value = searchInput.value;
  let url = `https://dummyjson.com/products/search?q=${value}`
  fetchProducts(url)
  console.log(value);
})
}