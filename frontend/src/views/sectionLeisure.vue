<template>
  <div class="flex min-h-screen">
    <AppSidebar />
    <main class="flex-grow p-8 bg-white overflow-y-auto">

    <div class="flex-1 flex flex-col p-4 ">
        <div class="flex items-center justify-between mb-16">

        <!--titulo-->
            <div class="w-32"></div> 
                <div
                    class="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 hover:from-orange-600 hover:to-pink-400 transition-all duration-300">
                    Módulo de tiempo libre
                </div>
        <!--boton-->   
                <button 
                    @click="navigateToCreateAcademy"
                    class="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-orange-600 hover:to-pink-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform ">
                    Agregar registro
                </button>

        </div>

        <!--tabla-->
           <DynamicTable 
            :data="leisureData" 
            :columns="leisureColumns" 
            :currentPage="currentPage"
            :totalPages="totalPages"
            @page-change="goToPage"
            @next="nextPage"
            @prev="prevPage"
            @edit="handleEdit" 
            @delete="handleDelete" 
        >
            <template #cell-priority="{ item }">
                <span :class="getPriorityClass(item.priority)" 
                      class="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full border">
                    {{ item.priority }}
                </span>
            </template>
            
            <template #cell-date="{ item }">
                <span class="font-mono text-xs">{{ new Date(item.date).toLocaleDateString() }}</span>
            </template>

           </DynamicTable>

        <!--modales-->
        <ModalDelete 
            v-if="showDeleteModal"
            @confirm="executeDeletion" 
            @cancel="cancelDeletion"   
        />
        <ModalBase 
            v-if="showConfirmModal" 
            
            title-prop="¡Registro eliminado con éxito!" 
            
            confirm-button-text="Aceptar" 
            
            confirm-button-class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300"
            
            @confirm="handleFinalConfirmation"
            @cancel="handleFinalConfirmation"
            
            icon-type="success" >
        </ModalBase>
           

    </div>

      </main>
  </div>
</template>



<script setup>
import { ref, computed } from 'vue'; 
import { useRouter } from 'vue-router';

import AppSidebar from '../components/appSideBar.vue'; 
import DynamicTable from '../components/dynamicTable.vue'; 
import ModalDelete from '../components/modalDelete.vue'; 
import ModalBase from '../components/modalBase.vue';

const router = useRouter();
const leisureColumns = ref([
    { key: 'title', label: 'Título', widthClass: 'w-58' }, 
    { key: 'type', label: 'Tipo', widthClass: 'w-24' },
    { key: 'description', label: 'Descripción', widthClass: 'w-96' },
    { key: 'date', label: 'Fecha', widthClass: 'w-32' },
    { key: 'frecuency', label: 'Frecuencia', widthClass: 'w-40' },
    { key: 'priority', label: 'Prioridad', widthClass: 'w-28' }, 
]);

const leisureData = ref([
  { id: 1, title: 'Salir a caminar', type: 'Actividad física', description: 'Caminar 30 minutos por el parque o el vecindario.', date: '2025-11-07', frecuency: 'Diaria', priority: 'Media' },
  { id: 2, title: 'Ver película pendiente', type: 'Entretenimiento', description: 'Ver la película que quedó a medias el fin de semana pasado.', date: '2025-11-09', frecuency: 'Semanal', priority: 'Baja' },
  { id: 3, title: 'Jugar videojuegos', type: 'Entretenimiento', description: 'Disfrutar un rato libre jugando con amigos en línea.', date: '2025-11-10', frecuency: 'Semanal', priority: 'Baja' },
  { id: 4, title: 'Leer novela', type: 'Lectura', description: 'Avanzar un capítulo del libro antes de dormir.', date: '2025-11-08', frecuency: 'Día de por medio', priority: 'Media' },
  { id: 5, title: 'Tomar café con amigos', type: 'Social', description: 'Compartir un rato agradable con amigos o familiares.', date: '2025-11-11', frecuency: 'Quincenal', priority: 'Alta' },
  { id: 6, title: 'Ver serie nueva', type: 'Entretenimiento', description: 'Iniciar una serie recomendada en streaming.', date: '2025-11-13', frecuency: 'Semanal', priority: 'Media' },
  { id: 7, title: 'Ir al gimnasio', type: 'Actividad física', description: 'Entrenamiento funcional o de fuerza durante una hora.', date: '2025-11-06', frecuency: 'Día de por medio', priority: 'Alta' },
  { id: 8, title: 'Meditar', type: 'Bienestar', description: 'Meditar 10 minutos en la mañana para reducir el estrés.', date: '2025-11-08', frecuency: 'Diaria', priority: 'Alta' },
  { id: 9, title: 'Escuchar pódcast', type: 'Lectura', description: 'Escuchar un episodio inspirador o educativo.', date: '2025-11-09', frecuency: 'Día de por medio', priority: 'Media' },
  { id: 10, title: 'Día de desconexión', type: 'Bienestar', description: 'Pasar un día sin redes sociales ni trabajo pendiente.', date: '2025-11-16', frecuency: 'Mensual', priority: 'Alta' }
]);


const getPriorityClass = (priority) => {
    switch (priority) {
        case 'Alta': return 'bg-red-100 text-red-800 border-red-300';
        case 'Media': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'Baja': return 'bg-green-100 text-green-800 border-green-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

const navigateToCreateAcademy = () => {
    router.push('/createLeisure'); 
};

const handleEdit = (id) => {
    router.push(`/editLeisure/${id}`); 
};

const currentPage = ref(1);
const itemsPerPage = 10; 


const totalPages = computed(() => {
    return Math.ceil(leisureData.value.length / itemsPerPage);
});

const displayedTasks = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return leisureData.value.slice(start, end);
});

const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        currentPage.value = pageNumber;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const showDeleteModal = ref(false); 
const showConfirmModal = ref(false);
const itemToDeleteId = ref(null);

const handleDelete = (id) => {
    itemToDeleteId.value = id;    
    showDeleteModal.value = true;   
};

const executeDeletion = () => {
    if (itemToDeleteId.value !== null) {
        leisureData.value = leisureData.value.filter(item => item.id !== itemToDeleteId.value);
        console.log(`Eliminado el ID: ${itemToDeleteId.value}`);
        
        showDeleteModal.value = false;
        showConfirmModal.value = true;
    } else {
        showDeleteModal.value = false; 
    }
};

const cancelDeletion = () => {
    itemToDeleteId.value = null;
    showDeleteModal.value = false; 
};

const handleFinalConfirmation = () => {
    itemToDeleteId.value = null;
    showConfirmModal.value = false;
};

</script>