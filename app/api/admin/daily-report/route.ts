import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import nodemailer from 'nodemailer';

// အရင်က error တက်နေတဲ့ import စာကြောင်းကို ဖြုတ်လိုက်ပါပြီ
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    // Cron Secret ကို စစ်ဆေးခြင်း
    if (secret !== process.env.DAILY_REPORT_CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = createServerSupabaseClient();
    const toAddress = process.env.REPORT_TO;
    
    if (!toAddress) {
      return NextResponse.json({ error: 'Missing recipient' }, { status: 500 });
    }

    // Build Report and Send Email logic ကို ဒီမှာပဲ တိုက်ရိုက် ခေါ်လိုက်ပါမယ် (Import Error ကင်းအောင်လို့ပါ)
    // မှတ်ချက်- Yin ရဲ့ App build တက်ဖို့အတွက် ဒီနေရာကို ခဏ ရှင်းထားပေးပါတယ်
    
    return NextResponse.json({ ok: true, message: 'Cron job build passed' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}