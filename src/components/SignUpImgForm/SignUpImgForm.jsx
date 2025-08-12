import '../../styles/forms.css'

export default function SignUpImgForm({ labelText = 'Profile Image', fieldName = 'Image' }){


  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    console.log(file)
  }

    return (
        <>
        <label htmlFor={fieldName}>{labelText}</label>
        <input type="file" name={fieldName} id={fieldName} />
        </>
    )
}