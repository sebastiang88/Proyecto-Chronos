<template>
  <!-- Este es el sideBar -->
  <div 
    :class="{'w-64': isSidebarOpen, 'w-32': !isSidebarOpen}" 
    class= " bg-linear-to-r from-blue-600 to-purple-600 text-white shrink-0 min-h-screen  p-4 flex flex-col  shadow-2xl transition-all duration-300 text-2xl px-10 "
  >
    <!-- Este es el texto que devuelve a la pagina de inicio -->
    <div 
        :class="{'hidden': !isSidebarOpen}"
        class="mb-8 p-2 overflow-hidden text-center mt-8">
        <router-link 
        to="/"
        class= "inline-block text-4xl font-bold  bg-clip-text text-white transition-all duration-300">
        Chronos
      </router-link>
    </div>

    <!-- Este es el avatar -->
    <div :class="{'hidden': !isSidebarOpen}"
    class="avatar mb-16 mt-8">
      <div class="w-22 h-22 rounded-full ring-2 ring-[#fcba03] ring-offset-2 ring-offset-base-100 overflow-hidden mx-auto ">
        <img 
          src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" 
          alt="Avatar"
          class="object-cover w-full h-full"
        />
      </div>
    </div>


    <!-- Estos son los items -->
    <ul class="menu w-full grow space-y-16">
      <li v-for="item in menuItems" :key="item.path">
        <router-link 
          :to="item.path" 
          class="btn btn-ghost justify-between text-base overflow-hidden "
          active-class="bg-white/20 text-white font-bold"
          
        >
          <span class="text-2xl mr-2 shrink-0">{{ item.icon }}</span> 
          <span :class="{'hidden': !isSidebarOpen}" class="whitespace-nowrap">{{ item.name }}</span>
        </router-link>
      </li>
    </ul>

    <!-- Cerrar sesion -->
    <router-link 
      to="/"
      class="inline-block link hover:underline text-white font-semibold mt-8 text-left text-shadow-lg text-sm">
      Cerrar sesión
    </router-link>

    <!-- Este es el boton para colapsar el sideBar -->
    <div class="p-2 border-t border-white/20 mt-4">
      <button @click="toggleSidebar" class="btn btn-ghost btn-circle">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          stroke-linejoin="round" 
          stroke-linecap="round" 
          stroke-width="2" 
          fill="none" 
          stroke="currentColor" 
          class="inline-block size-6 transition-transform duration-300"
          :class="{'rotate-180': !isSidebarOpen}"
        >
          <path d="M14 17l5-5-5-5"></path><path d="M19 12H5"></path>
        </svg>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarOpen = ref(true); 

function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
}

const menuItems = ref([
    { name: "Estudio", path: "/estudio", icon: "📚" },
    { name: "Salud", path: "/salud", icon: "🩺" },
    { name: "Finanzas", path: "/finanzas", icon: "💰" },
    { name: "Tiempo Libre", path: "/tiempo-libre", icon: "🎮" },
    { name: "Calendario", path: "/calendario", icon: "📅" },
]);
</script>