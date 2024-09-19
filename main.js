const heroProducts = document.getElementById('heroProducts')
const main = document.getElementById('mainContainer')
function saveProductsToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}
function loadProductsFromLocalStorage() {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
  }
}


let products = {
  Hamburguesas: [],
  Papas: [],
  Gaseosas: [],
};
class Product {
  categoria;
  nombre;
  precio;
  imagen;
  constructor(nombre, imagen, precio, categoria) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.categoria = categoria;
    this.precio = precio;
  }
}
function updateElement(element){
  let elemento = document.createElement('div')
  elemento.classList.add('products__element')
  
  let imgContainer = document.createElement('div')
  imgContainer.classList.add('img__container')
  let img = document.createElement('img' )
  img.src = element.imagen
  img.classList.add('element__img')
  
  imgContainer.appendChild(img)
  
  let title = document.createElement('p')
  title.classList.add('element__title')
  title.textContent = element.nombre
  
  
  let price = document.createElement('p')
  price.textContent = `Precio: $${element.precio}`
  elemento.appendChild(imgContainer)
  elemento.appendChild(title)
  elemento.appendChild(price)
  
  heroProducts.appendChild(elemento)
  elemento.addEventListener('click', () => {
    modifyPopup.style.display = 'block'
    main.style.filter = 'blur(3px)'
    modifyPopupInputTxt.value = element.nombre
    modifyPopupInputImg.value = element.imagen
    modifyPopupInputPrice.value = element.precio


    modifyAcceptBtn.addEventListener('click', () => {
      products[element.categoria].forEach(e => {
        if (element.nombre === e.nombre){
          e.nombre = modifyPopupInputTxt.value
          e.imagen = modifyPopupInputImg.value
          e.precio = modifyPopupInputPrice.value
        }
        saveProductsToLocalStorage();
      })
      if(heroTitle.textContent === 'Todos los productos'){
        heroProducts.innerHTML = ''
        let array  = []
        array = array.concat(products.Hamburguesas, products.Papas, products.Gaseosas).forEach(e => {
          updateElement(e)
        })
      }else{
        heroProducts.innerHTML = ''
        products[heroTitle.textContent].forEach(e => {
          updateElement(e)
        })
      }
    })
 
    modifyDeleteBtn.addEventListener('click', () => {
      // Encontrar el índice del producto a eliminar
      const productIndex = products[element.categoria].findIndex(e => e.nombre === modifyPopupInputTxt.value);
      
      // Si el producto se encuentra, eliminarlo del array
      if (productIndex !== -1) {
        products[element.categoria].splice(productIndex, 1); // Eliminar un elemento en el índice encontrado
        
        // Actualizar el localStorage después de eliminar el producto
        saveProductsToLocalStorage();
    
        // Cerrar el popup y actualizar la vista
        modifyPopup.style.display = 'none';
    
        // Actualizar la vista para reflejar los cambios
        if (heroTitle.textContent === 'Todos los productos') {
          heroProducts.innerHTML = '';
          let array = [].concat(products.Hamburguesas, products.Papas, products.Gaseosas);
          array.forEach(e => updateElement(e));
        } else {
          heroProducts.innerHTML = '';
          products[heroTitle.textContent].forEach(e => updateElement(e));
        }
      }
      main.style.filter = 'none'
    });
    


  })
  
}
const modifyPopup = document.getElementById('modifyPopup')
const modifyAcceptBtn = document.getElementById('modifyAcceptBtn')
const modifyCancelBtn = document.getElementById('modifyCancelBtn')
const modifyDeleteBtn = document.getElementById('modifyDeleteBtn')
const modifyPopupInputTxt = document.getElementById('modifyPopupTxtInput')
const modifyPopupInputImg = document.getElementById('modifyPopupImgInput')
const modifyPopupInputPrice = document.getElementById('modifyPopupPriceInput')



modifyCancelBtn.addEventListener('click', () => {
  modifyPopup.style.display = 'none'
  main.style.filter = 'none'
})


// Aside section

const todosLosProductosSectionBtn =  document.getElementById('todosLosProductosSection')

const hamburguesasSectionBtn =  document.getElementById('hamburguesasSection')

const papasSectionBtn =  document.getElementById('papasSection')

const gaseosasSectionBtn =  document.getElementById('gaseosasSection')

const mayorPrecioSectionBtn = document.getElementById('mayorPrecioSection')

const menorPrecioSectionBtn = document.getElementById('menorPrecioSection')

const heroTitle = document.getElementById('heroTitle')

todosLosProductosSectionBtn.addEventListener('click', () => {
  heroProducts.innerHTML = ''
  heroTitle.textContent = 'Todos los productos'
  products.Hamburguesas.forEach(element => {
   updateElement(element)
  })
  products.Papas.forEach(element => {
   updateElement(element)
  })
  products.Gaseosas.forEach(element => {
    updateElement(element)
  })
})
hamburguesasSectionBtn.addEventListener('click', () => {
  heroProducts.innerHTML = ''
  heroTitle.textContent = 'Hamburguesas'
  products.Hamburguesas.forEach(element => {
    updateElement(element)
  })
})
papasSectionBtn.addEventListener('click', () => {
  heroProducts.innerHTML = ''
  heroTitle.textContent = 'Papas'
  products.Papas.forEach(element => {
    updateElement(element)
  })
})
gaseosasSectionBtn.addEventListener('click', () => {
  heroProducts.innerHTML = ''
  heroTitle.textContent = 'Gaseosas'
  products.Gaseosas.forEach(element => {
    updateElement(element)
  })
})
mayorPrecioSectionBtn.addEventListener('click', () => {
  heroProducts.innerHTML = ''
  let title = heroTitle.textContent
  let arrayMayorPrecio = []
  if(title === 'Todos los productos'){
    arrayMayorPrecio = arrayMayorPrecio.concat(products.Hamburguesas, products.Papas, products.Gaseosas);
  }else{
    if(products[title]){
      arrayMayorPrecio = arrayMayorPrecio.concat(products[title])
    }
  }
  arrayMayorPrecio = arrayMayorPrecio.sort((a,b) => b.precio - a.precio)
  arrayMayorPrecio.forEach(element => {
    updateElement(element)
  })
})

