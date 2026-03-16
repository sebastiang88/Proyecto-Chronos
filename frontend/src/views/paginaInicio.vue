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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
                v-for="(reminder, index) in proximosRecordatorios"
                :key="reminder.id"
                class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                @click="verRecordatorio(reminder)"
            >
                <!-- Header con ícono y título -->
                <div class="flex items-start gap-3 mb-3">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        :class="categoriaInfo(reminder.categoria).iconBg">
                        {{ categoriaInfo(reminder.categoria).icono }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-medium text-gray-900 text-sm leading-tight">
                            <span v-if="reminder.completed" class="mr-1">✅</span>{{ reminder.titulo }}
                        </h4>
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
                            :class="categoriaInfo(reminder.categoria).badge">
                            {{ categoriaInfo(reminder.categoria).label }}
                        </span>
                    </div>
                </div>

                <!-- Fecha de vencimiento -->
                <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-500 font-medium">Fecha de vencimiento:</span>
                    <div class="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-semibold">
                        <span>📅</span>
                        <span>{{ formatDate(reminder.fecha) }}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Modal: Ver recordatorio -->
    <Teleport to="body">
    <div v-if="modalVerAbierto" class="fixed inset-0 z-50 flex items-center justify-center">

      <!-- Fondo oscuro -->
      <div class="absolute inset-0 bg-black/50" @click="modalVerAbierto = false"></div>

      <!-- Caja del modal -->
    <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 z-10" v-if="recordatorioSeleccionado">
        
      <!-- Header con ícono y categoría -->
      <div class="flex items-start gap-3 mb-4">

            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            :class="categoriaInfo(recordatorioSeleccionado.categoria).iconBg">
            {{ categoriaInfo(recordatorioSeleccionado.categoria).icono }}
            </div>

            <div class="flex-1">

            <h3 class="font-bold text-lg leading-tight text-gray-800">{{ recordatorioSeleccionado.titulo }}</h3>
            <span class="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
                :class="categoriaInfo(recordatorioSeleccionado.categoria).badge">
                {{ categoriaInfo(recordatorioSeleccionado.categoria).label }}
            </span>

            </div>
      </div>

      <!-- Detalle -->
      <div class="grid grid-cols-2 gap-3 text-sm mt-2">

          <p class="flex items-center gap-2 text-gray-500">
                    <span>📅</span> {{ formatearFechaLarga(recordatorioSeleccionado.fecha) }}
          </p>

          <p class="flex items-center gap-2 text-gray-500" v-if="recordatorioSeleccionado.hora">
                    <span>🕐</span> {{ recordatorioSeleccionado.hora }}
          </p>

          <p class="flex items-center gap-2" v-if="recordatorioSeleccionado.prioridad">
                    <span>🚩</span>
                    <span class="text-xs font-semibold px-2 py-0.5 rounded-full border"
                        :class="getPriorityClass(recordatorioSeleccionado.prioridad)">
                        {{ recordatorioSeleccionado.prioridad }}
                    </span>
          </p>

          <p class="flex items-center gap-2 text-gray-500" v-if="recordatorioSeleccionado.tipo">
                    <span>🏷️</span> {{ recordatorioSeleccionado.tipo }}
          </p>

          <p class="flex items-center gap-2 text-gray-500" v-if="recordatorioSeleccionado.materia">
                    <span>📖</span> {{ recordatorioSeleccionado.materia }}
          </p>

          <p class="flex items-center gap-2 text-gray-500" v-if="recordatorioSeleccionado.frecuencia">
                    <span>🔁</span> {{ recordatorioSeleccionado.frecuencia }}
          </p>

          <p class="flex items-center gap-2 text-gray-500" v-if="recordatorioSeleccionado.montoNumerico">
                    <span>💰</span> {{ recordatorioSeleccionado.monto }}
          </p>

      </div>

      <p class="flex items-start gap-2 text-gray-500 text-sm mt-3" v-if="recordatorioSeleccionado.descripcion">
            <span>📝</span> {{ recordatorioSeleccionado.descripcion }}
      </p>

      <!-- Acciones -->
      <div class="flex justify-end gap-2 mt-6">

        <button 
            class="px-4 py-2 text-sm font-semibold rounded-lg border-2 border-red-400 text-red-500 hover:bg-red-50 transition-colors duration-200"
            @click="eliminarRecordatorio(recordatorioSeleccionado.id)">
            Eliminar
        </button>

        <button 
            class="px-4 py-2 text-sm font-semibold rounded-lg border-2 border-green-500 text-green-600 hover:bg-green-50 transition-colors duration-200"
            @click="completarRecordatorio(recordatorioSeleccionado.id)">
            Completar
        </button>

        <button 
            class="px-4 py-2 text-sm font-semibold rounded-lg border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            @click="irAEditar(recordatorioSeleccionado)">
            Editar
        </button>

        <button 
            class="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-orange-600 hover:to-pink-400 text-white transition-all duration-300"
            @click="modalVerAbierto = false">
            Cerrar
        </button>

      </div>

    </div>

    </div>
    </Teleport>

      </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'; 
import { useRouter } from 'vue-router';

import AppSidebar from '../components/appSideBar.vue'; 
import Card from '../components/card.vue';
import seccionEstudio from '../assets/SeccionEstudio.jpg';
import seccionFinanzas from '../assets/SeccionFinanzas.jpg';
import seccionSalud from '../assets/SeccionSalud.jpg';
import seccionTiempoLibre from '../assets/SeccionTiempoLibre.jpg';

const router = useRouter();

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
        id: 1,
        titulo: 'Entregar tarea de BD', 
        categoria: 'estudio', 
        fecha: '2026-03-16', 
        hora: '23:59',
        tipo: 'tarea',
        materia: 'Bases de Datos',
        prioridad: 'Alta',
        descripcion: 'Subir al campus virtual', 
        notificaciones: true,
        completed: false
    },
    { 
        id: 2,
        titulo: 'Cita médica general', 
        categoria: 'salud', 
        fecha: '2026-03-18', 
        hora: '09:00',
        tipo: 'cita-medica',
        prioridad: 'Alta',
        descripcion: 'Control de rutina', 
        notificaciones: true,
        completed: false
    },
    { 
        id: 3,
        titulo: 'Pagar matrícula', 
        categoria: 'finanzas', 
        fecha: '2026-03-20', 
        hora: '',
        tipo: 'gasto',
        montoNumerico: 1500000,
        monto: '$ 1.500.000',
        descripcion: 'Fecha límite sin recargo', 
        notificaciones: true,
        completed: false
    },
    { 
        id: 4,
        titulo: 'Series / descanso', 
        categoria: 'tiempo-libre', 
        fecha: '2026-03-22', 
        hora: '20:00',
        tipo: 'entretenimiento',
        frecuencia: 'semanal',
        prioridad: 'Baja',
        descripcion: '', 
        notificaciones: false,
        completed: false
    },
    { 
        id: 5,
        titulo: 'Parcial de Cálculo', 
        categoria: 'estudio', 
        fecha: '2026-03-25', 
        hora: '10:00',
        tipo: 'examen',
        materia: 'Cálculo',
        prioridad: 'Alta',
        descripcion: 'Salón B-201', 
        notificaciones: true,
        completed: false
    },
    { 
        id: 6,
        titulo: 'Tomar vitaminas', 
        categoria: 'salud', 
        fecha: '2026-03-28', 
        hora: '08:00',
        tipo: 'medicamento',
        prioridad: 'Media',
        descripcion: 'Complejo B después del desayuno', 
        notificaciones: true,
        completed: false
    },
    { 
        id: 7,
        titulo: 'Pagar arriendo', 
        categoria: 'finanzas', 
        fecha: '2026-03-30', 
        hora: '',
        tipo: 'gasto',
        montoNumerico: 900000,
        monto: '$ 900.000',
        descripcion: '', 
        notificaciones: true,
        completed: false
    },
    { 
        id: 8,
        titulo: 'Salida con amigos', 
        categoria: 'tiempo-libre', 
        fecha: '2026-04-01', 
        hora: '18:00',
        tipo: 'social',
        frecuencia: 'quincenal',
        prioridad: 'Media',
        descripcion: 'Cine y cena', 
        notificaciones: true,
        completed: false
    },
]);

