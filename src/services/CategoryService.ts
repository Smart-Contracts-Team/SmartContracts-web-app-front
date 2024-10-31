export const CategoryService = {
  async getCategories() {
    return Promise.resolve([
      { id: 1, name: 'marketing', display: 'Marketing' },
      { id: 2, name: 'tecnología', display: 'Tecnología' },
      { id: 3, name: 'producción-audiovisual', display: 'Producción Audiovisual' }
    ])
  },

  async getDisplayByName(name: string): Promise<string | undefined> {
    const categories = await this.getCategories()
    const category = categories.find((category) => category.name === name)
    return category ? category.display : undefined
  }
}
