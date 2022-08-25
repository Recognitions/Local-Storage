import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

function removeProduct(id){
    const products = JSON.parse(localStorage.getItem("products"))
    const newProduct = products.filter((product)=>{
        return product.id != id
    })
    localStorage.setItem("products",JSON.stringify(newProduct))
}

function renderProducts(){
    const storage = localStorage.getItem("products")
    const products = storage ? JSON.parse(storage) : []
    const tbody = document.querySelector("#table-container table tbody")
    tbody.innerHTML=""
    products.forEach((product)=>{
        const tr = document.createElement("tr")
        tr.setAttribute("title", product.name)
        tr.innerHTML=`
            <td class="table-row">${product.name}</td>
            <td class="table-row">${product.price}</td>
            <td class="table-row">${product.desc}</td>
            <td class="table-row">
                <button class="btn danger" type="button" id="${product.id}">X</button>
            </td>
        `
        tbody.appendChild(tr)
        document.getElementById(product.id).addEventListener("click",()=>{
            removeProduct(product.id)
            renderProducts()
        })
    })
}

document.addEventListener("DOMContentLoaded", renderProducts)

document.getElementById("product-form").addEventListener("submit",(event)=>{
    event.preventDefault()
    const name = document.querySelector("#name")
    const price = document.querySelector("#price")
    const desc = document.querySelector("#desc")
    const product = {
        id:uuidv4(),
        name:name.value,
        price:price.value,
        desc:desc.value
    }
    const storage = localStorage.getItem("products")
    const products = storage ? JSON.parse(storage) : []
    localStorage.setItem("products", JSON.stringify([...products,product]))
    name.value = price.value = desc.value = ""
    renderProducts()
    window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})
})