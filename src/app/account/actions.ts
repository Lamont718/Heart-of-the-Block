"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getUser } from "@/lib/supabase/auth";

export type ProfileState = {
  error?: string;
  notice?: string;
} | null;

const MAX_NAME = 60;
const MAX_NEIGHBORHOOD = 80;

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  if (!isSupabaseConfigured) {
    return { error: "Profiles aren’t connected yet." };
  }

  const user = await getUser();
  if (!user) {
    return { error: "Please sign in again to save your profile." };
  }

  const displayName = String(formData.get("display_name") ?? "").trim();
  const neighborhood = String(formData.get("neighborhood") ?? "").trim();

  if (displayName.length > MAX_NAME) {
    return { error: `Keep your name under ${MAX_NAME} characters.` };
  }
  if (neighborhood.length > MAX_NEIGHBORHOOD) {
    return { error: `Keep your neighborhood under ${MAX_NEIGHBORHOOD} characters.` };
  }

  const supabase = await createClient();
  // The profile row is created by a DB trigger on signup, so an update is
  // enough. Empty strings clear the field (stored as null).
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName || null,
      neighborhood: neighborhood || null,
    })
    .eq("id", user.id);

  if (error) {
    return { error: "We couldn’t save that just now. Please try again." };
  }

  revalidatePath("/account");
  return { notice: "Saved." };
}
