// lib/submitLead.js
// Single place for all TeleCRM API calls — both forms use this
export async function submitLead({ name, phone, email, notes, tags }) {
  const res = await fetch( "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
    },
    body: JSON.stringify({
      fields: {
        name,
        phone,
        email: email || "",
        notes: notes || "",
        source: "Dholera Times",
      },
      tags: tags || ["Dholera Investment", "Website Lead"],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Submission failed (${res.status})`);
  }
  return true;
}