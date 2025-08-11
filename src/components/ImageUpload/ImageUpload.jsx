import './ImageUpload.css'
import { uploadImage } from '../../services/cloudinary'
import { useState } from 'react'

const ImageUpload = ({ labelText = 'Upload a photo', fieldName = 'image', setImage, imageURL, setUploading }) => {

    // State

    const [error, setError] = useState('')

    // Functions

    const handleUpload = async (e) => {
        setUploading(true)
        try {
            const files = Array.from(e.target.files);

            // Using Promise.all to upload all the files
            const responses = await Promise.all(files.map(file => uploadImage(file))
            )

            // This gets just the URLs from the response
            const justURLs = responses.map(response => response.data.secure_url)

            // 'prev' gives you access to the previous state. This means 'if there is a previous state, use this or if there isn't, use an empty array. Then append new URLs to the "justURls" array.
            setImage(prev => [...(prev || []), ...justURLs])

        } catch (error) {
            console.log(error)
            setError('Upload failed. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
            {Array.isArray(imageURL)
                ? imageURL.map((url, idx) => (
                    <img key={idx} className='uploaded-image' src={url} alt={`Uploaded ${idx}`} />
                ))
                : imageURL
                    ? <img className='uploaded-image' src={imageURL} alt="Uploaded" />
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
