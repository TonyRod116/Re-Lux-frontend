import '../../styles/forms.css'
import { uploadImage } from '../../services/tonyCloudinary'

export default function SignUpImgForm({ labelText = 'Profile Image', fieldName = 'Image', setImage }){

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0]
      if (!file) return
      
      const { data } = await uploadImage(file)
      setImage(data.secure_url)
      console.log('Image uploaded successfully:', data.secure_url)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

    return (
        <>
        <label htmlFor={fieldName}>{labelText}</label>
        <input 
          type="file" 
          name={fieldName} 
          id={fieldName} 
          accept="image/*"
          onChange={handleImageUpload}
        />
        </>
    )
}