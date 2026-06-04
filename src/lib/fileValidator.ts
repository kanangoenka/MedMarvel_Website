export const MODALITY_EXTENSIONS = ["dcm", "dicom", "nii", "nii.gz"];
export const OTHER_EXTENSIONS = ["dcm", "dicom", "nii", "nii.gz", "zip", "png", "jpg", "jpeg"];
export const DOCUMENT_EXTENSIONS = ["pdf", "doc", "docx", "xls", "xlsx", "csv", "txt", "png", "jpg", "jpeg"];

export function getFileExtension(fileName: string): string {
  const nameLower = fileName.toLowerCase();
  if (nameLower.endsWith(".nii.gz")) {
    return "nii.gz";
  }
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop() || "" : "";
}

export function validateFile(fileName: string, allowedExtensions: string[]): boolean {
  const ext = getFileExtension(fileName).toLowerCase();
  return allowedExtensions.includes(ext);
}
