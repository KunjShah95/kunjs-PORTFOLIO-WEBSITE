/* ==========================================================================
   Legal documents: Privacy Policy and Terms & Conditions.

   Content lives here, not in the page files, for the same reason everything
   else lives in `lib/`: both pages render the same `LegalDoc` component, and
   the wording is the part that gets revised. Editing a clause should never
   mean touching JSX.

   ------------------------------------------------------------------------
   BEFORE PUBLISHING — confirm these against how you actually work:

   · Terms § "Fees, payment, and taxes" — the payment split, windows, late
     interest and revision rounds mirror `public/pricing.md` on purpose. If you
     change one, change the other: a contract that contradicts the published
     rate card is the one clause a client will actually read.
   · Terms § "How work is engaged" — the hourly rate, the retainer shape and the
     notice period come from the same rate card. Confirm you honour them as
     default terms rather than as marketing.
   · Terms § "Governing law and disputes" — India/Ahmedabad is the default with
     an overseas tier on top. Choose a seat per client and write it into the
     statement of work rather than leaning on the default.
   · Terms § "Ending a project early" — the kill fee is a negotiating position,
     not a fact about the business, and it is the clause most likely to be
     challenged. Agree it per project where it matters.
   · Privacy § "How long I keep it" — the retention windows are a starting point.
   · Both pages — have a qualified lawyer in your jurisdiction review them once.
     They are written to be clear, not to be jurisdiction-specific legal advice.

   Contact details are pulled from `site` rather than restated, so an address
   change on one page propagates to every page that links here.
   ========================================================================== */

import type { IconName } from "@/components/icon";

export type LegalBlock =
  /** Body paragraph. */
  | { kind: "p"; text: string }
  /** Sub-heading inside a section, for documents with grouped clauses. */
  | { kind: "h3"; text: string }
  /** Unordered list. */
  | { kind: "ul"; items: readonly string[] }
  /** Ordered list, for anything with a sequence. */
  | { kind: "ol"; items: readonly string[] }
  /** Tinted aside: the practical version of the clause above it. */
  | { kind: "note"; title: string; text: string };

export type LegalSection = {
  /** Anchor id. Also used for the table of contents. */
  id: string;
  title: string;
  blocks: readonly LegalBlock[];
};

export type LegalDocument = {
  path: string;
  /** Full page title, used in metadata and the document header. */
  title: string;
  /** Short label for footers and cross-links between the two documents. */
  label: string;
  /** Reused wherever the document is listed outside its own page. */
  icon: IconName;
  description: string;
  keywords: readonly string[];
  lead: string;
  /** Shown under the title. Update when the wording changes. */
  effective: string;
  sections: readonly LegalSection[];
};

/* -------------------------------------------------------------------------- */
/*                              Privacy Policy                                 */
/* -------------------------------------------------------------------------- */