const proximosRecordatorios = computed(() => {
    const sorted = [...recordatorios.value].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    return sorted.slice(0, 6); // Mostrar más recordatorios en horizontal
});

// Categorías para recordatorios
const categorias = [
  {
    id: 'estudio',
    label: 'Estudio',
    icono: '📚',
    badge: 'bg-blue-100 text-blue-700',
    chip: 'bg-blue-100 text-blue-700',
    iconBg: 'bg-blue-100',
    dot: 'bg-blue-500',
  },
  {
    id: 'salud',
    label: 'Salud',
    icono: '🩺',
    badge: 'bg-emerald-100 text-emerald-700',
    chip: 'bg-emerald-100 text-emerald-700',
    iconBg: 'bg-emerald-100',
    dot: 'bg-emerald-500',
  },
  {
    id: 'finanzas',
    label: 'Finanzas',
    icono: '💰',
    badge: 'bg-amber-100 text-amber-700',
    chip: 'bg-amber-100 text-amber-700',
    iconBg: 'bg-amber-100',
    dot: 'bg-amber-500',
  },
  {
    id: 'tiempo-libre',
    label: 'Tiempo Libre',
    icono: '🎉',
    badge: 'bg-purple-100 text-purple-700',
    chip: 'bg-purple-100 text-purple-700',
    iconBg: 'bg-purple-100',
    dot: 'bg-purple-500',
  },
  {
    id: 'general',
    label: 'General',
    icono: '📅',
    badge: 'bg-gray-100 text-gray-700',
    chip: 'bg-gray-100 text-gray-700',
    iconBg: 'bg-gray-100',
    dot: 'bg-gray-500',
  },
]

