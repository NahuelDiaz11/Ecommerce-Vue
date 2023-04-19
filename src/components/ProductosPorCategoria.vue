<template>
  <div class="row">
    <FiltrosProductos/>
  
   <div class="col-md-8">
            <h1>Productos de la categoria: <span>#{{ categoria }}</span></h1>
            <div
              class="card-deck"
              v-for="(producto, index) in productosCategoria"
              :key="producto.id"
            >
              <div class="card mt-2">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      :src="producto.image"
                      class="card-img img-fluid"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <router-link
                        :to="{
                          name: 'ProductoDetalle',
                          params: { id: producto.id },
                        }"
                      >
                        <h5 class="card-title">{{ producto.title }}</h5>
                      </router-link>
                      <h4 class="card-text">Precio: ${{ producto.price }}</h4>
                      <p class="card-text">Id: #{{ producto.id }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
</template>

<script>
import axios from "axios";
import { defineAsyncComponent } from "vue";



export default{
  components: {
     
    
     FiltrosProductos: defineAsyncComponent (() => import(/* webpackChunkName:"FiltrosProductos" */ './FiltrosProductos.vue')),
      
     
   },
    props:{
    categoria:{
      
      required: true

    }
  },
    data() {
        return {
            productosCategoria:[]
        }
    },
    watch: {
  categoria: function(categoriaNueva, categoriaVieja) {
    axios.get(`https://fakestoreapi.com/products/category/${categoriaNueva}`)
    .then((respuesta) =>{
      this.productosCategoria = respuesta.data
      
    })
  }
},
    mounted() {
        axios.get(`https://fakestoreapi.com/products/category/${this.categoria}`)
        .then((respuesta) =>{
          this.productosCategoria=respuesta.data  
          

        });
        
    },
}
</script>