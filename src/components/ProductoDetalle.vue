<template>
  <div class="container">
  <div class="card mt-5 bg-light">
    <div class="row mt-5">
      <div class="col-md-6">
        <img :src=" productos.image" class="img-fluid" alt="Producto 1">
      </div>
      <div class="col-md-6">
        <h3>Producto: <span>#{{ id }}</span></h3>
        <h3> <span>{{ productos.title }}</span></h3>
        <div class="d-flex align-items-center mb-3">
          <font-awesome-icon icon="fa-solid fa-star" />
          <font-awesome-icon icon="fa-solid fa-star" />
          <font-awesome-icon icon="fa-solid fa-star" />
          <font-awesome-icon icon="fa-solid fa-star" />
          <font-awesome-icon icon="fa-solid fa-star" />
          <span class="ml-2">(5)</span>
        </div>
        <p class="lead">{{productos.description}}</p>
        <h3 class="mt-5">Precio: ${{productos.price}}</h3>
        <div class="mb-3">
          <p><span class="mr-3"><font-awesome-icon icon="fa-solid fa-truck" /> Envio Gratis</span></p>
          <p><span class="mr-3"><font-awesome-icon icon="fa-solid fa-shield" /> Garantia de compra</span></p>
        </div>
        <p>Disponibilidad: En stock</p>
        <hr>
        <h4>Especificaciones técnicas</h4>
        <ul>
          <li>Color: Negro</li>
          <li>Tamaño: 10 pulgadas</li>
          <li>Resolución: 1920 x 1080</li>
          <li>Procesador: Intel Core i5</li>
          <li>Memoria RAM: 8GB</li>
          <li>Almacenamiento: 256GB SSD</li>
        </ul>
        <div class="d-flex justify-content-between align-items-center">
          <div class="input-group">
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary" type="button" @click="decrementarCarrito"><font-awesome-icon icon="fa-solid fa-minus" /></button>
            </div>
            <input type="text" class="form-control" :value="qty" disabled>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="incrementarCarrito"><font-awesome-icon icon="fa-solid fa-plus" /></button>
            </div>
          </div>
          <button class="btn btn-primary" @click="agregarCarrito">Agregar al carrito</button>
        </div>
      </div>
    </div>
  </div>
</div>



</template>

<script>  

import axios from "axios";
export default{
  props:{
    id:{
      type: Number,
      required: true

    }
  },
  data() {
  return {
    productos:[],
    //id:null
  }
},
// created(){
//   const { id } = this.$route.params
//   console.log(id)
//   this.id=id

// },
watch: {
  id: function(newId, oldId) {
    axios.get(`https://fakestoreapi.com/products/${newId}`)
    .then((respuesta) =>{
      this.productos = respuesta.data
      console.log(this.productos)
    })
  }
},
mounted() {
  axios.get(`https://fakestoreapi.com/products/${this.id}`)
  .then((respuesta) =>{
    this.productos = respuesta.data
    console.log(this.productos)

  })

},
}
</script>

