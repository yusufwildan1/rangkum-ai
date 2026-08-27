import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { MAX_FILE_SIZE_MB, isAllowedFile, getFileExtension } from './constants';

export async function extractText(file: File): Promise<string> {
  if (!isAllowedFile(file)) {
    throw new Error('Format file tidak didukung. Gunakan PDF, DOCX, TXT, atau Markdown.');
  }

  const buffer = await file.arrayBuffer();

  const sizeLimitMB = parseInt(process.env.MAX_FILE_SIZE_MB || String(MAX_FILE_SIZE_MB), 10);
  const limitBytes = sizeLimitMB * 1024 * 1024;
  if (buffer.byteLength > limitBytes) {
    throw new Error(`Ukuran file melebihi batas ${sizeLimitMB}MB`);
  }

  const ext = getFileExtension(file.name);

  if (ext === 'pdf') {
    const data = await pdfParse(Buffer.from(buffer));
    return data.text || '';
  } else if (ext === 'docx') {
    const result = await mammoth.extractRawText({ buffer: new Uint8Array(buffer) });
    return result.value || '';
  } else if (ext === 'txt' || ext === 'md') {
    return new TextDecoder('utf-8').decode(buffer);
  } else {
    throw new Error('Format file tidak didukung. Gunakan PDF, DOCX, TXT, atau Markdown.');
  }
}
