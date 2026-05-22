import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFacturacionStore = defineStore("facturacion", () => {
  const carrito = ref([]);

  const agregarProducto = (producto) => {
    // SIN STOCK
    if (producto.stock <= 0) {
      alert(`No hay stock disponible de ${producto.nombre}`);

      return;
    }

    const existe = carrito.value.find((item) => item.id === producto.id);

    // SI YA EXISTE EN CARRITO
    if (existe) {
      // VALIDAR LIMITE STOCK
      if (existe.cantidad >= producto.stock) {
        alert(`Stock máximo alcanzado para ${producto.nombre}`);

        return;
      }

      existe.cantidad++;
    } else {
      carrito.value.push({
        ...producto,
        cantidad: 1,
      });
    }
  };

  const eliminarProducto = (id) => {
    carrito.value = carrito.value.filter((item) => item.id !== id);
  };

  const aumentarCantidad = (id) => {
    const producto = carrito.value.find((item) => item.id === id);

    if (producto) {
      producto.cantidad++;
    }
  };

  const disminuirCantidad = (id) => {
    const producto = carrito.value.find((item) => item.id === id);

    if (producto && producto.cantidad > 1) {
      producto.cantidad--;
    }
  };

  const total = computed(() => {
    return subtotal.value + itbis.value;
  });
  const subtotal = computed(() => {
    return carrito.value.reduce(
      (acc, item) => acc + item.precio * item.cantidad,

      0,
    );
  });

  const itbis = computed(() => {
    return subtotal.value * 0.18;
  });

  return {
    carrito,
    agregarProducto,
    eliminarProducto,
    aumentarCantidad,
    disminuirCantidad,
    total,
    subtotal,
    itbis,
  };
});