export const privacyPolicy: LegalDocument = {
  path: "/privacy",
  title: "Privacy Policy",
  label: "Privacy",
  icon: "shield",
  description:
    "How Kunj Shah collects, uses and protects personal data — on this portfolio and during a freelance engagement. The short version: no accounts, no ad tracking, no selling data.",
  keywords: [
    "privacy policy",
    "Kunj Shah privacy",
    "freelance developer privacy policy",
    "data processing agreement",
    "processor and controller",
    "India DPDP Act 2023",
    "GDPR privacy notice",
  ],
  lead: "This site has no accounts, no login, and no advertising. The short version is that I collect the least I can get away with, I do not sell it, and you can ask me to delete it. Where it covers a freelance engagement, you are the controller and I am your processor.",
  effective: "Effective 11 October 2026",
  sections: [
    {
      id: "summary",
      title: "The short version",
      blocks: [
        {
          kind: "ul",
          items: [
            "No account to create, so no account data to leak.",
            "No advertising, no ad pixels, no third-party marketing cookies.",
            "Nothing is sold, rented, or shared for anyone else's profit.",
            "If you email me or use the contact form, I keep your message so I can reply.",
            "Reading the site collects anonymous pageview counts, not an identity.",
            "You can ask me to show you, correct, or delete what I hold — one email.",
          ],
        },
        {
          kind: "note",
          title: "What this means in practice",
          text: "Visiting these pages does not create a profile of you. There is no cookie banner because there are no cookies to consent to — the only thing stored in your browser is your light/dark theme choice.",
        },
      ],
    },
    {
      id: "who-i-am",
      title: "Who is responsible for your data",
      blocks: [
        {
          kind: "p",
          text: "This website and the freelance services described on it are operated by Kunj Shah, an independent software engineer based in Ahmedabad, Gujarat, India. For the purposes of the Digital Personal Data Protection Act, 2023 (India) and the General Data Protection Regulation (EU/UK), I am the data controller: I decide what is collected and why.",
        },
        {
          kind: "p",
          text: "I am an individual, not a company. There is no legal entity behind this site, and no data protection officer — the person to contact is the person who runs it.",
        },
      ],
    },
    {
      id: "what-i-collect",
      title: "What I collect",
      blocks: [
        {
          kind: "p",
          text: "There are three sources of data, and only the first one identifies you.",
        },
        { kind: "h3", text: "Information you send me" },
        {
          kind: "ul",
          items: [
            "Contact form: your name, email address, company (optional), area of interest, timeline, and the message body.",
            "Direct email: whatever you put in it, plus the email headers your provider attaches.",
            "Client work: documents, credentials, and data you share for a project — governed separately by the engagement agreement, not just this policy.",
          ],
        },
        {
          kind: "p",
          text: "The contact form is validated and forwarded over email. It is never written to a database on this site, so there is no stored copy to breach.",
        },
        { kind: "h3", text: "Information generated by your visit" },
        {
          kind: "ul",
          items: [
            "Pageview counts and coarse traffic sources, collected cookieless by Vercel Analytics.",
            "Technical request data your browser always sends: IP address, user agent, requested URL, referrer, and response timing.",
            "Your light or dark theme choice, kept in your browser's local storage under the key `theme`. It never leaves your device.",
          ],
        },
        { kind: "h3", text: "What I do not collect" },
        {
          kind: "ul",
          items: [
            "No advertising or cross-site tracking identifiers.",
            "No data bought from brokers or appended to your record by a third party.",
            "No special category data — health, biometrics, political views, religion, or sexual orientation — unless you deliberately include it in a message, in which case please do not.",
            "No credentials or payment details. Payments are handled by a payment provider; card numbers never touch this site.",
          ],
        },
      ],
    },
    {
      id: "why-i-use-it",
      title: "Why I am allowed to use it",
      blocks: [
        {
          kind: "p",
          text: "Purpose first, lawful basis second. Each category of data exists for one stated reason, and that reason is the permission.",
        },
        {
          kind: "ul",
          items: [
            "To reply to an enquiry and, if it turns into a project, to run that project — necessary to take steps at your request, and to perform the resulting contract.",
            "To keep the site secure and working — legitimate interest in protecting my service from abuse.",
            "To understand which pages are useful — legitimate interest in improving the site, carried out on cookieless, aggregated counts.",
            "To meet a legal obligation if one genuinely applies, such as Indian tax record-keeping for invoices.",
            "Marketing by email, if you ever ask for it — consent, which you can withdraw at any time.",
          ],
        },
        {
          kind: "note",
          title: "No profiling, no automated decisions",
          text: "Nothing here involves automated decision-making or profiling that produces legal or similarly significant effects about you. There is no scoring, no lookalike audience, and no behavioural advertising.",
        },
      ],
    },
    {
      id: "processors",
      title: "Who else touches it",
      blocks: [
        {
          kind: "p",
          text: "Three services stand between you and me. Each is under contract to process data only on my instructions.",
        },
        {
          kind: "ul",
          items: [
            "Vercel — hosts the site, serves it over CDN, and runs the cookieless analytics. It sees the IP address and request metadata described above.",
            "Resend — delivers contact-form messages and replies. It processes your message content and address purely to send the email.",
            "GitHub, LinkedIn, X, Hugging Face, Peerlist and Medium — I link to these profiles. Nothing is loaded from them unless you click; once you do, their own privacy policies and cookies apply.",
          ],
        },
        {
          kind: "p",
          text: "Web fonts are compiled into the site's own files at build time, so no font provider is contacted when you read a page.",
        },
      ],
    },
    {
      id: "third-party-apps",
      title: "Interactive demos and external AI tools",
      blocks: [
        {
          kind: "p",
          text: "Some projects linked from this site are live applications that call external model providers — for example a browser tool that sends your pasted text to a hosted LLM API. Those requests leave this site and are handled by the provider under their terms, not by this policy.",
        },
        {
          kind: "p",
          text: "The providers behind those demos are the ones named throughout the projects section: OpenRouter, Groq, Google, Anthropic, OpenAI, Hugging Face and NVIDIA among them. Whichever one a demo uses, it receives whatever you type into it, for the length of that request, and nothing more.",
        },
        {
          kind: "p",
          text: "None of them is contacted unless you interact with the demo yourself. Reading a page, scrolling the projects list, or opening this policy sends nothing to any model. Please do not paste confidential, personal, or regulated information into any hosted demo — it may be logged on someone else's infrastructure, and that infrastructure is not something I can give you guarantees about.",
        },
      ],
    },
    {
      id: "engagements",
      title: "When you hire me",
      blocks: [
        {
          kind: "p",
          text: "Everything above describes the website. Commissioning work is different, and the two are kept apart deliberately: during a project you are normally the controller and I am your processor, and the engagement agreement or a data processing agreement governs it rather than this page.",
        },
        {
          kind: "ul",
          items: [
            "I process your personal data only on your documented instructions, for the purpose of delivering the project — never to decide for myself what to do with it.",
            "A data processing agreement is signed before any personal data is processed, and it names the sub-processors in advance rather than after the fact.",
            "Where the project needs a sub-processor — a cloud provider, an API vendor, a model host — you are told which one and why before it touches your data, and they are bound to process on your instructions alone.",
            "Your data is never used to train or fine-tune any model, including mine, and never reused to benefit another client.",
            "On termination, your data is returned or deleted within 30 days, and I confirm in writing once that is done rather than leaving you to assume it.",
            "Overseas clients should read this as the same role split: I do not determine the purposes or the means of your processing, which keeps your own obligations under your regulator intact.",
          ],
        },
        {
          kind: "note",
          title: "What I need from you",
          text: "Tell me where the data came from and whether you have the right to share it with me. Under the Terms you warrant that you do, and I rely on that — I cannot audit your lawful basis from here, and a client who sends regulated data without a basis cannot pass that risk down.",
        },
      ],
    },
    {
      id: "legal-process",
      title: "If someone asks for your data",
      blocks: [
        {
          kind: "p",
          text: "I do not sell, rent, trade or licence personal data to anyone — not to data brokers, not to advertisers, not to other clients. There is no version of this business where your enquiry becomes someone else's asset.",
        },
        {
          kind: "ul",
          items: [
            "A valid court order, summons or statutory demand from a competent authority is the only thing that obliges me to disclose data, and I disclose only what it actually requires — no more, in bulk, or on a vague request.",
            "Where the law permits, I tell you about a request before I comply with it.",
            "I keep no log of who visited beyond the anonymous aggregate counts described above, so there is frequently nothing to hand over even when asked.",
            "Under India's IT Act I am bound by lawful orders of a competent authority; under GDPR I am bound by the rules of whichever member state applies to you.",
          ],
        },
      ],
    },
    {
      id: "retention",
      title: "How long I keep it",
      blocks: [
        {
          kind: "ul",
          items: [
            "Enquiries that do not become projects: deleted within 24 months of the last reply.",
            "Enquiries that do become projects: kept for the life of the engagement and up to 7 years after, because tax and contract records need that long in India.",
            "Client project data itself — code, documents, datasets — returned or deleted within 30 days of the engagement ending. Only the parts that are also invoice or contract records stay for the 7 years above.",
            "Analytics: aggregated on the provider's own schedule. I never export it or join it to anything else.",
            "Server logs: kept by the host for days to weeks for security purposes. I do not set that window and cannot extend it.",
            "Theme preference: stays in your browser until you clear your browser storage.",
          ],
        },
        {
          kind: "p",
          text: "When a window ends, the data is deleted from live systems. Backups roll off on the host's normal schedule.",
        },
      ],
    },
    {
      id: "transfers",
      title: "Where your data is processed",
      blocks: [
        {
          kind: "p",
          text: "I am in India, and my hosting and email providers process data on servers outside India, primarily in the United States and the European Union. This is a cross-border transfer under Indian law and under GDPR Chapter V.",
        },
        {
          kind: "p",
          text: "Engagements move data in both directions. An overseas client may see Indian-hosted tooling, support handled in IST, and invoices administered from India; that is your data, not mine, and it is governed by the engagement agreement rather than by this page.",
        },
        {
          kind: "p",
          text: "Where it applies, these transfers are covered by the providers' standard contractual clauses and their own data processing agreements. The alternative — running the site from an Indian region only — would cost you nothing, but it would also mean giving up access to most of the site.",
        },
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      blocks: [
        {
          kind: "p",
          text: "If you are in India, the Digital Personal Data Protection Act, 2023 gives you rights of access, correction, erasure, nomination, and grievance redressal. If you are in the EU or UK, the GDPR additionally gives you rights of portability, restriction, and objection, and the right to complain to a supervisory authority.",
        },
        {
          kind: "ol",
          items: [
            "Email me. One message is enough; there is no form and no portal.",
            "I may ask for enough information to confirm the request is really from you — for example that the email you are writing from matches the one you wrote to.",
            "I answer within 30 days, sooner in practice, and I tell you plainly if I cannot comply and why.",
            "There is no fee unless a request is manifestly unfounded or excessive.",
          ],
        },
        {
          kind: "p",
          text: "You can also complain to the Data Protection Board of India, or to the supervisory authority for your country, without coming to me first. I would rather hear from you directly, but that is genuinely your right.",
        },
        {
          kind: "note",
          title: "The one thing I cannot hand back",
          text: "An email I have already deleted is gone. If you want to keep a copy of our correspondence, save it before asking me to delete it.",
        },
      ],
    },
    {
      id: "security",
      title: "How I protect it",
      blocks: [
        {
          kind: "ul",
          items: [
            "All traffic is encrypted in transit over HTTPS.",
            "Inquiries are validated server-side, rate-limited per IP, and filtered by a honeypot field and a minimum fill-time check before delivery.",
            "Contact submissions are transmitted, not stored: there is no enquiry database to breach.",
            "Project credentials are never committed to a repository, and secrets belong in environment variables.",
            "Client data is excluded from training any model, including mine.",
          ],
        },
        {
          kind: "p",
          text: "No system is perfectly secure. If a breach ever affects your data, I will tell you and the relevant authority without undue delay and give you the details rather than a reassurance.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and local storage",
      blocks: [
        {
          kind: "p",
          text: "This site sets no cookies. Analytics are cookieless, so there is no consent banner and nothing to opt out of. The only browser storage used is a single local-storage entry recording whether you chose the light or dark theme.",
        },
        {
          kind: "p",
          text: "Clearing your browser storage for this site removes that preference. Because it never identifies you, there is nothing further to delete or export.",
        },
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        {
          kind: "p",
          text: "This site is a professional portfolio and is not directed at anyone under 18. I do not knowingly collect data from children, and if you believe a child has sent me personal information through the contact form, tell me and I will delete it.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          kind: "p",
          text: "I will update this page when what I do changes, and the effective date at the top always reflects the current wording. Material changes — a new processor, a new purpose — are announced on the contact page rather than made quietly.",
        },
        {
          kind: "p",
          text: "Prior versions are not archived publicly. If you need the wording that applied when you engaged me, ask and I will send it.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                         Terms & Conditions (freelance)                      */
/* -------------------------------------------------------------------------- */

export const termsOfService: LegalDocument = {
  path: "/terms",
  title: "Terms & Conditions",
  label: "Terms",
  icon: "auto_stories",
  description:
    "The terms that apply when Kunj Shah freelances: engagement models, scope, fees, revisions, intellectual property, AI-assisted work, confidentiality, liability, and dispute resolution.",
  keywords: [
    "terms and conditions",
    "freelance developer terms",
    "independent contractor agreement",
    "international freelance contract",
    "retainer agreement",
    "arbitration clause",
    "software development contract India",
    "Kunj Shah terms",
  ],
  lead: "These terms cover freelance work: how a project is scoped and paid for, who owns what is built, what each side is responsible for, and how disagreements get settled. Reading them before a project starts is much easier than reading them during a dispute.",
  effective: "Effective 11 October 2026",
  sections: [
    {
      id: "scope-of-these-terms",
      title: "What these terms cover",
      blocks: [
        {
          kind: "p",
          text: "These Terms apply to freelance services supplied by Kunj Shah and to your use of this website. They form the default agreement for any engagement that does not have its own written contract.",
        },
        {
          kind: "p",
          text: "Browsing this site, reading it, or downloading the résumé accepts nothing — you are agreeing to the Terms only when you commission work. Where a signed statement of work, master services agreement, or non-disclosure agreement exists, that document wins on anything it addresses, and these Terms fill the gaps. Where they are all silent, the order of precedence is: the signed engagement document, then these Terms, then the published rate card on this site.",
        },
        {
          kind: "p",
          text: "Nothing here is a consumer contract. If you are hiring me as a consumer rather than for business use, tell me before we start, because consumer protection rules in your country may override what is written below.",
        },
      ],
    },
    {
      id: "who-i-am",
      title: "Who you are contracting with",
      blocks: [
        {
          kind: "p",
          text: "You are contracting with Kunj Shah, an independent software engineer trading as an individual in Ahmedabad, Gujarat, India. I am not an agency, I do not subcontract your work without telling you, and no third party is a party to this agreement.",
        },
        {
          kind: "p",
          text: "The relationship is that of an independent contractor and a client. I am not your employee, partner, agent, or fiduciary, and I owe you professional services — not a general duty of loyalty to your business.",
        },
        {
          kind: "p",
          text: "In practice that means I work for more than one client at a time unless we agree a retainer that reserves capacity, I use my own equipment and accounts, I carry my own insurance where a project warrants it, and I have no authority to sign, bind or speak for your company. Unless we agree otherwise in writing, I am not exclusive to you.",
        },
      ],
    },
    {
      id: "services",
      title: "The services",
      blocks: [
        {
          kind: "p",
          text: "I build production AI systems: autonomous agents and multi-agent orchestration, retrieval-augmented generation, computer vision on edge hardware, and full-stack AI applications. The specific services, stack, and deliverables are set out in the proposal or statement of work for each project.",
        },
        {
          kind: "note",
          title: "Technology is not a promise of outcome",
          text: "A project is delivered against defined scope and acceptance criteria. No one — including me — can guarantee a business metric such as revenue, conversion, or model accuracy on unseen data. Where a target genuinely depends on factors inside my control, it is written into the acceptance criteria and is enforceable as such.",
        },
      ],
    },
    {
      id: "engagement-models",
      title: "How work is engaged",
      blocks: [
        {
          kind: "p",
          text: "Most work runs on one of four models. The proposal says which one applies, and everything below is a default that a statement of work can override.",
        },
        { kind: "h3", text: "Fixed scope" },
        {
          kind: "p",
          text: "A defined set of deliverables for a defined price, split across milestones. This is the default for builds, and it is the only model where a fixed price is meaningful — the scope has to be genuinely fixed for the number to mean anything.",
        },
        { kind: "h3", text: "Hourly" },
        {
          kind: "p",
          text: "For reviews, debugging, integration, pair sessions and mentoring — work where the shape is genuinely not knowable in advance. Hours are tracked against a written estimate and capped up front; I stop and raise a change request at the cap rather than billing past it. Time is invoiced weekly in arrears on a 7-day payment window.",
        },
        { kind: "h3", text: "Retainer" },
        {
          kind: "p",
          text: "Reserved capacity for an agreed monthly fee, typically 10 to 25 hours a month with a shared channel and priority turnaround. Unused hours do not roll over and are not refundable, because the capacity is held whether or not you draw on it. Either of us can end a retainer with 30 days' written notice.",
        },
        { kind: "h3", text: "Full-time" },
        {
          kind: "p",
          text: "Available on request for AI engineer, ML engineer or agent builder roles, remote or relocating. That is an employment or long-term contract conversation rather than a freelance engagement, so a separate agreement is drafted for it and these Terms apply only to the parts that still hold.",
        },
      ],
    },
    {
      id: "proposals",
      title: "Proposals, estimates, and scope",
      blocks: [
        {
          kind: "ol",
          items: [
            "A proposal is valid for 14 days from issue, after which the pricing and availability may be re-quoted.",
            "Estimates are estimates. Where the cost of a requirement is unknown until it is attempted, the proposal says so and the assumption is written down.",
            "The statement of work defines deliverables, acceptance criteria, exclusions, timeline, and price. Anything not in it is out of scope.",
            "Work outside the agreed scope becomes a written change request with its own cost and timeline, approved before I start it. I do not absorb unlimited scope creep and I do not silently do unpaid work.",
          ],
        },
      ],
    },
    {
      id: "engagement",
      title: "How an engagement runs",
      blocks: [
        {
          kind: "ul",
          items: [
            "A project starts on a signed proposal or statement of work, with the agreed first payment in. Work begins when that payment clears, not when the paperwork is signed.",
            "Work is delivered in milestones. Each milestone is reviewed and accepted before the next begins.",
            "Each milestone is released on payment for the previous one. If a milestone stalls for more than 14 days through no fault of mine, I may pause the project and invoice for work completed to date.",
            "Work in progress is shared continuously in a repository or workspace you own or can access, so you can see progress rather than receive it at the end.",
          ],
        },
      ],
    },
    {
      id: "client-responsibilities",
      title: "What I need from you",
      blocks: [
        {
          kind: "p",
          text: "Most project delays are caused by waiting on the client, not on the engineering. These are the things that move the schedule:",
        },
        {
          kind: "ul",
          items: [
            "Timely feedback and approvals — agreed review windows, and a named person who can give a yes or a no.",
            "Materials, data, credentials, and API access needed to do the work, supplied complete and lawful to use.",
            "A warranty that you have the right to give me everything you provide: that the data, content, code and trademarks are yours or properly licensed, and that nothing in them obliges me to infringe someone else's rights. I rely on this and cannot verify your lawful basis from my side of the work.",
            "A single point of contact for decisions, so requirements do not contradict each other halfway through a build.",
            "Legal review of anything that must comply with a regulation. I implement requirements; I am not your counsel, and I do not warrant a regulatory outcome.",
          ],
        },
        {
          kind: "p",
          text: "Where a delay is caused by something in this list, the timeline moves by the length of that delay. I will say so rather than absorb it and quietly ship late.",
        },
      ],
    },
    {
      id: "revisions",
      title: "Revisions and acceptance",
      blocks: [
        {
          kind: "p",
          text: "Each proposal includes a revision allowance against its acceptance criteria — two rounds is the standard on fixed-scope work, and the proposal states the number. A revision is a change to something that was agreed, not a change of direction. Two rounds of feedback on the same feature is one round with a lot of notes.",
        },
        {
          kind: "ul",
          items: [
            "Feedback consolidated into one list per round. Fragmented feedback across calls and messages gets treated as a new round.",
            "Work is deemed accepted 10 business days after delivery if no written rejection is sent, unless the statement of work says otherwise.",
            "A rejection must say which acceptance criterion failed. If it does not map to one, it is a change request.",
            "Revisions beyond the agreed rounds, or revisions to work already accepted, are billed at the project's standard rate.",
          ],
        },
      ],
    },
    {
      id: "fees",
      title: "Fees, payment, and taxes",
      blocks: [
        {
          kind: "ul",
          items: [
            "Fees are stated in the proposal, in Indian Rupees or US Dollars, and exclude applicable taxes. The published rate card and these Terms should never contradict each other; where they appear to, the proposal governs that engagement.",
            "Indian GST is charged at the prevailing rate where required. You are responsible for taxes in your own jurisdiction, including withholding tax where it applies.",
            "On fixed-scope work the split is 40% on signature and 60% on final delivery, unless the proposal states a different split. On hourly and retainer work there is no advance — you are invoiced weekly or monthly in arrears and pay within 7 days.",
            "Invoices unpaid after 7 days on hourly and retainer work, or 14 days on fixed-scope work, accrue interest at 1.5% per month, or the maximum rate your law permits, whichever is lower. Work pauses until the account is settled.",
            "Payment is by bank transfer, UPI, or an agreed cross-border service such as Wise. A cross-border payment is received net: bank charges and intermediary fees are yours, so the amount that lands is the amount invoiced.",
            "Where your law requires you to withhold tax from my fee, the invoice is grossed up so the agreed amount still reaches me, and you provide the withholding documentation I need to claim it back.",
            "A currency change between proposal and invoice is passed through at the rate on the invoice date.",
          ],
        },
        {
          kind: "note",
          title: "Expenses",
          text: "Third-party costs that are necessary and pre-approved — API usage at volume, cloud infrastructure, licensed software, model or data fees — are billed at cost. I will flag any expected overrun before it happens, not after.",
        },
      ],
    },
    {
      id: "ip",
      title: "Intellectual property",
      blocks: [
        {
          kind: "p",
          text: "The point of the exercise is that you end up owning what you paid for. So: on receipt of payment in full, all right, title, and interest in the custom deliverables created specifically for you transfer to you.",
        },
        { kind: "h3", text: "What stays with me" },
        {
          kind: "ul",
          items: [
            "Background and pre-existing material: tools, libraries, internal utilities, code fragments, and generic know-how I had before the project or developed independently of it.",
            "Anything listed in the proposal as retained, and any general reusable component not specific to your business — which stays mine and is licensed to you, perpetually and royalty-free, for use in the delivered work.",
            "Third-party and open-source components, which are governed by their own licences and remain subject to them.",
          ],
        },
        {
          kind: "p",
          text: "You may not resell, license, or redistribute retained material on its own. It is licensed into your product, not extracted from it.",
        },
        { kind: "h3", text: "Third-party model output" },
        {
          kind: "p",
          text: "Where a deliverable is generated using an external model provider, that output is also subject to the provider's terms. I do not claim to be able to license it exclusively, and I disclose in the proposal when a deliverable depends on a provider I do not control.",
        },
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      blocks: [
        {
          kind: "p",
          text: "Confidentiality is mutual. I treat your business, data, credentials, and product plans as confidential, and I expect the same in return about my pricing, methods, and internal tooling.",
        },
        {
          kind: "ul",
          items: [
            "These obligations survive the end of the project, without a time limit.",
            "They do not apply to information that is public, already yours without restriction, independently developed, or lawfully required to be disclosed by law or court order.",
            "I disclose information only to the minimum number of people who need it to do the work, and only under equivalent obligations.",
            "A mutual non-disclosure agreement can be signed before the first conversation about your business, if you would prefer that on paper.",
          ],
        },
      ],
    },
    {
      id: "ai-assisted-work",
      title: "AI-assisted work",
      blocks: [
        {
          kind: "p",
          text: "I build AI systems, and I use AI tooling to build them — code assistants, hosted APIs, local models, and my own agents. Rather than leave you to guess what that means commercially, here is exactly what it does and does not change.",
        },
        {
          kind: "ul",
          items: [
            "Your code, data, documents and credentials are never used to train or fine-tune any model, including one I run myself. Where a hosted provider is involved, the project is configured for no-training terms, and I tell you if a given vendor cannot offer that.",
            "Confidential material goes to a local or self-hosted model wherever the task allows it. If a task genuinely requires sending your material to a third-party model, that is agreed in writing first, with the provider named.",
            "Everything I deliver is reviewed and tested by me. Model output is a first draft, never an accepted deliverable, and no code reaches your repository that I have not run, read, and stood behind.",
            "You own the output the same way you own anything else I build for you, subject to the retained-material carve-outs above.",
            "Third-party providers set their own terms on what their output may be used for. Where a deliverable depends on one — generated assets, a fine-tuned model, a hosted endpoint — the proposal names it, and you accept those terms along with it.",
            "If your organisation has its own AI policy, a ban on public providers or a required approved-vendor list, tell me at kickoff rather than at review. Retrofitting a compliance requirement into a finished system is the expensive way to discover it.",
          ],
        },
        {
          kind: "note",
          title: "What I do not promise",
          text: "I can promise that a system does what its acceptance criteria say. I cannot promise that a model will behave the same way on data it has never seen, and no clause here pretends otherwise. Accuracy is written as a criterion against a defined evaluation set, never as an open-ended expectation.",
        },
      ],
    },
    {
      id: "subcontracting",
      title: "Subcontracting and specialist help",
      blocks: [
        {
          kind: "p",
          text: "Occasionally a project needs a specialist I am not — a designer, a security auditor, a data engineer. That is reasonable, but it happens on terms rather than by accident.",
        },
        {
          kind: "ul",
          items: [
            "You are told before any subcontractor touches your work, with their name and what they are doing. You may object on reasonable grounds — security clearance, jurisdiction, conflict of interest — and that objection stands.",
            "Nothing is subcontracted without your written consent where the work involves your production data, your credentials, or your customers' personal data.",
            "Subcontractors are bound by the same confidentiality, IP and data-protection obligations as me, and their work is my responsibility exactly as if I had done it.",
            "Subcontracting never changes your point of contact. You deal with me, not with a chain of names to chase when something slips.",
          ],
        },
      ],
    },
    {
      id: "non-solicitation",
      title: "Non-solicitation",
      blocks: [
        {
          kind: "p",
          text: "Mutual, narrow, and limited to twelve months after an engagement ends. The purpose is to stop either side pulling the other's project team out mid-build. It is not a general non-compete, and it does not stop either of us working in the same market.",
        },
        {
          kind: "ul",
          items: [
            "For twelve months after an engagement ends, neither of us will knowingly solicit for employment the other's named project team members who worked on it.",
            "This does not apply to general advertising, to a recruiter approaching someone who had no role on your project, to someone who had already left your team, or to anyone approached without either party knowing they were on the project.",
            "Nothing here prevents either of us from taking work from a competitor, and nothing here prevents you from hiring whoever you like.",
          ],
        },
      ],
    },
    {
      id: "portfolio",
      title: "Portfolio and credit",
      blocks: [
        {
          kind: "p",
          text: "Unless we agree otherwise in writing, I may show finished work on this site and professional networks — the shape of the system, the stack, and non-confidential metrics — once it is publicly launched. This is how the site you are reading was built.",
        },
        {
          kind: "ul",
          items: [
            "Client data, credentials, private code, and internal business metrics are never published.",
            "Anything under a confidentiality agreement, or marked as sensitive at kickoff, is excluded.",
            "Say the word and your work is omitted entirely, no questions asked. Written withdrawal is honoured for anything not yet published.",
            "Attribution is welcome but never a condition of payment. You may ask me to remove a reference; I will, unless the work was jointly produced and your name is part of why it is worth showing.",
          ],
        },
      ],
    },
    {
      id: "warranties",
      title: "Warranties",
      blocks: [
        {
          kind: "p",
          text: "I warrant that the work I deliver will perform according to the acceptance criteria in the statement of work, and that I will correct defects attributable to that work free of charge for 90 days from acceptance.",
        },
        {
          kind: "ul",
          items: [
            "That warranty covers defects in the delivered work: it does not cover new features, changed requirements, third-party service outages, model behaviour on new inputs, or your own modifications.",
            "Work is performed with reasonable skill and care, and with the professional standards of an experienced engineer. It is not a guarantee that a particular business outcome will follow.",
            "I do not warrant that third-party models, APIs, or platforms will remain available, accurate, or unchanged. That is a dependency, and I flag it in proposals rather than pretending otherwise.",
          ],
        },
      ],
    },
    {
      id: "support-after-launch",
      title: "Support after launch",
      blocks: [
        {
          kind: "p",
          text: "A warranty and a support commitment are different things, so they are separate clauses. The warranty fixes defects in what was delivered. Support is what happens once that window has closed, and it is not assumed to be free.",
        },
        {
          kind: "ul",
          items: [
            "During the warranty window, defects in the delivered work are fixed free of charge, as set out under Warranties above.",
            "Beyond it, bug reports and small fixes are billed at the project's standard rate, or absorbed under a retainer if one is in place. Something that only broke because an upstream API changed its behaviour is a maintenance item, not a defect fix, and is not free.",
            "Ongoing support with a response commitment is a retainer line item, not a default: what hours, what turnaround, and what counts as urgent all get written down.",
            "I do not hold, monitor or administer production infrastructure after handover unless that was in scope. Handover includes the runbook, the environment inventory, and credentials transferred to you rather than retained by me.",
            "Advisory and knowledge-transfer sessions are sold as a fixed block of time. A day of handover is far cheaper than indefinite responsibility, and it leaves your team able to run the thing without me.",
          ],
        },
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      blocks: [
        {
          kind: "p",
          text: "The liability cap matters more than the rest of this clause, so it is stated plainly: my total liability for anything arising out of a project is capped at the fees you paid me for that project in the three months before the claim.",
        },
        {
          kind: "ul",
          items: [
            "Neither of us is liable for indirect or consequential loss: lost profit, lost revenue, lost data, lost opportunity, or business interruption.",
            "Nothing here limits liability that cannot be limited by law — fraud, wilful misconduct, death or personal injury caused by negligence, or your own confidentiality obligations.",
            "These limits apply equally to my subcontractors, employees, and agents.",
          ],
        },
        {
          kind: "note",
          title: "Practical read",
          text: "If a project involves data you cannot afford to lose, the right protection is insurance, backups, and a recovery plan — not a liability clause. I will say so if that is what your project needs.",
        },
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      blocks: [
        {
          kind: "p",
          text: "You indemnify me against claims, damages, and reasonable legal costs arising from materials you supply — content, data, code, or trademarks — or from your use of the delivered work in a way that infringes someone else's rights or breaks the law.",
        },
        {
          kind: "p",
          text: "I indemnify you the same way against third-party claims that the custom deliverables, as delivered and used as agreed, infringe intellectual property rights — excluding anything traceable to materials you supplied or to modifications you or a third party made.",
        },
      ],
    },
    {
      id: "termination",
      title: "Ending a project early",
      blocks: [
        {
          kind: "ul",
          items: [
            "Either of us may terminate a fixed-scope engagement with 14 days' written notice. A retainer ends on 30 days' notice from either side.",
            "Cancelling fixed-scope work after it has started costs a kill fee of 25% of the remaining contracted value, or the value of commitments already made that cannot be unwound, whichever is greater. That is what reserved capacity costs when it can only be sold once.",
            "On termination, you pay for all completed work and work in progress up to that point, plus the kill fee where one applies. Any advance already paid is set against that invoice rather than refunded.",
            "You receive everything produced to date, in the repository or workspace, within 10 business days of final payment.",
            "I may suspend or terminate immediately for non-payment, for unlawful instructions, or where continuing would put a third party's data at risk.",
            "If you go quiet for 30 days on an hourly or retainer engagement, the engagement pauses rather than continuing to accrue fees. Resuming restarts the cycle.",
            "Provisions that by their nature should survive — payment, intellectual property, confidentiality, liability, and these terms generally — survive termination.",
          ],
        },
      ],
    },
    {
      id: "data-protection",
      title: "Data protection during a project",
      blocks: [
        {
          kind: "p",
          text: "The Privacy Policy on this site describes how the site handles data. A project is different: it involves your business data, and the rules are in the engagement agreement rather than here.",
        },
        {
          kind: "ul",
          items: [
            "Your data is used only to deliver the project. It is never used to train or fine-tune any model, including mine, and never used for another client's benefit.",
            "Access is limited to people working on the project, under the same confidentiality obligations.",
            "Where the project requires a sub-processor — a cloud provider, an API vendor, a model host — I tell you which one and why, and they are bound to process data on your instructions.",
            "On termination, your data is deleted or handed back as agreed, within 30 days.",
            "A data processing agreement is available on request and is signed before any personal data is processed.",
          ],
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use of this site",
      blocks: [
        {
          kind: "ul",
          items: [
            "Do not scrape, mirror, or bulk-copy the site to build a competing collection, and do not use it as a training corpus without asking.",
            "Do not attempt to disrupt the site, probe it for vulnerabilities without written permission, or bypass its rate limits and spam protections.",
            "Do not submit commercial spam, phishing content, or anything unlawful through the contact form.",
            "Do not misrepresent yourself or your affiliation when getting in touch. I will decline work I am not permitted to take.",
          ],
        },
        {
          kind: "p",
          text: "Public information and the code on this site are provided for reading. Where a project carries an explicit licence, that licence applies; where it does not, all rights are reserved and the code is not yours to copy.",
        },
      ],
    },
    {
      id: "law",
      title: "Governing law and disputes",
      blocks: [
        {
          kind: "p",
          text: "These Terms are governed by the laws of India, and the courts at Ahmedabad, Gujarat have jurisdiction, under the Indian Limitation Act. Nothing in this clause removes any mandatory consumer protection you hold under the law of your own country.",
        },
        {
          kind: "p",
          text: "Most disputes are a misunderstanding about scope or priority, and both of us would rather fix one than litigate it. The process below is in that order, and step three is the only one that involves a third party.",
        },
        {
          kind: "ol",
          items: [
            "Talk to each other first. Raise it in writing within 14 days of noticing, and put the disagreement in a sentence or two — most of these dissolve once both sides can see the same problem.",
            "If that fails, attempt good-faith mediation through a mutually agreed mediator, with costs shared equally. Nothing is filed before this step is genuinely tried.",
            "If mediation does not resolve it, the matter goes to arbitration or to the courts at Ahmedabad, whichever the statement of work specifies. If neither says, the courts apply and the default above governs.",
            "Either of us may seek urgent injunctive or protective relief from a court at any time without first going through these steps — to stop something irreversible happening to data, credentials, or IP while the argument continues.",
          ],
        },
        {
          kind: "note",
          title: "If you are contracting from outside India",
          text: "Indian law and an Ahmedabad courtroom are workable for most overseas engagements, but they are not always what you need. A foreign governing law, a different seat, or arbitration under the ICC rules can all be agreed in the statement of work before work starts. Raise it in the first conversation — it is much harder to renegotiate a governing law once a project is half-built.",
        },
      ],
    },
    {
      id: "notices",
      title: "Notices and the rest of the legal machinery",
      blocks: [
        {
          kind: "p",
          text: "The clauses that usually get skipped are here in plain terms, because a term nobody reads is a term that does not protect anyone.",
        },
        {
          kind: "ul",
          items: [
            "Notices are valid by email to the address the other side has given for the engagement, and take effect on delivery. A change of contact details is notified the same way.",
            "Neither of us may assign this agreement to a third party without written consent, though either may do so as part of a genuine sale or merger of the business, on written notice.",
            "These Terms, together with any signed statement of work, are the entire agreement between us on the subject. Earlier emails, calls, or messages do not form part of it, and nothing here displaces a duty that cannot lawfully be displaced.",
            "Neither of us may use these Terms or the engagement to imply endorsement, or to name the other as a reference, without written permission — with the one exception already given under Portfolio and credit.",
            "If you do not enforce a clause once, that is not a waiver of it. Waivers only count in writing.",
          ],
        },
      ],
    },
    {
      id: "changes",
      title: "Changes and severability",
      blocks: [
        {
          kind: "p",
          text: "I may update these Terms as the business changes. The effective date at the top always reflects the current wording, and changes apply to engagements that start after they are published. Terms agreed for work already in flight are not changed underneath you.",
        },
        {
          kind: "p",
          text: "If a clause is found unenforceable, the rest of these Terms stand, and the unenforceable clause is narrowed to the smallest thing that works rather than struck out entirely.",
        },
      ],
    },
  ],
};

/** Both documents, in footer order. */
export const legalDocuments = [privacyPolicy, termsOfService] as const;