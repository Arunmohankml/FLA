import { getAdmins } from "@/lib/data";

const OWNER_EMAIL = "t19796146@gmail.com";
const FIREBASE_API_KEY =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  process.env.FIREBASE_API_KEY ||
  "AIzaSyDM2E_MJbuxKneoiiSO1zytWZ85KUTgwoE";

interface FirebaseLookupUser {
  email?: string;
}

interface FirebaseLookupResponse {
  users?: FirebaseLookupUser[];
  error?: {
    message?: string;
  };
}

function getBearerToken(request: Request) {
  const authHeader = request.headers.get("authorization") || "";
  if (!authHeader.toLowerCase().startsWith("bearer ")) return null;
  const token = authHeader.slice("bearer ".length).trim();
  return token || null;
}

async function lookupFirebaseEmail(idToken: string) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    },
  );

  const data = (await response.json()) as FirebaseLookupResponse;
  if (!response.ok) {
    throw new Error(data.error?.message || "Invalid admin session");
  }

  const email = data.users?.[0]?.email?.toLowerCase();
  if (!email) throw new Error("Admin email not found");
  return email;
}

export async function verifyAdminRequest(request: Request) {
  const token = getBearerToken(request);
  if (!token) {
    return { ok: false as const, status: 401, error: "Admin login required" };
  }

  try {
    const email = await lookupFirebaseEmail(token);
    if (email === OWNER_EMAIL) return { ok: true as const, email, isOwner: true };

    const admins = await getAdmins();
    const isAdmin = admins.some((admin: { email?: string }) => admin.email?.toLowerCase() === email);
    if (!isAdmin) {
      return { ok: false as const, status: 403, error: "Admin access required" };
    }

    return { ok: true as const, email, isOwner: false };
  } catch (error) {
    return {
      ok: false as const,
      status: 401,
      error: error instanceof Error ? error.message : "Invalid admin session",
    };
  }
}
