import api from './api.js'

export const financeService = {
  // Obtener todos los registros financieros
  async getAll() {
    try {
      const response = await api.get('/finance')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Obtener un registro por ID
  async getById(id) {
    try {
      const response = await api.get(`/finance/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Crear nuevo registro financiero
  async create(data) {
    try {
      const response = await api.post('/finance', data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Actualizar registro financiero
  async update(id, data) {
    try {
      const response = await api.put(`/finance/${id}`, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Eliminar registro financiero
  async delete(id) {
    try {
      const response = await api.delete(`/finance/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
}
