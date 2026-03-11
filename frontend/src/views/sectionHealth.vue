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
                    Módulo de salud
                </div>
        <!--boton-->   
                <button 
                    @click="navigateToCreateHealth"
                    class="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-orange-600 hover:to-pink-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform ">
                    Agregar registro
                </button>

        </div>

        <!--tabla-->
           <DynamicTable 
            :data="healthData" 
            :columns="healthColumns" 
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
const healthColumns = ref([
    { key: 'title', label: 'Título', widthClass: 'w-58' }, 
    { key: 'type', label: 'Tipo', widthClass: 'w-24' },
    { key: 'description', label: 'Descripción', widthClass: 'w-96' },
    { key: 'date', label: 'Fecha', widthClass: 'w-32' },
    { key: 'priority', label: 'Prioridad', widthClass: 'w-28' }, 
]);

const healthData = ref([
  { id: 1, title: 'Cita medicina general', type: 'Cita médica', description: 'Tengo una cita con el médico porque me duele la cabeza.', date: '2025-12-15', priority: 'Alta' },
  { id: 2, title: 'PREP', type: 'Medicamento', description: 'Tomar todos los días a la misma hora.', date: '2025-11-28', priority: 'Alta' },
  { id: 3, title: 'Meditar', type: 'Hábito saludable', description: 'Dedicar 15 minutos a meditar día de por medio.', date: '2025-11-10', priority: 'Baja' },
  { id: 4, title: 'Control odontológico', type: 'Control', description: 'Revisión dental de rutina cada seis meses.', date: '2025-11-22', priority: 'Media' },
  { id: 5, title: 'Tratamiento fisioterapia', type: 'Tratamiento', description: 'Sesión de fisioterapia por lesión en el hombro.', date: '2025-11-18', priority: 'Alta' },
  { id: 6, title: 'Vitaminas diarias', type: 'Medicamento', description: 'Tomar complejo B después del desayuno.', date: '2025-11-09', priority: 'Baja' },
  { id: 7, title: 'Chequeo general anual', type: 'Control', description: 'Exámenes médicos de rutina y análisis de laboratorio.', date: '2025-12-01', priority: 'Alta' },
  { id: 8, title: 'Hidratación constante', type: 'Hábito saludable', description: 'Beber al menos 2 litros de agua al día.', date: '2025-11-06', priority: 'Baja' },
  { id: 9, title: 'Terapia psicológica', type: 'Cita médica', description: 'Sesión mensual con el psicólogo.', date: '2025-11-20', priority: 'Media' },
  { id: 10, title: 'Tratamiento dermatológico', type: 'Tratamiento', description: 'Aplicar crema recetada en la noche durante 15 días.', date: '2025-11-08', priority: 'Media' }
]);

const getPriorityClass = (priority) => {
    switch (priority) {
        case 'Alta': return 'bg-red-100 text-red-800 border-red-300';
        case 'Media': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'Baja': return 'bg-green-100 text-green-800 border-green-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

const navigateToCreateHealth = () => {
    router.push('/createHealth'); 
};

const handleEdit = (id) => {
    router.push(`/editHealth/${id}`); 
};

const currentPage = ref(1);
const itemsPerPage = 10; 


const totalPages = computed(() => {
    return Math.ceil(healthData.value.length / itemsPerPage);
});

const displayedTasks = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return healthData.value.slice(start, end);
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
        healthData.value = healthData.value.filter(item => item.id !== itemToDeleteId.value);
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