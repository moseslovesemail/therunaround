"use client";

import { useMemo, useState } from "react";
import { ToolDefinition, tools } from "../data/tools";

type Values = Record<string, string>;

function fmt(value?: string) {
  return value?.trim() || "[insert details]";
}

function generateLetter(tool: ToolDefinition, v: Values) {
  const today = new Intl.DateTimeFormat("en-NZ", { dateStyle: "long" }).format(new Date());

  switch (tool.id) {
    case "council":
      return `FORMAL COMPLAINT — REQUEST FOR WRITTEN RESPONSE\n\nDate: ${today}\nTo: ${fmt(v.organisation)}\n\nI am asking ${fmt(v.organisation)} to treat this correspondence as a formal complaint.\n\nWHAT HAPPENED\n${fmt(v.issue)}\n\nI first raised this matter on: ${fmt(v.firstContact)}\n\nRESPONSE SO FAR\n${fmt(v.response)}\n\nOUTCOME I AM SEEKING\n${fmt(v.remedy)}\n\nPlease confirm receipt, identify who is responsible for handling this complaint, and provide a substantive written response. If you rely on a policy, bylaw, delegated authority, record or other material in reaching your position, please identify it clearly.\n\nIf the matter cannot be resolved, please tell me what internal escalation or review route is available.\n\nKind regards,\n[Your name]`;
    case "parking":
      return `FORMAL DISPUTE — PARKING / CLAMPING CHARGE\n\nDate: ${today}\nTo: ${fmt(v.organisation)}\n\nI dispute the charge arising from the incident on ${fmt(v.date)}. The amount demanded is $${fmt(v.amount)}.\n\nBASIS OF DISPUTE\n${fmt(v.issue)}\n\nEVIDENCE\n${fmt(v.evidence)}\n\nPlease review the charge and provide a written response addressing the points above. Please also preserve all photographs, plate-recognition records, payment records, signage records and other material relied on for this charge.\n\nIf this matter involved wheel clamping on private land, I note Consumer Protection states the maximum total clamping fee is $100 including GST.\n\nI am not refusing to engage with the matter; I am asking that the dispute be considered on its facts and supporting evidence.\n\nKind regards,\n[Your name]`;
    case "privacy":
      return `PRIVACY ACT 2020 — REQUEST FOR MY PERSONAL INFORMATION\n\nDate: ${today}\nTo: ${fmt(v.organisation)}\n\nI request access to personal information your organisation holds about me under the Privacy Act 2020.\n\nSCOPE\n${fmt(v.scope)}\n\nRelevant period: ${fmt(v.period)}\nReference/account number: ${fmt(v.identifier)}\n\nPlease include personal information held in relevant electronic systems, correspondence, file notes, internal records and recordings that fall within the scope above.\n\n${v.urgency?.trim() ? `URGENCY\nI ask that this request be treated urgently because: ${v.urgency.trim()}\n\n` : ""}If you need information from me to confirm my identity or clarify the scope, please contact me promptly. If any information is withheld, please identify the basis for withholding it.\n\nKind regards,\n[Your name]`;
    case "debt":
      return `FORMAL DISPUTE / REQUEST FOR INFORMATION ABOUT CLAIMED DEBT\n\nDate: ${today}\nTo: ${fmt(v.organisation)}\nReference: ${fmt(v.reference)}\nAmount claimed: $${fmt(v.amount)}\n\nI am writing to dispute the debt or amount claimed to the extent set out below.\n\nWHAT I DISPUTE\n${fmt(v.issue)}\n\nINFORMATION REQUESTED\n${fmt(v.request)}\n\nPlease provide enough information for me to understand the origin and calculation of the amount claimed, including the identity of the original creditor where relevant and an itemised account of the balance.\n\nPlease record that the matter is disputed and respond in writing to the points above.\n\nKind regards,\n[Your name]`;
    case "rent":
      return `QUERY — PROPOSED RENT INCREASE\n\nDate: ${today}\nTo: ${fmt(v.landlord)}\n\nI am writing about the proposed rent increase to $${fmt(v.newAmount)} per week, stated to take effect on ${fmt(v.newDate)}.\n\nMy records are:\n• tenancy started: ${fmt(v.tenancyStart)}\n• previous increase took effect: ${fmt(v.lastIncrease)}\n• notice received: ${fmt(v.noticeDate)}\n• proposed new rent date: ${fmt(v.newDate)}\n\nTenancy Services states that for most fixed-term and periodic tenancies, rent increases cannot take effect within 12 months of the tenancy start or previous increase, and landlords generally need to give at least 60 days' written notice.\n\nPlease confirm that the proposed increase complies with the applicable timing and notice requirements and, if necessary, issue a corrected notice.\n\nKind regards,\n[Your name]`;
    case "pay":
      return `FORMAL QUERY — DEDUCTION FROM PAY\n\nDate: ${today}\nTo: ${fmt(v.organisation)}\n\nI am writing about a deduction of $${fmt(v.amount)} from my pay on or around ${fmt(v.date)}.\n\nReason given: ${fmt(v.reason)}\nWritten agreement/consent: ${fmt(v.consent)}\n\nMy concern / requested outcome:\n${fmt(v.issue)}\n\nPlease identify the legal or written basis relied on for the deduction, provide the calculation, and explain what consultation occurred before the deduction was made.\n\nEmployment New Zealand states that deductions generally require a lawful basis and, where relying on written consent, must be for a legal and reasonable purpose. A general deductions clause does not remove the requirement to consult about a specific deduction.\n\nPlease respond in writing and correct the deduction if it was not properly authorised.\n\nKind regards,\n[Your name]`;
    default:
      return "";
  }
}

