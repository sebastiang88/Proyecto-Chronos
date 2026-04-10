import api from './api.js'

export const healthService = {
  // Obtener todos los registros de salud
  async getAll() {
    try {
      const response = await api.get('/health')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Obtener un registro por ID
  async getById(id) {
    try {
      const response = await api.get(`/health/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Crear nuevo registro de salud
  async create(data) {
    try {
      const response = await api.post('/health', data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Actualizar registro de salud
  async update(id, data) {
    try {
      const response = await api.put(`/health/${id}`, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Eliminar registro de salud
  async delete(id) {
    try {
      const response = await api.delete(`/health/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
}
