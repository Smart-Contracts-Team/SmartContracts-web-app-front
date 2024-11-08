export const StateService = {
  async getStateOptions() {
    return Promise.resolve([
      { id: 1, name: 'abierto', display: 'Abierto' },
      { id: 2, name: 'cerrado', display: 'Cerrado' },
      { id: 3, name: 'ocupado', display: 'Ocupado' }
    ])
  },

  async getDisplayByName(name: string): Promise<string | undefined> {
    const stateOptions = await this.getStateOptions()
    const state = stateOptions.find((state) => state.name === name)
    return state ? state.display : undefined
  }
}
