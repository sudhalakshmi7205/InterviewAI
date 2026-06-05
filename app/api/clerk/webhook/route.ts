import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (body.type === 'user.created') {
      const { id, email_addresses } = body.data;
      const primaryEmail = email_addresses?.[0]?.email_address;
      
      if (!primaryEmail) {
        return Response.json({ error: 'No email found' }, { status: 400 });
      }

      const { error } = await supabase.from('users').insert({
        id: id,
        email: primaryEmail,
      });

      if (error) {
        console.error('Error inserting user to Supabase:', error);
        return Response.json({ error: error.message }, { status: 500 });
      }
    }
    
    return Response.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
