"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';
import DocumentList from '@/components/DocumentList';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';

export default function Portal() {
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handleFileUpload = (newDocument) => {
    setDocuments([...documents, newDocument]);
  };

  const handleDocumentDelete = (index) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    setDocuments(newDocuments);
  };

  const handleSubmit = async () => {
    if (documents.length === 0) {
      toast({
        title: "No documents to submit",
        description: "Please upload at least one document before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Submission Successful",
        description: `${documents.length} document(s) have been submitted successfully.`,
      });
      setDocuments([]);
      setIsSubmitting(false);
    }, 2000);
  };

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Disclosure Portal</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <DocumentList documents={documents} onDelete={handleDocumentDelete} />
      <Button className="mt-4 w-full" onClick={handleSubmit} disabled={isSubmitting}>
        <Send className="mr-2 h-4 w-4" /> 
        {isSubmitting ? 'Submitting...' : 'Submit Disclosures'}
      </Button>
    </div>
  );
}