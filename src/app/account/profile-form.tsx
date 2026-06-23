"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateProfile, type ProfileState } from "./actions";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full">
      {pending ? "Saving…" : "Save profile"}
    </button>
  );
}

export function ProfileForm({
  email,
  displayName,
  neighborhood,
}: {
  email: string;
  displayName: string;
  neighborhood: string;
}) {
  const [state, formAction] = useFormState<ProfileState, FormData>(
    updateProfile,
    null,
  );

  return (
    <form action={formAction} className="mt-4 space-y-4">
      <div>
        <label className="label">Email</label>
        <p className="text-sm font-semibold text-muted">{email}</p>
      </div>

      <div>
        <label htmlFor="display_name" className="label">
          Name
        </label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          maxLength={60}
          autoComplete="name"
          defaultValue={displayName}
          className="field"
          placeholder="What should we call you?"
        />
      </div>

      <div>
        <label htmlFor="neighborhood" className="label">
          Neighborhood{" "}
          <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="neighborhood"
          name="neighborhood"
          type="text"
          maxLength={80}
          defaultValue={neighborhood}
          className="field"
          placeholder="e.g. East Flatbush"
        />
      </div>

      {state?.error && (
        <p
          role="alert"
          className="rounded-xl bg-brick-100 px-4 py-3 text-sm font-medium text-brick-700"
        >
          {state.error}
        </p>
      )}
      {state?.notice && (
        <p
          role="status"
          className="rounded-xl bg-teal-100 px-4 py-3 text-sm font-medium text-teal"
        >
          {state.notice}
        </p>
      )}

      <SaveButton />
    </form>
  );
}