menorPrecioSectionBtn.addEventListener('click', () => {
  heroProducts.innerHTML = ''
  let title = heroTitle.textContent
  let arrayMenorPrecio = []
  if(title === 'Todos los productos'){
    arrayMenorPrecio = arrayMenorPrecio.concat(products.Hamburguesas, products.Papas, products.Gaseosas);
  }else{
    if(products[title]){
      arrayMenorPrecio = arrayMenorPrecio.concat(products[title])
    }
  }
  arrayMenorPrecio = arrayMenorPrecio.sort((a,b) => a.precio - b.precio)
  arrayMenorPrecio.forEach(element => {
    updateElement(element)
  })
})




// Popup section

const addElementBtn = document.getElementById("addElementBtn");

const productsPopup = document.getElementById("productsPopup");

const popupTxtInput = document.getElementById("popupTxtInput")

const popupImgInput = document.getElementById("popupImgInput")

const popupPriceInput = document.getElementById("popupPriceInput")

const selectCategory = document.getElementById("selectCategory");

const popupCancelBtn = document.getElementById("popupCancelBtn");

const popupAcceptBtn = document.getElementById("popupAcceptBtn");

addElementBtn.addEventListener("click", () => {
  productsPopup.style.display = "block";
  main.style.filter = 'blur(3px)'
});

popupCancelBtn.addEventListener("click", () => {
  productsPopup.style.display = "none";
  main.style.filter = 'none'
});

popupAcceptBtn.addEventListener("click", () => {
  let producto = new Product(popupTxtInput.value,popupImgInput.value,popupPriceInput.value,selectCategory.value);
  products[selectCategory.value].push(producto)

  saveProductsToLocalStorage();

  popupTxtInput.value = ''
  popupImgInput.value = ''
  popupPriceInput.value = ''
  selectCategory.selectedIndex = 0

  let array = []
  if(heroTitle.textContent === 'Todos los productos'){
    heroProducts.innerHTML = ''
    array = array.concat(products.Hamburguesas, products.Papas, products.Gaseosas);
    array.forEach(element => {
      updateElement(element)
    })
  }else{
    heroProducts.innerHTML = ''
    products[heroTitle.textContent].forEach(element => {
      updateElement(element)
  })

}
productsPopup.style.display = 'none'
main.style.filter = 'none'
});


// Search input

const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')

searchBtn.addEventListener('click', () => {
  let searchValue = searchInput.value
  let array = []
  array = array.concat(products.Hamburguesas, products.Papas, products.Gaseosas);
  heroTitle.textContent = 'Busqueda'
  heroProducts.innerHTML = ''


  array.forEach(element =>{

    if(element.nombre.includes(searchValue)){
      updateElement(element)
    }
    }
    )


})


// Creación de elementos para probar el proyecto y sus funcionalidades

// Hamburguesas

let hambur =  new Product('Hamburguesa Simple', 'https://th.bing.com/th/id/OIP.daB7QG3lr17GdXJjlCmVZwHaE8?w=296&h=197&c=7&r=0&o=5&pid=1.7', 25000, 'Hamburguesas')
products.Hamburguesas.push(hambur)

// Papas

let papas = new Product('Papas rusticas', 'https://www.bing.com/th?id=OIP.5zcdaFLaSCETfGP-DkC8OwHaE7&w=197&h=131&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2', 400, 'Papas')
let papas2 = new Product('Papas normales', 'https://th.bing.com/th?id=OSK.66a35bd85dc94150be4d24c28f241b45&w=191&h=126&rs=2&qlt=80&o=6&cdv=1&pid=16.1', 600, 'Papas')
products.Papas.push(papas)
products.Papas.push(papas2)

// Gaseosas

let coca = new Product('Cocacola','https://images.unsplash.com/photo-1550634487-24e377301911?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29kYXxlbnwwfHwwfHx8MA%3D%3D',1500,'Gaseosas')
let coca2 = new Product('Sprite','https://images.unsplash.com/photo-1550634487-24e377301911?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29kYXxlbnwwfHwwfHx8MA%3D%3D',1800,'Gaseosas')
products.Gaseosas.push(coca2)
products.Gaseosas.push(coca)


document.addEventListener("DOMContentLoaded", () => {
  loadProductsFromLocalStorage();
  let array = []
  if(heroTitle.textContent === 'Todos los productos'){
    array = array.concat(products.Hamburguesas, products.Papas, products.Gaseosas);
    array.forEach(element => {
      updateElement(element)
    })
  }else{
    products[heroTitle.textContent].forEach(element => {
      updateElement(element)
    })
  }
})