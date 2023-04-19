<template>
  <div class="container">
    <!--     
    <input
      type="text"
      v-model="search"
      v-on:input="searchData"
      placeholder="Buscar producto..."
    />
    <div class="row">
      <div
        class="col-md-4 mb-3"
        v-for="(producto, index) in productos"
        :key="producto.id"
      >
        <div class="card h-100">
          <div v-if="producto.imagen">
            <img
              :src="`https://tienda-dev.mbnb.duckdns.org${producto.imagen}`"
              class="card-img-top img-card img-fluid"
              alt="..."
            />
          </div>
          <div v-else>
            <img
              :src="imagenes.length ? imagenes[index].url : ''"
              class="card-img-top img-card img-fluid"
              alt="..."
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ producto.nombre }}</h5>
            <p class="card-text">Precio: ${{ producto.costo }}</p>
            <p class="card-text">Stock: {{ producto.stock }}</p>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="text-center">

      <nav>
        <p>Estas en la pagina {{ paginaActual }}</p>
        <ul class="pagination">
          <li class="page-item" >
            <a class="page-link" href="#" @click="cambiarPagina(false)">Anterior</a>
          </li>
          <li
            class="page-item"
            v-for="page in total_pages"
            :key="page"

          >
            <a class="page-link" href="#" @click="setPage(page)">{{ page }}</a>
          </li>
          <li
            class="page-item"

          >
            <a class="page-link" href="#" @click="cambiarPagina(true)">Siguiente</a>
          </li>
        </ul>
      </nav>
    </div> -->

    <!-- --------------------------------------------------BARRA SEPARADORA -------------------------------------------------------------------------------------->

    <!-- <div v-for="post in postsHolder" :key="post.id">
      <h3>{{ post.title }}</h3>
    </div> -->

    <input
      type="text"
      v-model="search"
      v-on:input="searchData"
      placeholder="Buscar producto..."
    />
    <div class="row">
      <div
        class="col-md-4 mb-3"
        v-for="(posts, index) in postsHolder"
        :key="posts.id"
      >
        <div>{{ index }}</div>
        <div class="card h-100">
          <div v-if="posts.imagen">
            <img
              :src="`https://tienda-dev.mbnb.duckdns.org${posts.imagen}`"
              class="card-img-top img-card img-fluid"
              alt="..."
            />
          </div>
          <!-- <div v-else>
            <img
              :src="imagenes.length ? imagenes[index].url : ''"
              class="card-img-top img-card img-fluid"
              alt="..."
            />
          </div> -->


          <div class="card-body">
            <h5 class="card-title">{{ posts.title }}</h5>
            <p class="card-text">Precio: ${{ posts.id }}</p>
            <p class="card-text">Stock: {{ posts.body }}</p>
          </div>
          
          <!-- <template v-if="vista==1"> -->

            
         
          <!-- </template> -->


        </div>
      </div>
    </div>

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

<script>
import axios from "axios";

export default {
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
      postsHolder: [],
      cantidadPaginas: 0,
      vista:0,
    };
  },

  computed: {
    postsPaginados() {
      const inicio = (this.paginaActual - 1) * 5;
      const fin = inicio + 5;
      return this.posts.slice(inicio, fin);
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
    //   axios.get(`https://tienda-dev.mbnb.duckdns.org/api/v1/productos?page=${this.paginaActual}`)
    //     .then((res) => {

    //       this.productos = res.data.data
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },

    cambiarPagina(incrementar) {
      if (incrementar) {
        this.paginaActual++;
      } else {
        this.paginaActual--;
      }
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?_page=${this.paginaActual}`
        )
        .then((res) => {
          this.postsHolder = res.data;
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setPage(page) {
      this.paginaActual = page;
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?_page=${this.paginaActual}`
        )
        .then((res) => {
          this.postsHolder = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    obtenerCantidadPaginas() {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts`)
        .then((res) => {
          const totalResultados = res.data.length;
          this.cantidadPaginas = Math.ceil(totalResultados / 10);
        })
        .catch((error) => {
          console.log(error);
        });
    },

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

    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${this.paginaActual}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.postsHolder = data;
      })
      .catch((error) => {
        console.log(error);
      });

    this.obtenerCantidadPaginas();
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
  },
};
</script>