export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

type WaitlistBody = {
  name?: string;
  email?: string;
  social?: string;
  source?: string;
  honeypot?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, { status });
}

export async function POST(request: NextRequest) {
  let body: WaitlistBody;

  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON body" }, 400);
  }

  const { name, email, social, source, honeypot } = body;

  // Honeypot check - bots fill this field, humans don't see it
  if (honeypot && honeypot.length > 0) {
    // Return success to not alert the bot, but don't forward
    return json({ ok: true });
  }

  // Validate name
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return json({ ok: false, error: "Name is required" }, 400);
  }
  if (name.length > 100) {
    return json({ ok: false, error: "Name must be 100 characters or less" }, 400);
  }

  // Validate email
  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return json({ ok: false, error: "Email is required" }, 400);
  }
  if (email.length > 254) {
    return json({ ok: false, error: "Email must be 254 characters or less" }, 400);
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return json({ ok: false, error: "Please enter a valid email address" }, 400);
  }

  // Validate social (optional)
  if (social !== undefined && typeof social === "string" && social.length > 100) {
    return json({ ok: false, error: "Social must be 100 characters or less" }, 400);
  }

  // Validate source
  if (source !== undefined && typeof source === "string" && source.length > 80) {
    return json({ ok: false, error: "Source must be 80 characters or less" }, 400);
  }

  // Get Apps Script URL from env
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_WEBAPP_URL;
  if (!appsScriptUrl) {
    console.error("GOOGLE_APPS_SCRIPT_WEBAPP_URL is not configured");
    return json({ ok: false, error: "Server configuration error" }, 500);
  }

  // Extract metadata
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const timestamp = new Date().toISOString();

  // Build payload for Apps Script
  const payload = {
    name: name.trim(),
    email: email.trim(),
    social: social?.trim() || "",
    source: source || "orange_service_card",
    timestamp,
    ip,
    userAgent,
    secret: process.env.GOOGLE_APPS_SCRIPT_SECRET || "",
  };

  // Forward to Apps Script with timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Try to parse Apps Script response
    let appsScriptData: Record<string, unknown> = {};
    try {
      appsScriptData = await response.json();
    } catch {
      // Apps Script might return non-JSON on success
      if (response.ok) {
        return json({ ok: true });
      }
    }

    if (response.ok && appsScriptData.ok === true) {
      return json({ ok: true });
    }

    // Handle Apps Script error
    console.error("Apps Script error:", appsScriptData);
    return json(
      { ok: false, error: "Failed to submit. Please try again later." },
      response.status >= 500 ? 500 : 400
    );
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === "AbortError") {
      console.error("Apps Script request timed out");
      return json({ ok: false, error: "Request timed out. Please try again." }, 504);
    }

    console.error("Apps Script fetch error:", err);
    return json({ ok: false, error: "Failed to submit. Please try again later." }, 500);
  }
}
