<template>
  <div class="container">
    <div class="container">
      <template v-if="!vista">
        <div class="row">

         
         
          <div class="col-md-8">
            <h1>Productos:</h1>
            <div
              class="card-deck"
              v-for="(producto, index) in productos"
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

      <!------------SEGUNDA VISTA--------------------->
       <template v-else>
        <div class="row mt-5">
        
          
          <div class="col-md-8">
            <h1>Ordenar productos:</h1>
            <div class="row">
              <div
                class="col-md-4 mb-3"
                v-for="(producto, index) in productos"
                :key="producto.id"
              >
                <div class="card h-100">
                  <div class="card-body">
                    <img
                      :src="producto.image"
                      class="card-img img-fluid"
                      alt="..."
                    />
                    <router-link
                      :to="{ name: 'ProductoDetalle', params: { id: producto.id } }"
                    >
                      <h5 class="card-title">{{ producto.title }}</h5>
                    </router-link>
                    <p class="card-text">Precio: ${{ producto.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template> 
    </div>

    <!------------SEGUNDA VISTA--------------------->

    <div class="text-center">
      <nav>
        <p>Estás en la página {{ paginaActual }}</p>
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" @click="cambiarPagina(false)"
              >Anterior</a
            >
          </li>
          <li
            class="page-item"
            v-for="page in cantidadPaginas"
            :key="page"
            :class="{ active: paginaActual === page }"
          >
            <a class="page-link" href="#" @click="setPage(page)">{{ page }}</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" @click="cambiarPagina(true)"
              >Siguiente</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
input[type="number"].form-control-sm {
  width: 60px;
}
.card-img {
  height: 150px;
  width: 400px;
  padding: 20px;
}
</style>

<script>
import axios from "axios";




export default {

  props: {
    vista: {
      type: Boolean,
      default: false,
    },
  },
  
  data() {
    return {
      productos: [],
      imageURL: "",
      accessKey: "jXu3zJjNbW6Waf32L7YBau9XqYuBuGm5mmVwT5DB77A",
      query: "iphone",
      count: 1, //cantidad de imagenes a obtener de la API
      imagenes: [],
      pagina: 1,
      search: null,
      paginaActual: 1,
      cantidadPaginas: 25,
      //vista: false,
      categorias: [],
      //precioMaximo:0
    };
  },

  computed: {
    postsPaginados() {
      const inicio = (this.paginaActual - 1) * 5;
      const fin = inicio + 5;
      return this.productos.slice(inicio, fin);
    },
  },
  methods: {
    fetchImage(count) {
      const apiUrl = `https://api.unsplash.com/photos/random?query=${this.query}&count=${count}&client_id=${this.accessKey}`;
      return axios.get(apiUrl);
    },

    //////////------codigo de productos------------////

    // cambiarPagina(incrementar) {
    //   if (incrementar) {
    //     this.paginaActual++;
    //   } else {
    //     this.paginaActual--;
    //   }
    //   axios
    //     .get(
    //       `https://tienda-dev.mbnb.duckdns.org/api/v1/productos?page=${this.paginaActual}`
    //     )
    //     .then((res) => {
    //       this.productos = res.data.data;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    // cambiarVista(vista) {
    //   this.vista = vista;
    // },
    setPage(page) {
      this.paginaActual = page;
      axios
        .get(
          `https://tienda-dev.mbnb.duckdns.org/api/v1/productos?page=${this.paginaActual}`
        )
        .then((res) => {
          this.productos = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // categoriasFiltradas() {},

   

    // obtenerCantidadPaginas() {
    //   axios
    //     .get(`https://tienda-dev.mbnb.duckdns.org/api/v1/productos`)
    //     .then((res) => {
    //       const totalResultados = res.data.length;
    //       this.cantidadPaginas = Math.ceil(totalResultados / 25);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    // searchData() {
    //   //Verifica si el campo de busqueda contiene algo
    //   if(this.search){
    //     axios.get('https://tienda-dev.mbnb.duckdns.org/api/v1/productos?nombre=' + this.search)
    //     .then((res)=>{
    //       console.log(res.data.data)
    //       this.productos = res.data.data
    //     })
    //     .catch((error)=>{
    //       console.log(error)
    //     })
    //   }
    // },
  },

  created() {
    this.fetchImage(this.count)
      .then((response) => {
        this.imagenes = response.data.map((item) => {
          return {
            id: item.id,
            url: item.urls.regular,
          };
        });
      })
      .catch((error) => {
        console.error(error);
      });

    

     
  },
  mounted() {
    // axios
    //   .get("https://tienda-dev.mbnb.duckdns.org/api/v1/productos")
    //   .then((respuesta) => {
    //     this.productos = respuesta.data.data;
    //     this.count = this.productos.length;
    //     this.fetchImage(this.count)
    //       .then((response) => {
    //         this.imagenes = response.data.map((item) => {
    //           return {
    //             id: item.id,
    //             url: item.urls.regular,
    //           };
    //         });
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   });

    axios.get(`https://fakestoreapi.com/products`).then((respuesta) => {
      this.productos = respuesta.data;
    });
  },
};
</script>
