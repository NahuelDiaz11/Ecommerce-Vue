<template>
  <div class="col-md-4 bg-light">
    <div class="">
      <div class="row">
        <p>Ordenar:</p>
        <div class="col-md-4">
          <font-awesome-icon
            icon="fa-solid fa-table-cells-large"
            @click="$emit('cambiarVista', vista)"
            title="Ordenar por imagenes"
          />
        </div>
        <div class="col-md-4">
          <font-awesome-icon
            icon="fa-solid fa-bars"
            @click="$emit('cambiarVista', !vista)"
            title="Ordenar verticalmente"
          />
        </div>
      </div>

      <div id="nav"></div>
   
      <h6 class="mt-5">Categorias:</h6>
      <div class="cell">
        <ul class="lista">
          <li v-for="categoria in categorias" :key="categoria.id">
            <router-link
              :to="{
                name: 'categorias',
                params: { categoria: categoria },
              }"
            >
              {{ categoria }}
            </router-link>
          </li>
        </ul>
      </div>
      <h6 class="mt-5">Precio:</h6>

      <div class="row">
        <div class="col-md-6">
          <input
            type="number"
            class="form-control form-control-sm"
            placeholder="Minimo:"
          />
        </div>

        <div class="col-md-6">
          <input
            type="number"
            class="form-control form-control-sm"
            placeholder="Maximo"
            v-model="precioMaximo"
            v-on:keyup.enter="filtrarPorPrecio(precioMaximo)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categorias: [],
      precioMaximo:0
    };
  },

  created() {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        this.categorias = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods:{

    filtrarPorPrecio(precioMaximo) {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          const productosMenores50 = response.data.filter(
            (producto) => producto.price < precioMaximo
          );
          console.log(productosMenores50);
        })
        .catch((error) => console.log(error));

      }
    
  }
};
</script>
