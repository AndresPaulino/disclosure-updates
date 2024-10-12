"use client"

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';

const disclosureTypes = [
  'Financial Statement',
  'Annual Report',
  'Quarterly Report',
  'Audit Report',
  'Tax Document',
  'Legal Agreement',
  'Compliance Certificate',
];

export default function FileUpload({ onFileUpload }) {
  const [selectedType, setSelectedType] = useState('');
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast({
        title: "Invalid file",
        description: "Please upload only PDF files.",
        variant: "destructive",
      });
      return;
    }

    if (selectedType) {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB.",
          variant: "destructive",
        });
        return;
      }
      onFileUpload({ file, type: selectedType });
      setSelectedType('');
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    } else {
      toast({
        title: "Select Disclosure Type",
        description: "Please select a disclosure type before uploading.",
        variant: "destructive",
      });
    }
  }, [selectedType, onFileUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <div className="mb-8">
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select disclosure type" />
        </SelectTrigger>
        <SelectContent>
          {disclosureTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the PDF file here ...</p>
        ) : (
          <div>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">Drag & drop a PDF file here, or click to select a file</p>
            <p className="text-sm text-gray-500">Only PDF files are accepted</p>
          </div>
        )}
      </div>
      <Button className="mt-4 w-full" onClick={() => document.querySelector('input[type="file"]').click()}>
        Upload PDF
      </Button>
    </div>
  );
}