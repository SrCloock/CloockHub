import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '../../../lib/supabaseServer';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const nombre = body?.nombre?.trim();
  const email = body?.email?.trim();
  const mensaje = body?.mensaje?.trim();

  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    console.error('Supabase no configurado: faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
    return NextResponse.json({ error: 'Backend no configurado todavía.' }, { status: 503 });
  }

  const { error } = await supabase
    .from('contact_messages')
    .insert({ nombre, email, mensaje });

  if (error) {
    console.error('Error insertando mensaje de contacto:', error.message);
    return NextResponse.json({ error: 'No se pudo guardar el mensaje.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
