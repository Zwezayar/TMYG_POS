export async function compressImageFile(
  file: File,
  maxSize = 500
): Promise<Blob> {
  if (typeof window === "undefined") {
    return file;
  }

  if (!file.type.startsWith("image/")) {
    return file;
  }

  const imageUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(imageUrl);
    const { width, height } = image;

    const scale = Math.min(maxSize / width, maxSize / height, 1);
    const targetWidth = Math.round(width * scale);
    const targetHeight = Math.round(height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return file;
    }

    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        (result) => {
          resolve(result);
        },
        "image/jpeg",
        0.7
      );
    });

    return blob ?? file;
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

