import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductosStore = defineStore('productos', () => {

    const productos = ref(
        JSON.parse(localStorage.getItem('productos')) || []
    )

    const guardarLocal = () => {
        localStorage.setItem(
            'productos',
            JSON.stringify(productos.value)
        )
    }

    const agregarProducto = (producto) => {
        productos.value.push(producto)
        guardarLocal()
    }

    const eliminarProducto = (id) => {

        productos.value = productos.value.filter(
            producto => producto.id !== id
        )

        guardarLocal()
    }

    const editarProducto = (productoActualizado) => {

    const index = productos.value.findIndex(
        producto => producto.id === productoActualizado.id
    )

    if(index !== -1){

        productos.value[index] = productoActualizado

        guardarLocal()

    }

}



    const descontarStock = (id, cantidad) => {

    const producto = productos.value.find(
        producto => producto.id === id
    )

    if(producto){

        producto.stock -= cantidad

        if(producto.stock < 0){
            producto.stock = 0
        }

        guardarLocal()

    }

}

    return {
        productos,
        agregarProducto,
        eliminarProducto,
        descontarStock,
        editarProducto
    }

})