export const CategoryService = {
  async getCategories() {
    return Promise.resolve([
      { id: 1, name: 'marketing', display: 'Marketing' },
      { id: 2, name: 'technology', display: 'Tecnología' },
      { id: 3, name: 'audiovisual-production', display: 'Producción Audiovisual' },
      { id: 3, name: 'beauty-consulting', display: 'Asesoramiento de Belleza' }
    ])
  },

  async getCategoryName(display: string): Promise<string | undefined> {
    const categories = await this.getCategories()
    const category = categories.find((category) => category.display === display)
    return category ? category.name : undefined
  }
}
