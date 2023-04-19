<script setup></script>

<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>

      
     

     
    </head>
    <header>
      <!-- <NavBar/> -->
     

    </header>
    <body>
    <router-view></router-view>
     
      <!-- <FiltrosProductos/> -->
     <!-- <ProductosListado/> -->

   

      
    </body>
    
  </html>

  
</template>




<script>

import ProductoDetalle from "./components/ProductoDetalle.vue";

import { defineAsyncComponent } from "vue";



export default {
  name: "App",
  components: {
     
     ProductoDetalle,
     NavBar: defineAsyncComponent (() => import(/* webpackChunkName:"NavBar" */ './components/NavBar.vue')),
     ProductosListado: defineAsyncComponent (() => import(/* webpackChunkName:"ProductosListado" */ './components/ProductosListado.vue')),
     
    
  },
 
};



</script>

<style>
.img-card {
  height: 250px; /* ajusta la altura según sea necesario */
}
</style>
