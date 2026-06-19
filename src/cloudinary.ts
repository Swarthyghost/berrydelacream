export const uploadImageToCloudinary = async (base64Image: string): Promise<string> => {
  if (!base64Image || !base64Image.startsWith('data:image')) {
    return base64Image;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const folderName = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary environment variables are not set');
  }

  const formData = new FormData();
  formData.append('file', base64Image);
  formData.append('upload_preset', uploadPreset);
  if (folderName) {
    formData.append('folder', folderName);
  }

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to upload image: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url; // Return the Cloudinary URL
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
