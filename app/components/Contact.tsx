"use client";

import { useState } from "react";

type PropType = "Residential" | "Commercial";
type Status = "idle" | "submitting" | "success" | "error";

const SERVICES = [
  "Diagnosis & Repair",
  "Green Pool Clean-up",
  "Weekly Maintenance",
  "Heater service or install",
  "Pump or Filter",
  "Automatic Cleaner",
  "Home-Warranty / Insurance Claim",
  "Something else",
];

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
  const [propType, setPropType] = useState<PropType>("Residential");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();

    const nextErrors = { name: !name, phone: !phone };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) return;

    if (!ACCESS_KEY) {
      // No key configured yet — surface a clear message instead of failing silently.
      setStatus("error");
      setErrorMsg(
        "Form isn't connected yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env.local, or call/text (555) 123-4567."
      );
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const payload = {
      access_key: ACCESS_KEY,
      subject: `New quote request — ${name}`,
      from_name: "Acme Pool Co website",
      name,
      phone,
      email: data.get("email") || "",
      city: data.get("city") || "",
      service: data.get("service") || "",
      property_type: propType,
      message: data.get("message") || "",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(json.message || "Something went wrong. Please call or text (555) 123-4567.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please call or text (555) 123-4567.");
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="wrap">
        <div>
          <span className="eyebrow">Request a quote</span>
          <h2>Tell us about your pool.</h2>
          <p className="lead">
            Send a few details and Jane will get back to you with next steps — usually same day.
            Prefer to talk? Call or text{" "}
            <b style={{ color: "#fff" }}>(555) 123-4567</b>.
          </p>

          {status === "success" ? (
            <div className="form-success show" style={{ marginTop: 36 }}>
              <h3>Thanks — request received.</h3>
              <p>
                Jane will be in touch shortly. For anything urgent, call or text (555) 123-4567.
              </p>
            </div>
          ) : (
            <form className="qform" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="qname">Name</label>
                <input
                  id="qname"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className={errors.name ? "invalid" : undefined}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="qphone">Phone</label>
                <input
                  id="qphone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  className={errors.phone ? "invalid" : undefined}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="qemail">Email</label>
                <input id="qemail" name="email" type="email" placeholder="you@email.com" />
              </div>
              <div className="field">
                <label htmlFor="qcity">City</label>
                <input id="qcity" name="city" type="text" placeholder="Peoria, Glendale…" />
              </div>
              <div className="field full">
                <label htmlFor="qservice">What do you need?</label>
                <select id="qservice" name="service" defaultValue={SERVICES[0]}>
                  {SERVICES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="field full">
                <label>Property type</label>
                <div className="proptype">
                  {(["Residential", "Commercial"] as PropType[]).map((t) => (
                    <label
                      key={t}
                      className={propType === t ? "active" : undefined}
                      onClick={() => setPropType(t)}
                    >
                      <input
                        type="radio"
                        name="proptype"
                        value={t}
                        checked={propType === t}
                        onChange={() => setPropType(t)}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="field full">
                <label htmlFor="qmsg">Details</label>
                <textarea
                  id="qmsg"
                  name="message"
                  placeholder="Green pool, heater won't fire, weekly service quote…"
                />
              </div>
              <button
                className="btn btn-primary full"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Request my quote"}
              </button>
              {status === "error" && <p className="form-error full">{errorMsg}</p>}
            </form>
          )}
        </div>

        <aside className="contact-card">
          <div className="row">
            <div className="ic">☎</div>
            <div>
              <div className="lbl">Phone</div>
              <div className="val">
                <a href="tel:5551234567">(555) 123-4567</a>
                <small>Call or text — Jane Doe</small>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="ic">@</div>
            <div>
              <div className="lbl">Email</div>
              <div className="val" style={{ fontSize: "0.96rem" }}>
                <a href="mailto:info@example.com">info@example.com</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="ic">⌖</div>
            <div>
              <div className="lbl">Address</div>
              <div className="val" style={{ fontSize: "0.98rem" }}>
                123 Example St<small>Suite 000 · Peoria, AZ 85383</small>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="ic">§</div>
            <div>
              <div className="lbl">License</div>
              <div className="val">
                ROC #00000000<small>Licensed · Bonded · Insured</small>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
