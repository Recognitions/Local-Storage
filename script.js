import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

function removeProduct(id){
    const products = JSON.parse(localStorage.getItem("products"))
    const newProduct = products.filter((product)=>{
        return product.id != id
    })
    localStorage.setItem("products",JSON.stringify(newProduct))
}

function updateProduct(product){
    const storage = localStorage.getItem("products")
    const products = storage ? JSON.parse(storage) : []
    const uProduct = {
        id:product.id,
        name:product.name,
        price:product.price,
        desc:product.desc
    }
    localStorage.setItem("products", JSON.stringify([...products,uProduct]))
    document.getElementById("update").style.display="none"
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
                <button class="btn danger" type="button" id="D${product.id}">X</button>
                <button class="btn warning" type="button" id="E${product.id}">E</button>
            </td>
        `
        tbody.appendChild(tr)
        document.getElementById(`D${product.id}`).addEventListener("click",()=>{
            removeProduct(product.id)
            renderProducts()
        })
        document.getElementById(`E${product.id}`).addEventListener("click",()=>{
            const update = document.getElementById("update")
            update.style.display="flex"
            const eName = document.getElementById("eName")
            const ePrice = document.getElementById("ePrice")
            const eDesc = document.getElementById("eDesc")

            eName.value=product.name
            ePrice.value=product.price
            eDesc.value=product.desc

            document.querySelector("#update form").dataset.id=product.id
            
        })
    })
}

function setTheme(){
    const root = document.querySelector(":root").style
    const storage = localStorage.getItem("theme")
    const styles = storage ? JSON.parse(storage) : []
    styles.forEach((style)=>{
        root.setProperty("--first", style.first);
        root.setProperty("--second", style.second);
        root.setProperty("--text", style.text);
    })
}

function checkTheme(){
    const themes = [
        {
            name: "dark",
            first: "#333",
            second: "#1d1d1d",
            text: "#f8f8f8"
        },
        {
            name: "light",
            first: "white",
            second: "#ececec",
            text: "#333"
        }
    ]
    const storage = localStorage.getItem("theme")
    const theme = storage ? JSON.parse(storage) : []
    if(theme.length==0){
        localStorage.setItem("theme",JSON.stringify([themes[1]]))
    }else if(theme[0]?.name=="light"){
        localStorage.setItem("theme",JSON.stringify([themes[0]]))
    }else if(theme[0]?.name=="dark"){
        localStorage.setItem("theme",JSON.stringify([themes[1]]))
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    setTheme()
    renderProducts()
})

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

document.querySelector("#update form").addEventListener("submit",(event)=>{
    event.preventDefault()
    const product = {
        id:document.querySelector("#update form").dataset.id,
        name:document.getElementById("eName").value,
        price:document.getElementById("ePrice").value,
        desc:document.getElementById("eDesc").value
    }
    removeProduct(product.id)
    updateProduct(product)
    renderProducts()
})

document.querySelector("#update form button:last-child").addEventListener("click",(event)=>{
    event.preventDefault()
    const update = document.getElementById("update")
    update.style.display="none"
})

document.getElementById("theme").addEventListener('click',()=>{
    checkTheme()
    setTheme()
})