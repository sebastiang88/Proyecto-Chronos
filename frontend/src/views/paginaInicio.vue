<template>
  <div class="flex min-h-screen">
    
    <AppSidebar />

    <main class="flex-grow p-8 bg-white overflow-y-auto">
     
    <div class="flex-1 flex flex-col p-8 mt-4">

    <!--título-->
        <div
            class="text-center inline-block text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 hover:from-orange-600 hover:to-pink-400 transition-all duration-300">
            Bienvenido a Chronos ({{ nombreUsuario }})
        </div>

    <!--texto-->       
        <div
        class="inline-block text-2xl font-bold text-black mt-8 mb-8 text-center text-shadow-lg"
      >
        Llevas {{ diasSeguidos }} días seguidos cumpliendo tus rutinas. ¡Excelente trabajo!
        </div>

    <!--texto-->       
        <div class="text-left inline-block mt-4">
            <span
                class="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-orange-600 hover:to-pink-400 transition-all duration-300">
                Páginas recientes
            </span>
        </div>

    <!--tarjetas-->   
        <div class="grid grid-cols-4 gap-32 mt-8">
            <Card 
                v-for="card in tarjetasOrdenadas"
                :key="card.title"
                :title="card.title" 
                :imageSrc="card.imageSrc" 
                :to="card.to" 
            />  
        </div>

    <!--texto-->       
        <div class="text-left inline-block mt-16 mb-4">
            <span
                class="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-orange-600 hover:to-pink-400 transition-all duration-300">
                Recordatorios
            </span>
        </div>

    <!--recordatorios--> 
        <alert
                    v-for="(reminder, index) in proximosRecordatorios"
                    :key="index" 
                    :section="reminder.section"
                    :description="reminder.description"
                    :due-date="reminder.dueDate"
         />

    </div>

      </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'; 

import AppSidebar from '../components/appSideBar.vue'; 
import Card from '../components/card.vue';
import alert from '../components/reminderAlert.vue';
import seccionEstudio from '../assets/SeccionEstudio.jpg';
import seccionFinanzas from '../assets/SeccionFinanzas.jpg';
import seccionSalud from '../assets/SeccionSalud.jpg';
import seccionTiempoLibre from '../assets/SeccionTiempoLibre.jpg';

const nombreUsuario = ref('Estudiante Ibero');
const diasSeguidos = ref(3);

const tarjetas = ref([
    { 
        title: 'Estudio', 
        imageSrc: seccionEstudio, 
        to: '/estudio', 
        lastAccess: new Date('2025-10-25') 
    },
    { 
        title: 'Salud', 
        imageSrc: seccionSalud, 
        to: '/salud', 
        lastAccess: new Date('2025-10-31') 
    },
    { 
        title: 'Finanzas', 
        imageSrc: seccionFinanzas, 
        to: '/finanzas', 
        lastAccess: new Date('2025-10-15') 
    },
    { 
        title: 'Tiempo Libre', 
        imageSrc: seccionTiempoLibre, 
        to: '/tiempo-libre', 
        lastAccess: new Date('2025-10-01') 
    },
]);

const tarjetasOrdenadas = computed(() => {
    const sortedArray = [...tarjetas.value];
    sortedArray.sort((a, b) => b.lastAccess.getTime() - a.lastAccess.getTime());
  return sortedArray;
});

const recordatorios = ref([
    { 
        section: 'Finanzas', 
        description: 'Pago de la luz pendiente', 
        dueDate: new Date('2025-11-10') 
    },
    { 
        section: 'Salud', 
        description: 'Cita con el dentista', 
        dueDate: new Date('2025-11-05') 
    },
    { 
        section: 'Estudio', 
        description: 'Entrega del proyecto final', 
        dueDate: new Date('2025-11-20') 
    },
    { 
        section: 'General', 
        description: 'Revisar metas mensuales', 
        dueDate: new Date('2025-12-01') 
    },
]);

const proximosRecordatorios = computed(() => {
    const sorted = [...recordatorios.value].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    
    return sorted.slice(0, 3);
});

const irARuta = (ruta) => {
console.log(`Simulando navegación a la sección: ${ruta}`);
};

</script>