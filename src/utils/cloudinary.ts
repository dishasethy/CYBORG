/**
 * Optimizes a Cloudinary image URL by injecting dynamic transformations
 * (automatic format selection, automatic quality compression, and width limit).
 * 
 * @param url The original Cloudinary image URL
 * @param width The target width for optimization
 * @returns The optimized URL if it's a Cloudinary URL, otherwise the original URL
 */
export function optimizeCloudinaryUrl(url: string, width: number = 400): string {
  if (!url || typeof url !== 'string') return url;
  
  // Only optimize Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) return url;

  // Ensure we don't apply transformation multiple times
  if (url.includes('f_auto') || url.includes('q_auto')) return url;

  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;

  const prefix = url.substring(0, uploadIndex + 8); // includes '/upload/'
  const suffix = url.substring(uploadIndex + 8);

  // f_auto: choose best format (WebP/AVIF)
  // q_auto: compress automatically based on visual quality
  // w_<width>: resize to target width
  // c_limit: don't upscale if the original image is smaller
  const transform = `f_auto,q_auto,w_${width},c_limit`;

  return `${prefix}${transform}/${suffix}`;
}
