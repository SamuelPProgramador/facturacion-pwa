<template>
  <div class="flex h-screen bg-gray-100">
    <!-- SIDEBAR -->
    <aside class="w-64 bg-gray-900 text-white">
      <div class="p-5 border-b border-gray-700">
        <h1 class="text-2xl font-bold">Facturación</h1>
      </div>

      <nav class="p-4 space-y-2">
        <router-link to="/" class="block p-3 rounded hover:bg-gray-700">
          Dashboard
        </router-link>

        <router-link to="/clientes" class="block p-3 rounded hover:bg-gray-700">
          Clientes
        </router-link>

        <router-link
          to="/productos"
          class="block p-3 rounded hover:bg-gray-700"
        >
          Productos
        </router-link>

        <router-link
          to="/facturacion"
          class="block p-3 rounded hover:bg-gray-700"
        >
          Facturación
        </router-link>

        <router-link to="/facturas" class="block p-3 rounded hover:bg-gray-700">
          Facturas
        </router-link>
        <router-link
          to="/configuracion"
          class="block p-3 rounded hover:bg-gray-700"
        >
          Configuración
        </router-link>
      </nav>
    </aside>

    <!-- CONTENIDO -->
    <div class="flex-1 flex flex-col">
      <!-- NAVBAR -->
      <header class="bg-white shadow p-4">
        <h2 class="text-xl font-semibold">Sistema de Facturación</h2>
      </header>

      <!-- PAGINA -->
      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>
