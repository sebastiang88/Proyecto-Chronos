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
                    Módulo de estudio
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
            :data="tasksData" 
            :columns="taskColumns" 
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
const taskColumns = ref([
    { key: 'title', label: 'Título', widthClass: 'w-58' }, 
    { key: 'type', label: 'Tipo', widthClass: 'w-24' },
    { key: 'description', label: 'Descripción', widthClass: 'w-96' },
    { key: 'date', label: 'Fecha', widthClass: 'w-32' },
    { key: 'subject', label: 'Materia', widthClass: 'w-40' },
    { key: 'priority', label: 'Prioridad', widthClass: 'w-28' }, 
]);

const tasksData = ref([
  { id: 1, title: 'Reporte Final de Cálculo', type: 'Tarea', description: 'Revisar todos los ejercicios y gráficos para el día de entrega.', date: '2025-12-15', subject: 'Matemáticas', priority: 'Alta' },
  { id: 2, title: 'Examen parcial de IA', type: 'Examen', description: 'Repasar los temas de aprendizaje automático y redes neuronales.', date: '2025-11-28', subject: 'Tecnología', priority: 'Alta' },
  { id: 3, title: 'Proyecto de Filosofía', type: 'Proyecto', description: 'Desarrollar una presentación sobre el pensamiento existencialista.', date: '2025-11-20', subject: 'Filosofía', priority: 'Media' },
  { id: 4, title: 'Taller de Álgebra Lineal', type: 'Tarea', description: 'Resolver los ejercicios sobre matrices y determinantes.', date: '2025-11-12', subject: 'Matemáticas', priority: 'Media' },
  { id: 5, title: 'Examen final de Programación', type: 'Examen', description: 'Prueba práctica sobre estructuras de datos y lógica.', date: '2025-12-08', subject: 'Programación', priority: 'Alta' },
  { id: 6, title: 'Proyecto de Base de Datos', type: 'Proyecto', description: 'Diseñar una base de datos relacional y generar el modelo ER.', date: '2025-12-10', subject: 'Informática', priority: 'Alta' },
  { id: 7, title: 'Tarea de Historia Moderna', type: 'Tarea', description: 'Analizar las causas y consecuencias de la Revolución Industrial.', date: '2025-11-15', subject: 'Historia', priority: 'Baja' },
  { id: 8, title: 'Examen de Física', type: 'Examen', description: 'Estudiar dinámica, leyes de Newton y movimiento circular.', date: '2025-11-22', subject: 'Física', priority: 'Media' },
  { id: 9, title: 'Proyecto de IA aplicada', type: 'Proyecto', description: 'Crear un modelo de clasificación con datos reales.', date: '2025-12-01', subject: 'Tecnología', priority: 'Alta' },
  { id: 10, title: 'Tarea de Redacción Técnica', type: 'Tarea', description: 'Redactar un texto formal aplicando normas APA.', date: '2025-11-18', subject: 'Comunicación', priority: 'Media' }
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
    router.push('/createAcademy'); 
};

const handleEdit = (id) => {
    router.push(`/editAcademy/${id}`); 
};

const currentPage = ref(1);
const itemsPerPage = 10; 


const totalPages = computed(() => {
    return Math.ceil(tasksData.value.length / itemsPerPage);
});

const displayedTasks = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return tasksData.value.slice(start, end);
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
        tasksData.value = tasksData.value.filter(item => item.id !== itemToDeleteId.value);
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