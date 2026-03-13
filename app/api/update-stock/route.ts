import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = Number(body.id);
    const stock = Number(body.stock_quantity);

    if (!id || Number.isNaN(stock)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { error } = await supabaseClient
      .from("products")
      .update({ stock_quantity: stock })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 });
  }
}

