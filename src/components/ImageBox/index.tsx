import React, { useState, useEffect } from 'react';

interface ImageBoxProps {
  image: string;
  onImageChange: (file: File) => void;
}

const ImageBox: React.FC<ImageBoxProps> = ({ image, onImageChange }) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(image);

  useEffect(() => {
    setPreview(image); // Update preview when the image prop changes
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        if (event.target) {
          setPreview(event.target.result); // Set the preview image
          onImageChange(file); // Notify parent component of the new image
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-48 bg-gray-200 rounded-lg cursor-pointer">
      {preview ? (
        <img src={preview as string} alt="Preview" className="w-full h-full object-cover rounded-lg" />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">Click to upload image</div>
      )}
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageBox;
