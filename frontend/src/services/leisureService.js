import api from './api.js'

export const leisureService = {
  // Obtener todos los registros de tiempo libre
  async getAll() {
    try {
      const response = await api.get('/leisure')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Obtener un registro por ID
  async getById(id) {
    try {
      const response = await api.get(`/leisure/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Crear nuevo registro de tiempo libre
  async create(data) {
    try {
      const response = await api.post('/leisure', data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Actualizar registro de tiempo libre
  async update(id, data) {
    try {
      const response = await api.put(`/leisure/${id}`, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Eliminar registro de tiempo libre
  async delete(id) {
    try {
      const response = await api.delete(`/leisure/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
}
