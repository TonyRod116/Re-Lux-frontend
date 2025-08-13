import './ImageUpload.css'
import { uploadImage } from '../../services/tonyCloudinary'
import { useState } from 'react'

const ImageUpload = ({ labelText = 'Upload a photo', fieldName = 'image', setFormData, imageURLs, setUploading }) => {

    // State

    const [error, setError] = useState('')

    // Functions

    const handleUpload = async (e) => {

        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true)
        setError('')

        try {
            const files = Array.from(e.target.files);

            // Using Promise.all to upload all the files
            const responses = await Promise.all(files.map(file => uploadImage(file))
            )

            // This gets just the URLs from the response
            const justURLs = responses.map(response => response.data.secure_url)
            console.log(justURLs)

            // 'prev' gives you access to the previous state. This means 'if there is a previous state, use this or if there isn't, use an empty array. Then append new URLs to the "justURls" array.
            setFormData(formData => {
                return {
                    ...formData,
                    [fieldName]: [...formData.images, ...justURLs]
                }
            })

            // Clears the file input afterwards
            e.target.value = ''

        } catch (error) {
            console.log(error)
            setError('Upload failed. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
            {imageURLs.length > 0
                ? imageURLs.map((url, idx) => (
                    <img key={idx} className='uploaded-image' src={url} alt={`Uploaded ${idx}`} />
                ))
                : imageURLs
                    ? <img className='uploaded-image' src={imageURLs} alt="Uploaded" />
                    : null
            }
            {/* The above code adds a preview of the img or multiple images that have been uploaded by mapping the array */}


            {error && <p className='error-message'>{error}</p>}

            <label htmlFor={fieldName}>{labelText}</label>
            <input type="file" name={fieldName} id={fieldName} onChange={handleUpload} multiple />

            {/* This is the actual field that goes in the form */}

        </>
    )


}

export default ImageUpload
