import { supabaseAdmin } from "@/lib/supabase";

export async function getAdmins() {
  try {
    const { data, error } = await supabaseAdmin.from("admins").select("*");

    if (error) {
      console.error("Supabase query error:", JSON.stringify(error, null, 2));
      return [];
    }

    return data ?? [];
  } catch (error: unknown) {
    console.error("Error fetching admins:", error);
    return [];
  }
}

export async function getRegistrations() {
  try {
    const { data, error } = await supabaseAdmin.from("registrations").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase query error:", JSON.stringify(error, null, 2));
      return [];
    }

    return data ?? [];
  } catch (error: unknown) {
    console.error("Error fetching registrations:", error);
    return [];
  }
}

export async function getEnquiries() {
  try {
    const { data, error } = await supabaseAdmin.from("enquiries").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase query error:", JSON.stringify(error, null, 2));
      return [];
    }

    return data ?? [];
  } catch (error: unknown) {
    console.error("Error fetching enquiries:", error);
    return [];
  }
}
