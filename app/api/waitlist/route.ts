import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const name = (body?.name ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim();
    const social = (body?.social ?? "").toString().trim();
    const source = (body?.source ?? "").toString().trim() || "unknown";
    const honeypot = (body?.honeypot ?? "").toString().trim();

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing name or email." },
        { status: 400 }
      );
    }

    // Honeypot: silently succeed but do not forward
    if (honeypot) {
      return NextResponse.json({ ok: true, skipped: "honeypot" }, { status: 200 });
    }

    const url = process.env.GOOGLE_APPS_SCRIPT_WEBAPP_URL;
    const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

    if (!url) {
      return NextResponse.json(
        { ok: false, error: "Server configuration error: missing GOOGLE_APPS_SCRIPT_WEBAPP_URL" },
        { status: 500 }
      );
    }

    // Grab IP + UA (best-effort)
    const h = await headers();
    const userAgent = h.get("user-agent") ?? "";
    const forwardedFor = h.get("x-forwarded-for") ?? "";
    const ip = forwardedFor.split(",")[0].trim();

    // Forward as GET query params (avoids POST redirect/body issues)
    const qs = new URLSearchParams();
    if (secret) qs.set("secret", secret);
    qs.set("name", name);
    qs.set("email", email);
    if (social) qs.set("social", social);
    if (source) qs.set("source", source);
    if (ip) qs.set("ip", ip);
    if (userAgent) qs.set("user_agent", userAgent);

    const target = `${url}?${qs.toString()}`;

    const res = await fetch(target, {
      method: "GET",
      cache: "no-store",
    });

    const text = await res.text();
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      // If Apps Script ever returns HTML, surface it for debugging
      return NextResponse.json(
        { ok: false, error: "Upstream returned non-JSON", upstream: text.slice(0, 500) },
        { status: 502 }
      );
    }

    if (data?.ok) {
      return NextResponse.json(data, { status: 200 });
    }

    // Bubble up the real Apps Script error
    return NextResponse.json(
      { ok: false, error: data?.error || "Upstream rejected request", upstream: data },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
