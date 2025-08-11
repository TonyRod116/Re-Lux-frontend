import './ImageUploadField.css'
import { uploadImage } from '../../services/cloudinary'
import { useState } from 'react'

const ImageUpload = ({ labelText = 'Upload a photo', fieldName='image', setImage, imageURL, setUploading}) => {

    // State

    const [error, setError] = useState('')

    // Functions

    const handleUpload = async (e) => {
        setUploading(true)
        try {
            const file = e.target.file[0]
            const { data } = await uploadImage(file)
            setImage(data.secure_url)
        } catch (error) {
            console.log(error)
            setError('Upload failed. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
        { imageURL && <img className='uploaded-image' src={imageURL} />}
        {/* The above code adds a preview of the img if one has been uploaded */}


        {error && <p className='error-message'>{error}</p>}

        <label htmlFor={fieldName}>{labelText}</label>
        <input type="file" name={fieldName} id={fieldName} onChange={handleUpload} />

        {/* This is the actual field that goes in the form */}

        </>
    )


}