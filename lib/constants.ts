export const MAX_FILE_SIZE_MB = 4;
export const MAX_TEXT_LENGTH = 12000;
export const PREVIEW_LENGTH = 300;

export const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'txt', 'md'];
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/markdown',
];

export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

export function isAllowedFile(file: File): boolean {
  const ext = getFileExtension(file.name);
  return ALLOWED_EXTENSIONS.includes(ext);
}
