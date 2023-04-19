<template>


<div class="row">
  <div class="col-md-4 bg-light" style="height: 500px;">
    <FiltrosProductos @cambiarVista="cambiarVista" />
  </div>
  <div class="col-md-8" style="height: 500px;">
    <ProductosListado :vista="vista"/>
  </div>
</div>

   
    
</template>


<script>
import { defineAsyncComponent } from "vue";

export default{

    name: "Productos",
  components: {
     
    FiltrosProductos: defineAsyncComponent (() => import(/* webpackChunkName:"FiltrosProductos" */ './FiltrosProductos.vue')),
    ProductosListado: defineAsyncComponent (() => import(/* webpackChunkName:"ProductosListado" */ './ProductosListado.vue'))
    
  },

  data(){
    return{
        vista: false,
    }
  },
  methods: {
    cambiarVista(vista) {
      this.vista = vista ? false : true;
    },
  },



}
</script>