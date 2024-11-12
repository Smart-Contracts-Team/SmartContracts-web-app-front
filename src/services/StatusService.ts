export const StateService = {
  async getServiceStateOptions() {
    return Promise.resolve([
      { id: 1, name: 'abierto', display: 'Abierto' },
      { id: 2, name: 'cerrado', display: 'Cerrado' },
      { id: 3, name: 'ocupado', display: 'Ocupado' }
    ])
  },

  async getTaskStateOptions() {
    return Promise.resolve([
      { id: 1, name: 'To do', display: 'To do' },
      { id: 2, name: 'In progress', display: 'In process' },
      { id: 3, name: 'Done', display: 'Done' }
    ])
  }
}
