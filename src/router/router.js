import { createRouter, createWebHashHistory } from "vue-router";
import App from "/src/App.vue";
import NoPageFound from "/src/components/NoPageFound.vue";

import axios from "axios";

const routes = [
  {
    path: "/",

    component: App,
  },

  //AxiosApi importado con LazyLoad, guarda el modulo en cache, carga mas rapido
  {
    path: "/Productos",

    component: () =>
      import(
        /* webpackChunkName: "Productos" */ "../components/Productos.vue"
      ),
  },

  //si no encuentra el path lo redirecciona a APp
  {
    path: "/:pathMatch(.*)*",

    component: NoPageFound,
  },
  {
    path: "/productos/:id",

    name: "ProductoDetalle",

    component: () =>
      import(
        /* webpackChunkName: "ProductoDetalle" */ "../components/ProductoDetalle.vue"
      ),

    props: (route) => {
      const id = Number(route.params.id);

      //validacion, si no es es un numero se manda el 1 y si lo es se manda el id
      return isNaN(id) ? { id: 1 } : { id: id };
    },
  },

  {
    path: "/:categoria",

    name: "categorias",

    component: () =>
      import(
        /* webpackChunkName: "ProductosPorCategoria" */ "../components/ProductosPorCategoria.vue"
      ),

    props: (route) => {
      const categoria = route.params.categoria;

      // validacion para comprobar si la categoria es una cadena de texto
      return typeof categoria === "string"
        ? { categoria: categoria }
        : { categoria: "jewelry" };
    },
  },

  {
    path: "/ProductosPorPrecio",

    component: () =>
      import(
        /* webpackChunkName: "ProductosPorPrecio" */ "../components/ProductosPorPrecio.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
