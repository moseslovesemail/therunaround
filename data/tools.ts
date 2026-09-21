export type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "date" | "number" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  helper?: string;
};

export type LadderStep = {
  title: string;
  detail: string;
};

export type ToolDefinition = {
  id: string;
  mode: "builder" | "quick";
  eyebrow: string;
  title: string;
  summary: string;
  rule: string;
  fields?: Field[];
  sourceLabel: string;
  sourceUrl: string;
  caution?: string;
  ladder: LadderStep[];
  socialHook: string;
};

export const tools: ToolDefinition[] = [
  {
    id: "council",
    mode: "builder",
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
    ],
    ladder: [
      { title: "Put it in writing", detail: "State the facts, dates and the specific outcome you want." },
      { title: "Use the council complaint route", detail: "Give the council a reasonable opportunity to resolve the administrative issue." },
      { title: "Escalate externally where available", detail: "For many council administrative actions or LGOIMA issues, the Ombudsman may be the external route." }
    ],
    socialHook: "COUNCIL HAS 47 WEB PAGES EXPLAINING THE PROCESS. YOU NEED ONE CLEAR COMPLAINT."
  },
  {
    id: "parking",
    mode: "builder",
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
    ],
    ladder: [
      { title: "Preserve the evidence", detail: "Keep the notice, payment records and photos of signs and the site." },
      { title: "Dispute it in writing", detail: "Explain the specific factual or legal basis and ask for the evidence relied on." },
      { title: "Use the dispute route", detail: "If it cannot be resolved directly, Consumer Protection identifies the Disputes Tribunal as a possible route for private parking disputes." }
    ],
    socialHook: "CLAMPED FOR $180? PRIVATE WHEEL-CLAMPING FEES ARE CAPPED AT $100 INCLUDING GST."
  },
  {
    id: "privacy",
    mode: "builder",
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
    ],
    ladder: [
      { title: "Define the scope", detail: "Ask for identifiable categories and a useful date range rather than vague 'everything' where possible." },
      { title: "Send the request", detail: "Keep a copy and the date it was sent. Identity checks may be required." },
      { title: "Escalate privacy problems", detail: "If access is wrongly refused or mishandled, the Privacy Commissioner provides a complaint route." }
    ],
    socialHook: "“THIS CALL MAY BE RECORDED.” GOOD. ASK FOR IT."
  },
  {
    id: "debt",
    mode: "builder",
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
    ],
    ladder: [
      { title: "Ask for the basis", detail: "Request enough information to understand who says you owe what and how the figure was calculated." },
      { title: "State the dispute", detail: "Identify exactly what is wrong instead of simply saying you will not pay." },
      { title: "Escalate misconduct", detail: "Misleading, coercive or harassing debt-collection behaviour can be reported to the relevant regulator or dispute scheme." }
    ],
    socialHook: "“YOU OWE US $2,742.” COOL. SHOW THE CALCULATION."
  },
  {
    id: "rent",
    mode: "builder",
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
    ],
    ladder: [
      { title: "Check the dates", detail: "Compare tenancy start, previous increase, notice date and effective date." },
      { title: "Query the notice", detail: "Ask the landlord or property manager to confirm the timing and correct it if necessary." },
      { title: "Use Tenancy Services / Tribunal", detail: "If the issue remains unresolved, use the tenancy dispute process appropriate to the issue." }
    ],
    socialHook: "A RENT INCREASE HAS A CLOCK. YOUR LANDLORD DOESN’T GET TO INVENT A NEW ONE."
  },
  {
    id: "pay",
    mode: "builder",
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
    ],
    ladder: [
      { title: "Check your payslip and agreement", detail: "Identify the deduction, amount, date and any clause the employer relies on." },
      { title: "Ask for the basis in writing", detail: "Request the legal/agreed basis, calculation and what consultation occurred." },
      { title: "Use the employment resolution route", detail: "Employment New Zealand provides early-resolution and mediation pathways for many employment problems." }
    ],
    socialHook: "YOUR BOSS CAN’T JUST INVENT A PAYROLL DEDUCTION AND CALL IT ADMIN."
  },
  {
    id: "cctv",
    mode: "quick",
    eyebrow: "CCTV",
    title: "Save my footage",
    summary: "Your request can matter before the footage auto-deletes. Ask for footage of yourself and tell the organisation to preserve it.",
    rule: "Privacy Principle 6 gives people a right to request access to CCTV footage that is personal information about them. Once an organisation receives a request, the Privacy Commissioner says its first step should be to secure the requested footage so it is not automatically overwritten or deleted.",
    sourceLabel: "Privacy Commissioner — responding to CCTV access requests",
    sourceUrl: "https://www.privacy.org.nz/responsibilities/responding-to-access-requests-for-cctv-footage/",
    caution: "The right is to personal information about you. Footage may need redaction or may be withheld in limited circumstances to protect other people.",
    ladder: [
      { title: "Request it immediately", detail: "Identify the location, date, approximate time and how you can be recognised." },
      { title: "Say 'please preserve it'", detail: "Ask the organisation to secure the relevant footage against automatic deletion while it considers the request." },
      { title: "Complain if mishandled", detail: "If your Privacy Act access request is mishandled, you can use the Privacy Commissioner complaint process." }
    ],
    socialHook: "“THE FOOTAGE AUTO-DELETES.” NOT AFTER THEY RECEIVE YOUR REQUEST. TELL THEM TO PRESERVE IT."
  },
  {
    id: "correct-info",
    mode: "quick",
    eyebrow: "YOUR DATA",
    title: "Correct my record",
    summary: "An organisation has something wrong, incomplete or misleading about you. Make it deal with the correction properly.",
    rule: "You can ask an organisation to correct personal information about you that is wrong, incomplete or misleading. It must consider the request. If it declines, it must explain why and take reasonable steps to attach a statement of correction if requested.",
    sourceLabel: "Privacy Commissioner — correct your information",
    sourceUrl: "https://www.privacy.org.nz/your-rights/correct-your-information/",
    ladder: [
      { title: "Identify the exact record", detail: "Quote or describe what is inaccurate and supply the correct information or supporting evidence." },
      { title: "Request correction", detail: "Ask for the record to be corrected and for confirmation of the outcome." },
      { title: "Use a statement of correction", detail: "If the agency disagrees, ask for your statement of correction to be attached; the Privacy Commissioner can receive complaints." }
    ],
    socialHook: "THEIR FILE SAYS SOMETHING WRONG ABOUT YOU? THEY DON’T GET TO PRETEND YOUR CORRECTION REQUEST NEVER HAPPENED."
  },
  {
    id: "bond",
    mode: "quick",
    eyebrow: "TENANCY",
    title: "Where is my bond?",
    summary: "You paid the landlord a bond. Check whether it was lodged with Tenancy Services when it was supposed to be.",
    rule: "If a tenant pays the bond to the landlord, the landlord must lodge it with Tenancy Services within 23 working days of receiving it.",
    sourceLabel: "Tenancy Services — bond lodgement explained",
    sourceUrl: "https://www.tenancy.govt.nz/rent-bond-and-bills/bond/about-lodging-a-bond/",
    ladder: [
      { title: "Check your receipt and dates", detail: "Record when and how much bond you paid." },
      { title: "Confirm lodgement", detail: "Ask the landlord/property manager for confirmation and check with Tenancy Services if needed." },
      { title: "Escalate tenancy non-compliance", detail: "Tenancy Services explains the enforcement and Tribunal pathways if the bond has not been lodged as required." }
    ],
    socialHook: "PAID YOUR LANDLORD A BOND? THEY GENERALLY HAVE 23 WORKING DAYS TO LODGE IT."
  },
  {
    id: "public-holiday",
    mode: "quick",
    eyebrow: "WORK + PAY",
    title: "Worked the public holiday?",
    summary: "Two hours at work can create more than two hours of entitlement if it was otherwise a normal working day for you.",
    rule: "If you work on a public holiday that would otherwise be a working day, you must generally receive at least time-and-a-half for the hours worked and a full alternative holiday. The full alternative holiday can apply even if you worked only part of the public holiday.",
    sourceLabel: "Employment New Zealand — alternative holidays",
    sourceUrl: "https://www.employment.govt.nz/leave-and-holidays/public-holidays/alternative-holidays",
    ladder: [
      { title: "Establish the normal work day", detail: "Was that day one you would otherwise have worked?" },
      { title: "Check the pay", detail: "Verify time-and-a-half for the hours actually worked." },
      { title: "Check the alternative holiday", detail: "If it was otherwise a working day, confirm the full alternative holiday has been credited." }
    ],
    socialHook: "WORKED TWO HOURS ON A PUBLIC HOLIDAY? IF IT WAS YOUR NORMAL WORK DAY, YOU MAY ALSO HAVE EARNED A FULL ALTERNATIVE HOLIDAY."
  },
  {
    id: "school-donation",
    mode: "quick",
    eyebrow: "SCHOOL",
    title: "Is this really a school fee?",
    summary: "Separate compulsory charges from genuinely optional school donations.",
    rule: "School donations are optional. Parents can pay all, some or none of a requested donation, and children cannot be excluded from curriculum activities for non-payment. State-integrated attendance dues are different and can be compulsory.",
    sourceLabel: "Ministry of Education — school costs and donations",
    sourceUrl: "https://www.education.govt.nz/parents-and-caregivers/schools-year-0-13/starting-school/school-costs-and-donations",
    ladder: [
      { title: "Ask what the payment is", detail: "Is it a donation, an optional good/service, an attendance due, or something else?" },
      { title: "Ask the school to clarify", detail: "Schools should be able to explain whether payment is voluntary and what it is for." },
      { title: "Escalate if needed", detail: "If unresolved, the Ministry advises raising it with the school board and then the regional Ministry office." }
    ],
    socialHook: "SCHOOL “DONATION”. THE CLUE IS IN THE WORD DONATION."
  },
  {
    id: "gift-card",
    mode: "quick",
    eyebrow: "SHOPPING",
    title: "Gift card expired too soon?",
    summary: "Check whether a newly issued gift card was given an expiry date shorter than the current legal minimum.",
    rule: "For gift cards newly sold from March 2026, an expiry date shorter than 3 years is prohibited. If a card is sold with a shorter expiry, that expiry is void and is treated as 3 years after the sale date.",
    sourceLabel: "Consumer Protection — gift vouchers and pre-loaded cards",
    sourceUrl: "https://www.consumerprotection.govt.nz/general-help/ways-to-buy-and-pay/gift-vouchers-and-pre-loaded-cards",
    caution: "Exceptions can apply to some cards and promotions. Check the official guidance and the card type before relying on the rule.",
    ladder: [
      { title: "Check the sale date", detail: "The newer three-year rule applies to newly issued cards from March 2026." },
      { title: "Check the stated expiry", detail: "If it is under three years, compare it with the current Consumer Protection rule." },
      { title: "Take it back to the issuer", detail: "Ask the business to honour the legally applicable expiry period." }
    ],
    socialHook: "A SIX-MONTH GIFT CARD EXPIRY? FOR NEW CARDS SOLD FROM MARCH 2026, THE MINIMUM IS GENERALLY THREE YEARS."
  },
  {
    id: "faulty-product",
    mode: "quick",
    eyebrow: "CONSUMER",
    title: "The warranty expired. So what?",
    summary: "A manufacturer's warranty is not the same thing as your Consumer Guarantees Act rights.",
    rule: "The Consumer Guarantees Act requires consumer products sold by businesses to meet legal guarantees such as acceptable quality and reasonable durability. Rights can continue beyond a manufacturer's warranty. Remedies depend on the seriousness of the failure.",
    sourceLabel: "Consumer Protection — faulty and unsafe products",
    sourceUrl: "https://www.consumerprotection.govt.nz/general-help/common-consumer-issues/faulty-and-unsafe-products",
    ladder: [
      { title: "Go back to the seller", detail: "Describe the fault and provide proof of purchase and useful evidence." },
      { title: "Match the remedy to the fault", detail: "For fixable minor faults the retailer can choose the remedy; serious failures can give the consumer stronger choices." },
      { title: "Escalate the unresolved dispute", detail: "Consumer Protection explains complaint and tribunal options if the business will not provide an appropriate remedy." }
    ],
    socialHook: "“THE WARRANTY EXPIRED.” THAT DOESN’T AUTOMATICALLY END YOUR CONSUMER GUARANTEES ACT RIGHTS."
  },
  {
    id: "door-sale",
    mode: "quick",
    eyebrow: "DOOR KNOCKERS",
    title: "Undo an uninvited sale",
    summary: "Some door-to-door and phone sales come with a five-working-day cancellation right.",
    rule: "For qualifying uninvited direct sales over $100 negotiated at your home/workplace or by phone, you can change your mind and cancel for any reason within five working days of receiving the written agreement.",
    sourceLabel: "Consumer Protection — telemarketing and door-to-door sales",
    sourceUrl: "https://www.consumerprotection.govt.nz/general-help/ways-to-buy-and-pay/telemarketing-and-door-to-door-sales",
    caution: "The definition has conditions and exclusions. Check that the transaction is actually an 'uninvited direct sale' before relying on the cancellation period.",
    ladder: [
      { title: "Check whether it qualifies", detail: "Look at who initiated the sale, where/how it was negotiated, the value and whether a written agreement was supplied." },
      { title: "Cancel clearly", detail: "Give notice within the applicable period and keep proof of when you did it." },
      { title: "Escalate rule breaches", detail: "Consumer Protection identifies the Commerce Commission for reporting breaches of the uninvited direct-sales rules." }
    ],
    socialHook: "DOOR-KNOCKER REGRET? A QUALIFYING UNINVITED SALE CAN HAVE A FIVE-WORKING-DAY UNDO BUTTON."
  },
  {
    id: "unsolicited",
    mode: "quick",
    eyebrow: "UNSOLICITED GOODS",
    title: "I never ordered this",
    summary: "A business cannot create a bill just by sending you something you never agreed to buy.",
    rule: "A supplier cannot invoice you for products or services you did not agree to receive unless it makes clear you do not have to pay. If unsolicited goods are not collected within the applicable 10-working-day period, you may be able to keep them, subject to the conditions in the law.",
    sourceLabel: "Consumer Protection — telemarketing and door-to-door sales",
    sourceUrl: "https://www.consumerprotection.govt.nz/general-help/ways-to-buy-and-pay/telemarketing-and-door-to-door-sales",
    caution: "You cannot use this rule to keep something you know was simply delivered to the wrong person or where you obstruct reasonable collection.",
    ladder: [
      { title: "Do not accidentally accept the sale", detail: "Record that you did not order or agree to the goods/services." },
      { title: "Make collection possible", detail: "Keep the goods reasonably available and take reasonable care of them during the collection period." },
      { title: "Challenge any invoice", detail: "If billed, state that no agreement was made and refer the supplier to the unsolicited-goods rules." }
    ],
    socialHook: "“WE SENT IT, SO PAY US.” NO. SILENCE DOESN’T MAGICALLY CREATE A SALE."
  },
  {
    id: "finance-complaint",
    mode: "quick",
    eyebrow: "BANKS + INSURANCE",
    title: "Financial complaint router",
    summary: "Your bank, insurer, lender, KiwiSaver provider or adviser said no. Find the free independent dispute route.",
    rule: "Retail financial service providers in New Zealand must belong to a financial dispute resolution scheme. These schemes are free and independent for consumers and can help with unresolved complaints after you have raised the issue with the provider.",
    sourceLabel: "Consumer Protection — complain about a financial service provider",
    sourceUrl: "https://www.consumerprotection.govt.nz/help-product-service/managing-money/how-to-complain-about-your-financial-service-provider",
    ladder: [
      { title: "Complain to the provider", detail: "Use the provider's internal complaints process and state the outcome you want." },
      { title: "Identify its dispute scheme", detail: "Find which free financial dispute resolution scheme the provider belongs to." },
      { title: "Escalate independently", detail: "Take the unresolved complaint to that scheme with your chronology and evidence." }
    ],
    socialHook: "YOUR BANK SAID NO. THAT MAY JUST MEAN YOU’VE FINISHED STEP ONE."
  },
  {
    id: "telecom",
    mode: "quick",
    eyebrow: "PHONE + INTERNET",
    title: "Phone company runaround",
    summary: "There is a free independent dispute service for complaints involving participating phone and internet providers.",
    rule: "Telecommunications Dispute Resolution (TDR) is a free and independent complaints service for consumers with phone or internet complaints involving its member providers.",
    sourceLabel: "Telecommunications Dispute Resolution — about TDR",
    sourceUrl: "https://www.tdr.org.nz/about",
    ladder: [
      { title: "Raise it with the provider", detail: "Keep the complaint number, dates and what resolution you asked for." },
      { title: "Check TDR membership / scope", detail: "Confirm the provider and dispute fall within TDR's jurisdiction." },
      { title: "Use the free dispute service", detail: "Submit the unresolved complaint with the evidence and provider correspondence." }
    ],
    socialHook: "PHONE COMPANY SENT YOU THROUGH FOUR DEPARTMENTS? NEW ZEALAND HAS A FREE TELECOM DISPUTE SERVICE."
  },
  {
    id: "rates-rebate",
    mode: "quick",
    eyebrow: "MONEY",
    title: "Rates rebate finder",
    summary: "Low-income ratepayers may be leaving a government rates rebate unclaimed.",
    rule: "For the 2026/27 rating year, the maximum rates rebate is $830. The income abatement threshold is $33,210 for most ratepayers and $46,400 for qualifying SuperGold cardholders. People above those thresholds may still receive a reduced rebate depending on rates and dependants.",
    sourceLabel: "New Zealand Legislation — Rates Rebate (Specified Amounts) Order 2026",
    sourceUrl: "https://www.legislation.govt.nz/secondary-legislation/pco-drafted/2026/84/en/latest/highlights/",
    ladder: [
      { title: "Check the basics", detail: "Confirm the property is your qualifying home and you are the relevant ratepayer." },
      { title: "Estimate eligibility", detail: "Use income, rates and dependant information rather than treating the threshold as an absolute cut-off." },
      { title: "Apply through your council", detail: "Local councils administer applications for the government rates-rebate scheme." }
    ],
    socialHook: "YOUR RATES BILL MAY HAVE AN $830 GOVERNMENT REBATE HIDING IN IT."
  },
  {
    id: "unclaimed-money",
    mode: "quick",
    eyebrow: "MONEY",
    title: "Find forgotten money",
    summary: "IRD maintains a searchable list of qualifying unclaimed money and lets people claim it through myIR.",
    rule: "IRD holds qualifying unclaimed money for 20 years. Once the money has been transferred to IRD it is published in a searchable list, and claims can be made through myIR.",
    sourceLabel: "Inland Revenue — claiming unclaimed money",
    sourceUrl: "https://www.ird.govt.nz/unclaimedmoney/claiming-unclaimed-money",
    ladder: [
      { title: "Search the list", detail: "Check your name and previous business or entity names where relevant." },
      { title: "Verify the holder", detail: "The listed organisation may have changed names through a merger or restructure." },
      { title: "Claim through myIR", detail: "Use Inland Revenue's official process rather than paying an unsolicited third party." }
    ],
    socialHook: "IRD MAY BE HOLDING MONEY WITH YOUR NAME ON IT. THE SEARCH IS OFFICIAL."
  },
  {
    id: "official-info",
    mode: "quick",
    eyebrow: "GOVERNMENT RECORDS",
    title: "Ask for the paper trail",
    summary: "Use the OIA or LGOIMA to ask public agencies or councils for official information they hold.",
    rule: "There is no special form required for an official-information request. Agencies must respond as soon as reasonably practicable and no later than 20 working days after receiving the request, unless a lawful extension applies.",
    sourceLabel: "Office of the Ombudsman — make an official information request",
    sourceUrl: "https://www.ombudsman.parliament.nz/what-ombudsman-can-help/requests-official-information/make-request-official-information",
    ladder: [
      { title: "Ask the body that holds it", detail: "Be specific about records, topics, time periods and preferred format." },
      { title: "Track the 20-working-day clock", detail: "Keep the request and receipt date. Extensions have rules and should be communicated." },
      { title: "Use the Ombudsman", detail: "You can complain about delays, extensions, refusals and other OIA/LGOIMA handling issues." }
    ],
    socialHook: "WANT TO KNOW HOW THE GOVERNMENT REACHED THAT DECISION? ASK FOR THE PAPER TRAIL."
  }
];
