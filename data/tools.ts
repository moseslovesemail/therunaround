export type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "date" | "number" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  helper?: string;
};

export type ToolDefinition = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  rule: string;
  fields: Field[];
  sourceLabel: string;
  sourceUrl: string;
  caution?: string;
};

export const tools: ToolDefinition[] = [
  {
    id: "council",
    eyebrow: "COUNCIL",
    title: "Council complaint builder",
    summary: "Turn a messy council problem into a formal complaint with a remedy, chronology and escalation path.",
    rule: "The Ombudsman generally expects you to give the council a chance to resolve the problem first. The Ombudsman can investigate many council administrative actions, but not decisions made by a full council.",
    sourceLabel: "Office of the Ombudsman — complaints about agency actions",
    sourceUrl: "https://www.ombudsman.parliament.nz/make-complaint/complain-about-action-or-decision-agency",
    fields: [
      { key: "organisation", label: "Which council?", placeholder: "Christchurch City Council", required: true },
      { key: "issue", label: "What happened?", type: "textarea", placeholder: "Keep it factual. What did the council do, fail to do, or decide?", required: true },
      { key: "firstContact", label: "When did you first raise it?", type: "date" },
      { key: "response", label: "What response have you received so far?", type: "textarea", placeholder: "No response / generic reply / decision I disagree with" },
      { key: "remedy", label: "What do you want them to do?", type: "textarea", placeholder: "Explain the decision, correct the record, refund the fee, reconsider the decision…", required: true }
    ]
  },
  {
    id: "parking",
    eyebrow: "PARKING + CLAMPING",
    title: "Private parking dispute",
    summary: "Build a concise challenge to a private parking or clamping charge and preserve the evidence that matters.",
    rule: "For wheel clamping on private land, the maximum total fee is $100 including GST. Private parking disputes can turn on signage, authority, contractual terms and the facts of the parking event.",
    sourceLabel: "Consumer Protection — private parking, clamping and towing",
    sourceUrl: "https://www.consumerprotection.govt.nz/help-product-service/cars/parking-clamping-towing",
    caution: "This tool does not tell you to ignore a notice. It helps you make a documented dispute where you have a genuine basis.",
    fields: [
      { key: "organisation", label: "Parking/clamping company", placeholder: "Company name", required: true },
      { key: "date", label: "Date of incident", type: "date" },
      { key: "amount", label: "Amount demanded ($)", type: "number", placeholder: "100" },
      { key: "issue", label: "Why do you dispute it?", type: "textarea", placeholder: "Signage unclear, payment made, wrong plate, clamp fee over $100…", required: true },
      { key: "evidence", label: "What evidence do you have?", type: "textarea", placeholder: "Photos, receipt, app payment, dashcam, witness…" }
    ]
  },
  {
    id: "privacy",
    eyebrow: "YOUR DATA",
    title: "Give me my file",
    summary: "Generate a Privacy Act request for personal information an organisation holds about you.",
    rule: "Organisations generally need to respond to a request for your personal information within 20 working days. Limited extensions are possible, but the organisation must tell you why and give an updated timeframe.",
    sourceLabel: "Office of the Privacy Commissioner — ask for your information",
    sourceUrl: "https://www.privacy.org.nz/your-rights/ask-for-your-information/",
    fields: [
      { key: "organisation", label: "Who has your information?", placeholder: "Bank, insurer, employer, government agency…", required: true },
      { key: "scope", label: "What do you want?", type: "textarea", placeholder: "All file notes, emails mentioning me, call recordings, decision records, correspondence…", required: true },
      { key: "period", label: "Relevant date range", placeholder: "1 Jan 2025 to present" },
      { key: "identifier", label: "Reference/account number (optional)", placeholder: "Only include if useful" },
      { key: "urgency", label: "Why is it urgent? (optional)", type: "textarea", helper: "Only claim urgency if there is a genuine reason." }
    ]
  },
  {
    id: "debt",
    eyebrow: "DEBT COLLECTORS",
    title: "Show me the debt",
    summary: "Ask a collector to identify the debt, show the calculation and record that you dispute what is wrong.",
    rule: "You can ask a debt collector for information about the debt. If you think the debt is not yours or the amount is wrong, you can tell the collector and explain why; they need to consider the dispute and respond.",
    sourceLabel: "Commerce Commission — debt collection",
    sourceUrl: "https://www.comcom.govt.nz/consumers/dealing-with-typical-situations/debt-collection/",
    caution: "Do not use this tool simply to delay a debt you know is valid. Disputing a debt does not automatically erase it.",
    fields: [
      { key: "organisation", label: "Debt collector / creditor", placeholder: "Company name", required: true },
      { key: "amount", label: "Amount claimed ($)", type: "number" },
      { key: "reference", label: "Their reference number", placeholder: "Optional" },
      { key: "issue", label: "What do you dispute?", type: "textarea", placeholder: "Not mine, already paid, amount wrong, fees unexplained…", required: true },
      { key: "request", label: "What information do you want?", type: "textarea", placeholder: "Original creditor, agreement, itemised calculation, payment history…" }
    ]
  },
  {
    id: "rent",
    eyebrow: "TENANCY",
    title: "Rent increase checker",
    summary: "Check the basic timing rules and generate a written query if the increase appears too early or the notice is defective.",
    rule: "For most fixed-term and periodic tenancies, rent can generally only be increased 12 months after the tenancy started and not within 12 months of the last increase. Landlords generally need to give at least 60 days' written notice. Boarding houses have different notice rules.",
    sourceLabel: "Tenancy Services — rent increases",
    sourceUrl: "https://www.tenancy.govt.nz/rent-bond-and-bills/rent/increasing-rent/",
    fields: [
      { key: "landlord", label: "Landlord / property manager", placeholder: "Name or company", required: true },
      { key: "tenancyStart", label: "Tenancy start date", type: "date" },
      { key: "lastIncrease", label: "Last increase took effect", type: "date" },
      { key: "noticeDate", label: "Date you received the new notice", type: "date" },
      { key: "newDate", label: "Date new rent is meant to start", type: "date", required: true },
      { key: "newAmount", label: "New weekly rent ($)", type: "number" }
    ]
  },
  {
    id: "pay",
    eyebrow: "WORK + PAY",
    title: "Pay deduction checker",
    summary: "Challenge an unexplained wage deduction and ask your employer to identify the legal or agreed basis for it.",
    rule: "Employers can generally deduct from pay only where required by law, agreed to or requested in writing for a lawful and reasonable purpose, or in limited other situations. A general deductions clause does not remove the need to consult about a specific deduction.",
    sourceLabel: "Employment New Zealand — deductions",
    sourceUrl: "https://www.employment.govt.nz/pay-and-hours/pay-and-wages/deductions",
    fields: [
      { key: "organisation", label: "Employer", placeholder: "Employer name", required: true },
      { key: "amount", label: "Amount deducted ($)", type: "number" },
      { key: "date", label: "Pay date", type: "date" },
      { key: "reason", label: "What reason did they give?", type: "textarea", placeholder: "Damage, till shortage, overpayment, notice period…" },
      { key: "consent", label: "Did you agree in writing?", type: "select", options: ["No", "Yes", "Not sure"] },
      { key: "issue", label: "What do you want fixed?", type: "textarea", placeholder: "Explain the deduction, repay it, stop future deductions…", required: true }
    ]
  }
];
