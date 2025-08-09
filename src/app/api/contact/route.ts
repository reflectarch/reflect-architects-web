import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the contact request document in Sanity as a draft
    // (Contributor access allows creating drafts)
    const contactRequest = {
      _type: 'contactRequest',
      name,
      email,
      subject: subject || '',
      message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    const result = await writeClient.create(contactRequest);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact message sent successfully',
        id: result._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting contact request:', error);
    return NextResponse.json(
      { error: 'Failed to send contact message' },
      { status: 500 }
    );
  }
} 