const categoriaInfo = (id) => categorias.find((c) => c.id === id) || categorias[4]

const getPriorityClass = (priority) => {
    switch (priority) {
        case 'Alta': return 'bg-red-100 text-red-800 border-red-300';
        case 'Media': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'Baja': return 'bg-green-100 text-green-800 border-green-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

// ─── Modales ─────────────────────────────────────────────────────
const modalVerAbierto = ref(false)
const recordatorioSeleccionado = ref(null)

function verRecordatorio(rec) {
  recordatorioSeleccionado.value = rec
  modalVerAbierto.value = true
}

function completarRecordatorio(id) {
  const index = recordatorios.value.findIndex(r => r.id === id)
  if (index !== -1) {
    // Si no está completado, lo marcamos como completado y lo removemos
    if (!recordatorios.value[index].completed) {
      recordatorios.value.splice(index, 1)
    } else {
      // Si ya está completado, lo marcamos como no completado
      recordatorios.value[index].completed = false
    }
  }
  modalVerAbierto.value = false
}

function eliminarRecordatorio(id) {
  const index = recordatorios.value.findIndex(r => r.id === id)
  if (index !== -1) {
    recordatorios.value.splice(index, 1)
  }
  modalVerAbierto.value = false
}

function irAEditar(recordatorio) {
  modalVerAbierto.value = false
  const rutas = {
    'estudio': '/editAcademy',
    'salud': '/editHealth', 
    'finanzas': '/editFinance',
    'tiempo-libre': '/editLeisure',
    'general': '/editGeneral'
  }
  const ruta = rutas[recordatorio.categoria] || '/edit';
  router.push({ path: ruta, query: { id: recordatorio.id } });
}

function formatearFechaLarga(fechaStr) {
  const [y, m, d] = fechaStr.split('-')
  return `${parseInt(d)} de ${['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][parseInt(m) - 1]} de ${y}`
}

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
};

const irARuta = (ruta) => {
console.log(`Simulando navegación a la sección: ${ruta}`);
};

</script>