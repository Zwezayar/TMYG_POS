import { NextResponse } from 'next/server';
import { sendDailyReportForCron } from '@/app/api/admin/daily-report/route';

export async function GET(req: Request) {
  try {
    const secret = process.env.DAILY_REPORT_CRON_SECRET;
    const provided = req.headers.get('x-cron-secret');
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
