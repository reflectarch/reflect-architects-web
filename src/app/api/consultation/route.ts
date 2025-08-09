import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { firstName, lastName, email, phone, projectType, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the consultation request document in Sanity as a draft
    // (Contributor access allows creating drafts)
    const consultationRequest = {
      _type: 'consultationRequest',
      firstName,
      lastName,
      email,
      phone: phone || '',
      projectType: projectType || 'other',
      message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    const result = await writeClient.create(consultationRequest);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Consultation request submitted successfully',
        id: result._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting consultation request:', error);
    return NextResponse.json(
      { error: 'Failed to submit consultation request' },
      { status: 500 }
    );
  }
} 