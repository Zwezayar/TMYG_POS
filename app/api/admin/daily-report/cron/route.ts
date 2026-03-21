import { NextResponse } from 'next/server';
import { sendDailyReportForCron } from '@/lib/daily-report';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const provided = req.headers.get('x-cron-secret') ?? searchParams.get('secret');
    const secret = process.env.DAILY_REPORT_CRON_SECRET;

    if (!secret || provided !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await sendDailyReportForCron();
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
