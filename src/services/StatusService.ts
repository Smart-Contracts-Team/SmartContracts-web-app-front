export const StateService = {
  // async getContractStateOptions() {
  //   return Promise.resolve([
  //     { id: 1, name: 'active', display: 'Active' },
  //     { id: 2, name: 'pending', display: 'Pending' },
  //     { id: 3, name: 'cancel', display: 'Cancel' }
  //   ])
  // },

  async getServiceStateOptions() {
    return Promise.resolve([
      { id: 1, name: 'active', display: 'Active' },
      { id: 2, name: 'inactive', display: 'Inactive' }
    ])
  },

  async getTaskStateOptions() {
    return Promise.resolve([
      { id: 1, name: 'to-do', display: 'To do' },
      { id: 2, name: 'in-process', display: 'In process' },
      { id: 2, name: 'pending', display: 'Pending' },
      { id: 3, name: 'done', display: 'Done' }
    ])
  }
}
