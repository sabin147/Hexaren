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

const contactEmailTo = process.env.CONTACT_EMAIL_TO || 'hello@hexaren.dk';
const contactEmailFrom = process.env.CONTACT_EMAIL_FROM || 'Hexaren Contact Form <onboarding@resend.dev>';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
      let savedContact = null;
      let emailSent = false;
      let emailErrorMessage = '';
      
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

      if (!error) {
        savedContact = data?.[0] || contact;
      }
      
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
          from: contactEmailFrom,
          to: contactEmailTo,
          replyTo: body.email,
          subject: `New Contact Form Submission from ${body.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>
            ${body.company ? `<p><strong>Company:</strong> ${escapeHtml(body.company)}</p>` : ''}
            <p><strong>Services Interested In:</strong> ${escapeHtml(servicesText)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(body.message)}</p>
            <hr />
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          `
        });
        emailSent = true;
      } catch (emailError) {
        emailErrorMessage = emailError?.message || 'Email notification failed';
        console.error('Email notification error:', emailError);
      }

      if (!emailSent && error) {
        console.error('Contact submission was not delivered or saved:', {
          emailError: emailErrorMessage,
          supabaseError: error,
          contact
        });

        return NextResponse.json({
          success: false,
          error: 'We could not send your message right now. Please call +45 22 56 00 70 or email hello@hexaren.dk directly.'
        }, { status: 502, headers: corsHeaders });
      }
      
      if (error) {
        console.error('Supabase error:', error);
      }

      if (!emailSent) {
        console.error('Contact submission saved, but email notification failed:', emailErrorMessage);
        return NextResponse.json({ 
          success: true, 
          message: 'Message saved, but email notification failed',
          contact: savedContact || contact 
        }, { headers: corsHeaders });
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Message sent successfully',
        contact: savedContact || contact 
      }, { headers: corsHeaders });
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
