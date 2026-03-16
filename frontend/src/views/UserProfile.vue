<template>
  <div class="flex min-h-screen">
    <AppSidebar />

    <main class="flex-grow p-8 bg-white overflow-y-auto">
      <div class="max-w-4xl mx-auto">
        <!-- Header del perfil -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
          <div class="flex items-center space-x-6">
            <div class="avatar">
              <div class="w-24 h-24 rounded-full ring-4 ring-white ring-offset-2 ring-offset-blue-600 overflow-hidden">
                <img
                  src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  alt="Avatar del usuario"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
            <div>
              <h1 class="text-3xl font-bold">{{ userProfile.nombre }}</h1>
              <p class="text-blue-100">{{ userProfile.email }}</p>
              <p class="text-sm text-blue-100 mt-2">Miembro desde {{ userProfile.fechaRegistro }}</p>
            </div>
          </div>
        </div>

        <!-- Información personal -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Información Personal</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nombre completo</label>
              <p class="mt-1 text-gray-900">{{ userProfile.nombreCompleto }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
              <p class="mt-1 text-gray-900">{{ userProfile.fechaNacimiento }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Teléfono</label>
              <p class="mt-1 text-gray-900">{{ userProfile.telefono }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Ubicación</label>
              <p class="mt-1 text-gray-900">{{ userProfile.ubicacion }}</p>
            </div>
          </div>
        </div>

        <!-- Métricas de rendimiento -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Métricas de Rendimiento</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600" 
                   title="Días consecutivos completando al menos una rutina. Se reinicia si saltas un día. ¡Mantén la racha!">
                {{ userProfile.metricas.diasSeguidos }}
              </div>
              <div class="text-gray-600 text-sm">Días seguidos</div>
              <div class="text-xs text-gray-500 mt-1">Racha actual</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600" 
                   title="Porcentaje de rutinas completadas vs total creadas en todas las secciones">
                {{ userProfile.metricas.tasaCompletitud }}%
              </div>
              <div class="text-gray-600 text-sm">Tasa de completitud</div>
              <div class="text-xs text-gray-500 mt-1">Rutinas completadas</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600" 
                   title="Total de rutinas completadas durante el mes actual">
                {{ userProfile.metricas.rutinasTotales }}
              </div>
              <div class="text-gray-600 text-sm">Rutinas totales</div>
              <div class="text-xs text-gray-500 mt-1">Este mes</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-orange-600" 
                   title="Puntos acumulados por completar rutinas (+10 pts), logros (+50-100 pts) y rachas. Nunca se pierden">
                {{ userProfile.metricas.puntuacion }}
              </div>
              <div class="text-gray-600 text-sm">Puntuación</div>
              <div class="text-xs text-gray-500 mt-1">Puntos acumulados</div>
            </div>
          </div>

          <!-- Estadísticas semanales -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-800">Estadísticas de la Semana</h3>
            <div class="grid grid-cols-7 gap-2">
              <div v-for="(dia, index) in userProfile.metricas.estadisticasSemanales" :key="index" class="text-center">
                <div class="text-xs text-gray-500 mb-1">{{ dia.nombre }}</div>
                <div class="bg-gray-100 rounded-lg p-2">
                  <div class="text-sm font-bold text-blue-600">{{ dia.rutinasCompletadas }}/{{ dia.rutinasTotales }}</div>
                  <div class="text-xs text-gray-600">{{ dia.porcentaje }}%</div>
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-600 mt-4 text-center">
              Muestra el número de rutinas completadas vs totales por día.
              Los recordatorios deben marcarse manualmente en cada sección.
            </p>
          </div>
        </div>

        <!-- Progreso por secciones -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Progreso por Secciones</h2>
          <div class="space-y-6">
            <div v-for="seccion in userProfile.progresoSecciones" :key="seccion.nombre" class="border rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <span class="text-2xl">{{ seccion.icono }}</span>
                  <span class="text-gray-800 font-medium">{{ seccion.nombre }}</span>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold text-blue-600">{{ seccion.completadas }}/{{ seccion.totalCreadas }}</div>
                  <div class="text-sm text-gray-600">{{ seccion.porcentaje }}% completado</div>
                </div>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div
                  class="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                  :style="{ width: seccion.porcentaje + '%' }"
                ></div>
              </div>
              <div class="mt-2 text-xs text-gray-500">
                Total de rutinas creadas: {{ seccion.totalCreadas }} • Completadas: {{ seccion.completadas }}
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-4 text-center">
            Porcentaje calculado basado en rutinas completadas vs total creadas en cada sección.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppSidebar from '../components/appSideBar.vue';

// Datos del perfil del usuario (simulados)
const userProfile = ref({
  nombre: 'Estudiante Ibero',
  email: 'estudiante.ibero@email.com',
  fechaRegistro: 'Enero 2024',
  nombreCompleto: 'Juan Pérez García',
  fechaNacimiento: '15 de marzo de 2000',
  telefono: '+52 55 1234 5678',
  ubicacion: 'Ciudad de México, México',
  metricas: {
    diasSeguidos: 7,
    tasaCompletitud: 68,
    rutinasTotales: 45,
    puntuacion: 1250,
    estadisticasSemanales: [
      { nombre: 'L', rutinasCompletadas: 6, rutinasTotales: 8, porcentaje: 75 },
      { nombre: 'M', rutinasCompletadas: 7, rutinasTotales: 8, porcentaje: 88 },
      { nombre: 'M', rutinasCompletadas: 4, rutinasTotales: 8, porcentaje: 50 },
      { nombre: 'J', rutinasCompletadas: 8, rutinasTotales: 8, porcentaje: 100 },
      { nombre: 'V', rutinasCompletadas: 5, rutinasTotales: 8, porcentaje: 63 },
      { nombre: 'S', rutinasCompletadas: 6, rutinasTotales: 8, porcentaje: 75 },
      { nombre: 'D', rutinasCompletadas: 3, rutinasTotales: 8, porcentaje: 38 }
    ]
  },
  progresoSecciones: [
    { nombre: 'Estudio', icono: '📚', totalCreadas: 120, completadas: 90, porcentaje: 75 },
    { nombre: 'Salud', icono: '🩺', totalCreadas: 85, completadas: 53, porcentaje: 62 },
    { nombre: 'Finanzas', icono: '💰', totalCreadas: 45, completadas: 23, porcentaje: 51 },
    { nombre: 'Tiempo Libre', icono: '🎮', totalCreadas: 95, completadas: 80, porcentaje: 84 }
  ]
});
</script>
