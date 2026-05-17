import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Route handler
export async function GET(request, { params }) {
  const path = params?.path?.join('/') || '';
  
  try {
    // Health check endpoint
    if (path === '' || path === 'health') {
      return NextResponse.json({ 
        status: 'ok', 
        message: 'Hexaren API is running',
        timestamp: new Date().toISOString()
      }, { headers: corsHeaders });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request, { params }) {
  const path = params?.path?.join('/') || '';
  
  try {
    // Contact form submission
    if (path === 'contact') {
      const body = await request.json();
      const supabase = getSupabase();
      
      const contact = {
        id: uuidv4(),
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company || '',
        services: body.services || [],
        message: body.message,
        status: 'new',
        created_at: new Date().toISOString()
      };
      
      // Try to save to Supabase contacts table
      const { data, error } = supabase
        ? await supabase
          .from('contacts')
          .insert([contact])
          .select()
        : { data: null, error: { message: 'Supabase environment variables are not configured' } };
      
      // Send email notification via Resend
      try {
        const resend = getResend();
        if (!resend) {
          throw new Error('RESEND_API_KEY is not configured');
        }

        const servicesText = contact.services.length > 0 
          ? contact.services.join(', ') 
          : 'Not specified';
        
        await resend.emails.send({
          from: 'Hexaren Contact Form <onboarding@resend.dev>',
          to: 'hello@hexaren.dk',
          subject: `New Contact Form Submission from ${body.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
            ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ''}
            <p><strong>Services Interested In:</strong> ${servicesText}</p>
            <p><strong>Message:</strong></p>
            <p>${body.message}</p>
            <hr />
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          `
        });
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Don't fail the request if email fails
      }
      
      if (error) {
        console.error('Supabase error:', error);
        // If table doesn't exist, return success anyway
        if (error.code === '42P01' || error.code === 'PGRST204') {
          return NextResponse.json({ 
            success: true, 
            message: 'Message received',
            contact: contact 
          }, { headers: corsHeaders });
        }
        // Still return success for MVP - log the message
        console.log('Contact form submission:', contact);
        return NextResponse.json({ 
          success: true, 
          message: 'Message received',
          contact: contact 
        }, { headers: corsHeaders });
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Message sent successfully',
        contact: data?.[0] || contact 
      }, { headers: corsHeaders });
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