export default function RunaroundApp() {
  const [selected, setSelected] = useState<ToolDefinition | null>(null);
  const [values, setValues] = useState<Values>({});
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const letter = useMemo(() => (selected ? generateLetter(selected, values) : ""), [selected, values]);
  const socialSeeds = tools.slice(6, 12);

  function choose(tool: ToolDefinition) {
    setSelected(tool);
    setValues({});
    setGenerated(false);
    setCopied(false);
    window.setTimeout(() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" }), 30);
  }

  async function copyLetter() {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="The Runaround home">THE RUNAROUND<span>™</span></a>
        <nav><a href="#tools">20 runarounds</a><a href="#myth">Myth check</a><a href="#principles">How it works</a></nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <div className="kicker">NEW ZEALAND SYSTEMS, TRANSLATED</div>
          <h1>RIDICULOUS SYSTEM?<br/><em>LET&apos;S SORT IT.</em></h1>
          <p>Free, source-backed tools for complaints, disputes, records requests and the bit nobody explains: <strong>what to do next.</strong></p>
          <a className="primary" href="#tools">Pick your problem ↓</a>
        </div>
        <aside className="hero-card">
          <div className="stamp">NO FACEBOOK LAW</div>
          <p>We separate the actual rule from the internet version of the rule.</p>
          <ul>
            <li>20 verified runarounds</li>
            <li>Official NZ sources</li>
            <li>Escalation ladders</li>
            <li>Copy-ready wording where useful</li>
          </ul>
        </aside>
      </section>

      <section id="tools" className="section">
        <div className="section-head">
          <span>01</span>
          <div><p className="eyebrow">WHAT&apos;S PISSING YOU OFF?</p><h2>Pick the runaround.</h2><p className="section-copy">Six tools build wording now. Fourteen more expose the rule, the escalation path and the source.</p></div>
        </div>
        <div className="tool-grid">
          {tools.map((tool) => (
            <button key={tool.id} className="tool-card" onClick={() => choose(tool)}>
              <div className="tool-meta"><small>{tool.eyebrow}</small><em>{tool.mode === "builder" ? "BUILDER" : "QUICK RIGHT"}</em></div>
              <strong>{tool.title}</strong>
              <span>{tool.summary}</span>
              <b>{tool.mode === "builder" ? "BUILD WORDING →" : "SEE THE LEVER →"}</b>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <section id="tool" className="builder-wrap">
          <div className="builder-intro">
            <button className="text-button" onClick={() => setSelected(null)}>← Close</button>
            <p className="eyebrow">{selected.eyebrow}</p>
            <h2>{selected.title}</h2>
            <div className="rule-box"><b>THE RULE</b><p>{selected.rule}</p></div>
            {selected.caution && <div className="caution"><b>CHECK THE CONDITIONS</b><p>{selected.caution}</p></div>}
            <div className="ladder">
              <b>THE ESCALATION LADDER</b>
              {selected.ladder.map((step, index) => (
                <div className="ladder-step" key={step.title}><span>{index + 1}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></div>
              ))}
            </div>
            <a className="source-link" href={selected.sourceUrl} target="_blank" rel="noreferrer">Official source ↗ <span>{selected.sourceLabel}</span></a>
          </div>

          {selected.mode === "builder" ? (
            <div className="builder">
              <div className="form-panel">
                <h3>Tell us what happened.</h3>
                {(selected.fields || []).map((field) => (
                  <label key={field.key}>
                    <span>{field.label}{field.required && " *"}</span>
                    {field.type === "textarea" ? (
                      <textarea value={values[field.key] || ""} placeholder={field.placeholder} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} />
                    ) : field.type === "select" ? (
                      <select value={values[field.key] || ""} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}>
                        <option value="">Select…</option>{field.options?.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={field.type || "text"} value={values[field.key] || ""} placeholder={field.placeholder} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} />
                    )}
                    {field.helper && <small>{field.helper}</small>}
                  </label>
                ))}
                <button className="primary full" onClick={() => setGenerated(true)}>Build my wording →</button>
              </div>

              <div className={`output-panel ${generated ? "ready" : ""}`}>
                {!generated ? (
                  <div className="empty-output"><span>YOUR WORDING<br/>APPEARS HERE</span><p>No account. No subscription. No pretending this is legal advice.</p></div>
                ) : (
                  <>
                    <div className="output-head"><div><small>DRAFT GENERATED</small><h3>Copy. Check. Send.</h3></div><button onClick={copyLetter}>{copied ? "COPIED ✓" : "COPY"}</button></div>
                    <pre>{letter}</pre>
                    <p className="disclaimer">Check names, dates, facts and any legal issue specific to your situation before sending. This tool provides general information and drafting support, not legal advice.</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="quick-panel">
              <div>
                <p className="eyebrow">THE SOCIAL VERSION</p>
                <blockquote>{selected.socialHook}</blockquote>
              </div>
              <div className="quick-action">
                <p>Use the escalation ladder above, then verify the details against the official source before acting.</p>
                <a className="primary" href={selected.sourceUrl} target="_blank" rel="noreferrer">Read the official guidance ↗</a>
              </div>
            </div>
          )}
        </section>
      )}

      <section id="myth" className="myth">
        <div className="myth-tag">MYTH CHECK #001</div>
        <h2>“OPT OUT OF NZTA<br/>AND PRIVATE PARKING<br/>CAN&apos;T FIND YOU.”</h2>
        <div className="verdict">NOT THAT SIMPLE.</div>
        <p>NZTA says opting out is a limited restriction. Some authorised users can still access an opted-out person&apos;s name and address in specific circumstances — and NZTA explicitly gives parking companies sending breach notices as an example.</p>
        <a href="https://www.nzta.govt.nz/vehicles/how-the-motor-vehicle-register-affects-you/who-can-access-register-information" target="_blank" rel="noreferrer">READ THE NZTA SOURCE ↗</a>
      </section>

      <section id="principles" className="section principles">
        <div className="section-head"><span>02</span><div><p className="eyebrow">THE ANTI-RUNAROUND METHOD</p><h2>Calm site. Loud social.</h2></div></div>
        <div className="principle-grid">
          <article><b>1</b><h3>Find the rule.</h3><p>Start with the official source, not a viral claim.</p></article>
          <article><b>2</b><h3>State the facts.</h3><p>Dates, amounts, decisions, evidence. Leave the rant for Instagram.</p></article>
          <article><b>3</b><h3>Ask for a remedy.</h3><p>Make the outcome you want explicit.</p></article>
          <article><b>4</b><h3>Escalate properly.</h3><p>Internal complaint first where required, then the correct external route.</p></article>
        </div>
      </section>

      <section className="social-library">
        <p className="eyebrow">SOCIAL ENGINE / SOURCE-BACKED</p>
        <h2>Outrage is the distribution.<br/>Accuracy is the product.</h2>
        <div className="social-grid">
          {socialSeeds.map((tool) => <article key={tool.id}><small>{tool.eyebrow}</small><strong>{tool.socialHook}</strong></article>)}
        </div>
      </section>

      <footer>
        <div className="brand">THE RUNAROUND<span>™</span></div>
        <p>General information and drafting support for Aotearoa New Zealand. Not legal advice.</p>
        <p>Rules change. Check the linked official source before relying on a rule, deadline or entitlement.</p>
      </footer>
    </main>
  );
}
