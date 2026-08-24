// Reference library of common Amazon seller suspension categories.
// Grounds the Claude prompt so generated appeals match what Amazon's
// Seller Performance team actually expects, instead of a generic template.

export type SuspensionCategory = {
  id: string;
  label: string;
  triggers: string[];
  rootCausePatterns: string[];
  correctiveActionPatterns: string[];
  preventiveActionPatterns: string[];
};

export const SUSPENSION_CATEGORIES: SuspensionCategory[] = [
  {
    id: "inauthentic",
    label: "Inauthentic / Counterfeit Complaint",
    triggers: [
      "Customer complaint claiming item is not authentic",
      "Brand/rights owner complaint",
      "Test buy by Amazon flagged as suspected counterfeit",
    ],
    rootCausePatterns: [
      "Sourced inventory from an unauthorized or unverified supplier",
      "Commingled inventory (FBA) mixed with counterfeit units from another seller",
      "Missing or insufficient proof of authenticity for the sourcing chain",
    ],
    correctiveActionPatterns: [
      "Removed all affected ASINs/units from sale immediately",
      "Obtained invoices from an authorized distributor covering at least the last 365 days",
      "Opted out of commingled inventory (Fulfilled by Amazon transparency/unique SKU) if FBA-related",
    ],
    preventiveActionPatterns: [
      "Switched sourcing to only Amazon-approved or brand-authorized distributors",
      "Implemented a supplier vetting checklist requiring signed invoices and authenticity documentation before listing",
      "Enrolled in Transparency or opted out of commingling to isolate inventory",
    ],
  },
  {
    id: "ip-complaint",
    label: "Intellectual Property (IP) Complaint",
    triggers: [
      "Trademark, copyright, or patent complaint from a rights owner",
      "Use of brand name/logo in listing images or title without authorization",
    ],
    rootCausePatterns: [
      "Listing content (title, images, or bullet points) used protected brand assets without permission",
      "Product was a compatible/aftermarket item marketed in a way that implied brand affiliation",
    ],
    correctiveActionPatterns: [
      "Removed or edited the listing content that referenced the protected IP",
      "Contacted the rights owner directly to resolve the complaint and requested a retraction where applicable",
    ],
    preventiveActionPatterns: [
      "Established an internal review step for all new listing copy and images against trademark use",
      "Created a compliance checklist for compatible/aftermarket products to avoid implying brand affiliation",
    ],
  },
  {
    id: "listing-policy",
    label: "Listing Policy Violation",
    triggers: [
      "Restricted keywords in title/bullets",
      "Miscategorized product",
      "Prohibited claims (e.g., medical claims on a non-medical product)",
    ],
    rootCausePatterns: [
      "Listing content included restricted or misleading claims not reviewed against current Amazon policy",
      "Product was placed in an incorrect or restricted category",
    ],
    correctiveActionPatterns: [
      "Edited the listing to remove all flagged claims/keywords",
      "Recategorized the product correctly and resubmitted for review",
    ],
    preventiveActionPatterns: [
      "Adopted a pre-publish policy checklist referencing Amazon's current Restricted Products and Prohibited Content policies",
      "Assigned listing review responsibility to a single accountable person before any new SKU goes live",
    ],
  },
  {
    id: "performance-metrics",
    label: "Performance Metrics (ODR, Late Shipment, Cancellation Rate)",
    triggers: [
      "Order Defect Rate above 1%",
      "Late Shipment Rate above 4%",
      "Pre-fulfillment Cancel Rate above 2.5%",
    ],
    rootCausePatterns: [
      "Inventory/stock sync issues caused stockouts leading to cancellations",
      "Carrier delays or capacity issues during a high-volume period caused late shipments",
      "Insufficient staffing or process for order confirmation during a demand spike",
    ],
    correctiveActionPatterns: [
      "Fixed the specific defective orders identified by Amazon (refunds/replacements issued)",
      "Adjusted inventory buffers and reconciled stock counts across all sales channels",
    ],
    preventiveActionPatterns: [
      "Implemented automated inventory sync to prevent overselling",
      "Added a buffer/safety stock threshold and switched to a more reliable carrier for time-sensitive SKUs",
      "Set up daily performance dashboard monitoring to catch metric drift before it breaches thresholds",
    ],
  },
  {
    id: "verification",
    label: "Account Verification / Identity Issue",
    triggers: [
      "Requested documents (ID, bank statement, utility bill) did not match account information",
      "Video verification call flagged a mismatch",
    ],
    rootCausePatterns: [
      "Submitted documents were outdated, in a different name, or in a different currency/format than required",
      "Business address on file did not match the submitted utility bill or bank statement",
    ],
    correctiveActionPatterns: [
      "Gathered and resubmitted current, matching documentation (government ID, bank statement, utility bill all under the same legal name and address)",
      "Corrected the account's legal entity/address information to match the submitted documents",
    ],
    preventiveActionPatterns: [
      "Keeps a folder of current verification documents ready and updates them proactively when address/banking changes",
    ],
  },
  {
    id: "related-accounts",
    label: "Related/Multiple Accounts",
    triggers: [
      "Shared device, IP address, bank account, or business details with another Seller Central account",
    ],
    rootCausePatterns: [
      "Opened a second account without realizing it triggers Amazon's related-account policy",
      "Shared infrastructure (office network, accountant's bank account) with a business partner who also sells on Amazon",
    ],
    correctiveActionPatterns: [
      "Identified the specific related account and explained the legitimate business reason for the overlap",
      "Closed the unnecessary duplicate account, or requested Amazon's linking/permission process where legitimately operating multiple accounts",
    ],
    preventiveActionPatterns: [
      "Separated all account infrastructure — dedicated device, network, and bank account per Seller Central account",
      "Documented the business structure and requested prior Amazon approval before opening any additional account",
    ],
  },
  {
    id: "drop-shipping",
    label: "Drop Shipping Policy Violation",
    triggers: [
      "Packing slips or invoices showing a third-party retailer's name instead of the seller's",
      "Order fulfilled directly from a retail store without the seller ever holding inventory",
    ],
    rootCausePatterns: [
      "Fulfillment process shipped directly from a retail supplier whose branding appeared on the package/invoice",
    ],
    correctiveActionPatterns: [
      "Switched to a supplier relationship (wholesale or manufacturer) that ships with the seller's own branding/invoice, or fulfilled remaining orders using seller-branded packaging",
    ],
    preventiveActionPatterns: [
      "Moved to suppliers who provide blank/seller-branded packing slips as standard practice",
      "Added a supplier agreement clause requiring unbranded fulfillment as a condition of the sourcing relationship",
    ],
  },
];

export function findCategory(id: string): SuspensionCategory | undefined {
  return SUSPENSION_CATEGORIES.find((c) => c.id === id);
}
