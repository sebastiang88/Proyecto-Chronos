import api from './api.js'

export const academyService = {
  // Obtener todos los registros académicos
  async getAll() {
    try {
      const response = await api.get('/academy')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Obtener un registro por ID
  async getById(id) {
    try {
      const response = await api.get(`/academy/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Crear nuevo registro académico
  async create(data) {
    try {
      const response = await api.post('/academy', data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Actualizar registro académico
  async update(id, data) {
    try {
      const response = await api.put(`/academy/${id}`, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Eliminar registro académico
  async delete(id) {
    try {
      const response = await api.delete(`/academy/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
}
