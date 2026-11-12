// Shares an image through the phone's own share sheet (WhatsApp, Instagram,
// ...). Where that is not possible the image is saved instead.
// Resolves to "shared", "saved" or "cancelled".
export const shareImage = async (blob, filename, text) => {
  const file = new File([blob], filename, { type: blob.type });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text });
      return "shared";
    } catch (e) {
      if (e && e.name === "AbortError") return "cancelled";
      // Anything else: fall through to saving the file.
    }
  }
  saveFile(blob, filename);
  return "saved";
};

export const saveFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
};

export const whatsappLink = (text) => `https://wa.me/?text=${encodeURIComponent(text)}`;
