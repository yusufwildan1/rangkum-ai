'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE_MB } from '@/lib/constants';
import { FolderIcon, InboxIcon } from '@/components/icons/NeonIcons';

interface Props {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<Props> = ({ onFileSelect }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        alert('Format file tidak didukung. Gunakan PDF, DOCX, TXT, atau Markdown.');
        return;
      }
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`glass p-10 md:p-14 text-center cursor-pointer transition-all duration-300 ${
        isDragActive
          ? '!border-[#2F49FF] scale-[1.02] shadow-[8px_8px_0_0_#2F49FF]'
          : 'hover:shadow-[8px_8px_0_0_#15161B]'
      }`}
    >
      <input {...getInputProps()} />
      <div
        className={`mx-auto neon-icn-badge mb-4 transition-all duration-300 ${
          isDragActive ? 'scale-110' : ''
        }`}
      >
        {isDragActive ? <InboxIcon size={42} /> : <FolderIcon size={42} />}
      </div>
      {isDragActive ? (
        <p className="text-[#2F49FF] font-bold text-lg uppercase tracking-wide">
          Lepaskan file di sini...
        </p>
      ) : (
        <>
          <p className="font-bold uppercase tracking-wide">
            Drag &amp; drop file di sini, atau{' '}
            <span className="text-[#2F49FF] underline">klik untuk browse</span>
          </p>
          <p className="text-sm mt-1">
            Didukung: {ALLOWED_EXTENSIONS.map((e) => `.${e}`).join(', ')} (maks {MAX_FILE_SIZE_MB}MB)
          </p>
        </>
      )}
    </div>
  );
};

export default FileUpload;
