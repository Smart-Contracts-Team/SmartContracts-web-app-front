import { storage } from '@/config/firebaseConfig' // Importa la instancia de storage desde firebaseConfig
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export const PhotoService = {
  async uploadPhoto(file: File) {
    const photoRef = ref(storage, `images/${uuidv4()}.${file.name.split('.').pop()}`)
    await uploadBytes(photoRef, file)
    const downloadURL = await getDownloadURL(photoRef)
    const shortURL = downloadURL.split('%2F').pop()
    return shortURL
  },

  async deletePhoto(item: any): Promise<void> {
    if (item && item.photo) {
      const imageRef = ref(storage, `images/${item.photo?.split('?')[0]}`)
      await deleteObject(imageRef)
    }
  }
}
