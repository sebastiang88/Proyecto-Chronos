<template>
    <div class="relative overflow-x-auto shadow-xl sm:rounded-lg border border-purple-300">
        <table class="w-full text-sm text-left rtl:text-right text-gray-700">
            
            <!--columnas-->
            <thead class="text-xs text-white uppercase bg-blue-600">
                <tr>
                    <th scope="col" class="p-4 w-12"></th> 
                    
                    <th 
                        v-for="column in columns" 
                        :key="column.key" 
                        scope="col" 
                        class="px-6 py-3" 
                        :class="column.widthClass" 
                    >
                        {{ column.label }}
                    </th>

                    <th scope="col" class="px-6 py-3 text-center w-32">Acciones</th>
                </tr>
            </thead>
            
            <!--contenido-->
            <tbody>
                <tr 
                    v-for="item in data" 
                    :key="item.id" 
                    class="bg-white border-b border-gray-200 hover:bg-purple-100 transition duration-300"
                >
                    <td class="w-4 p-4">
                        </td>

                    <td 
                        v-for="column in columns" 
                        :key="column.key" 
                        class="px-6 py-4"
                        :class="column.key === 'title' ? 'font-medium text-gray-900 whitespace-nowrap truncate max-w-xs' : ''"
                    >
                        <slot :name="`cell-${column.key}`" :item="item">
                            {{ item[column.key] }}
                        </slot>
                    </td>
                    
                    <td class="px-6 py-4 text-center space-x-6 whitespace-nowrap w-32">
                        <button @click="$emit('edit', item.id)" class="font-medium text-purple-600 hover:text-purple-800 transition">Editar</button>
                        <button @click="$emit('delete', item.id)" class="font-medium text-red-600 hover:text-red-800 transition">Eliminar</button>
                    </td>
                </tr>
            </tbody>

        </table>
            <!--navegacion-->
            <nav class="flex items-center flex-wrap md:flex-row justify-between p-4 bg-white border-t border-gray-200" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 block w-full md:inline md:w-auto">
                    Página <span class="font-semibold text-gray-900">{{ currentPage }}</span> de <span class="font-semibold text-gray-900">{{ totalPages }}</span>
                </span>
                
                <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 mt-2 md:mt-0">
                    
                    <li>
                        <button 
                            @click="$emit('prev')"
                            :disabled="currentPage === 1"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                    </li>
                    
                    <li v-for="page in totalPages" :key="page">
                        <button 
                            @click="$emit('page-change', page)"
                            :aria-current="currentPage === page ? 'page' : undefined"
                            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 transition duration-150"
                            :class="{
                                'text-white bg-purple-600 hover:bg-purple-700 border-purple-600': currentPage === page,
                                'text-gray-500 bg-white hover:bg-gray-100': currentPage !== page
                            }"
                        >
                            {{ page }}
                        </button>
                    </li>
                    
                    <li>
                        <button 
                            @click="$emit('next')"
                            :disabled="currentPage === totalPages"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </li>
                </ul>
            </nav>

    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    data: { type: Array, required: true, default: () => [] },
    columns: { type: Array, required: true, default: () => [] },
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
});

defineEmits(['edit', 'delete', 'page-change', 'next', 'prev']);
</script>