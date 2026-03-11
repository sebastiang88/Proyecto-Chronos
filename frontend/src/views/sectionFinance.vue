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
                    Módulo de finanzas
                </div>
        <!--boton-->   
                <button 
                    @click="navigateToCreateFinance"
                    class="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-orange-600 hover:to-pink-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform ">
                    Agregar registro
                </button>

        </div>

        <!--tabla-->
           <DynamicTable 
            :data="financesData" 
            :columns="financesColumns" 
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

            <template #cell-amount="{ item }">
                <span class="font-mono text-xs"> 
                    {{ formatAmount(item.amount) }}
                </span>
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
const financesColumns = ref([
    { key: 'title', label: 'Título', widthClass: 'w-58' }, 
    { key: 'type', label: 'Tipo', widthClass: 'w-24' },
    { key: 'description', label: 'Descripción', widthClass: 'w-96' },
    { key: 'date', label: 'Fecha', widthClass: 'w-32' },
    { key: 'amount', label: 'Monto', widthClass: 'w-28' }, 
]);

const financesData = ref([
  { id: 1, title: 'Pago de arriendo', type: 'Gasto', description: 'Pago mensual del apartamento', date: '2025-11-05', amount: 900000 },
  { id: 2, title: 'Salario mensual', type: 'Ingreso', description: 'Pago recibido por el trabajo de noviembre', date: '2025-11-01', amount: 2500000 },
  { id: 3, title: 'Ahorro mensual', type: 'Ahorro', description: 'Transferencia a la cuenta de ahorros', date: '2025-11-02', amount: 300000 },
  { id: 4, title: 'Compra de mercado', type: 'Gasto', description: 'Supermercado y productos del hogar', date: '2025-11-03', amount: 280000 },
  { id: 5, title: 'Deuda con tarjeta', type: 'Deuda', description: 'Pago pendiente por compras con tarjeta de crédito', date: '2025-11-10', amount: 450000 },
  { id: 6, title: 'Pago servicio de internet', type: 'Gasto', description: 'Pago mensual del plan de internet', date: '2025-11-08', amount: 85000 },
  { id: 7, title: 'Venta de laptop usada', type: 'Ingreso', description: 'Venta de computador portátil antiguo', date: '2025-11-12', amount: 1200000 },
  { id: 8, title: 'Ahorro para vacaciones', type: 'Ahorro', description: 'Depósito programado para viaje de fin de año', date: '2025-11-15', amount: 200000 },
  { id: 9, title: 'Préstamo a un amigo', type: 'Deuda', description: 'Dinero prestado a un amigo, pendiente de devolución', date: '2025-11-20', amount: 150000 },
  { id: 10, title: 'Cena con amigos', type: 'Gasto', description: 'Salida a comer con amigos el fin de semana', date: '2025-11-25', amount: 95000 }
]);


const navigateToCreateFinance = () => {
    router.push('/createFinance'); 
};

const handleEdit = (id) => {
    router.push(`/editFinance/${id}`); 
};

const currentPage = ref(1);
const itemsPerPage = 10; 


const totalPages = computed(() => {
    return Math.ceil(financesData.value.length / itemsPerPage);
});

const displayedTasks = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return financesData.value.slice(start, end);
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
        financesData.value = financesData.value.filter(item => item.id !== itemToDeleteId.value);
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

const formatAmount = (value) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue) || numericValue === null) {
        return '';
    }

    return new Intl.NumberFormat('es-CO', { 
        style: 'currency',
        currency: 'COP', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0, 
    }).format(numericValue);
};

</script>