import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll('files');

  // In a real application, you would handle file storage here
  console.log('Received files:', files);

  return NextResponse.json({ message: 'Files uploaded successfully', files: files.length });
}