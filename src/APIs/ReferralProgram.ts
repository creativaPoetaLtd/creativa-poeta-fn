import { trackConversion } from "../analytics/analytics";
import { authRequest, publicRequest } from "./client";

export type ReferralPartnerStatus = "pending" | "approved" | "active" | "rejected" | "suspended" | "closed";
export type ReferralLeadStatus = "submitted" | "waiting_for_introduction" | "under_review" | "accepted" | "duplicate" | "rejected" | "contacted" | "qualified" | "proposal_sent" | "won" | "lost";
export type ReferralRewardStatus = "waiting_client_payment" | "earned" | "approved" | "scheduled" | "paid" | "cancelled";

export interface ReferralActivity {
  type?: string;
  message: string;
  actorEmail?: string;
  actorName?: string;
  at: string;
}

export interface ReferralPartner {
  _id: string;
  partnerId?: string;
  name: string;
  email: string;
  country: string;
  locale: string;
  profileType: string;
  program: "referral" | "business";
  website?: string;
  networkDescription?: string;
  status: ReferralPartnerStatus;
  termsVersion: string;
  termsAcceptedAt: string;
  marketingConsent: boolean;
  rejectionReason?: string;
  activity: ReferralActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface ReferralLead {
  _id: string;
  partnerId: string;
  partnerName: string;
  partnerEmail: string;
  companyName: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  serviceNeeded: string;
  budgetRange?: string;
  needDescription: string;
  relationship: string;
  consentStatus: "agreed" | "not_yet" | "prospect_submitted";
  introductionMethod: string;
  introductionDetails?: string;
  locale: string;
  status: ReferralLeadStatus;
  eligibility: "pending" | "eligible" | "ineligible";
  decisionReason?: string;
  assignedToEmail?: string;
  assignedToName?: string;
  activity: ReferralActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface ReferralReward {
  _id: string;
  lead: { _id: string; companyName: string; status: ReferralLeadStatus } | string;
  partner: { _id: string; name: string; email: string } | string;
  partnerId: string;
  currency: string;
  eligibleRevenueCents: number;
  rateBasisPoints: number;
  capCents: number;
  amountCents: number;
  status: ReferralRewardStatus;
  paymentReference?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReferralApplicationPayload {
  name: string;
  email: string;
  country: string;
  locale: string;
  profileType: string;
  program: "referral" | "business";
  website?: string;
  networkDescription?: string;
  termsAccepted: boolean;
  marketingConsent: boolean;
  websiteConfirmation?: string;
}

export interface ReferralLeadPayload {
  partnerId: string;
  accessSecret: string;
  companyName: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  serviceNeeded: string;
  budgetRange?: string;
  needDescription: string;
  relationship: string;
  consentStatus: "agreed" | "not_yet";
  introductionMethod: string;
  introductionDetails?: string;
  locale: string;
  websiteConfirmation?: string;
}

export interface ProspectReferralPayload {
  referralCode: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  serviceNeeded: string;
  budgetRange?: string;
  needDescription: string;
  contactConsent: boolean;
  locale: string;
  websiteConfirmation?: string;
}

export const submitReferralApplication = async (data: ReferralApplicationPayload) => {
  const response = await publicRequest<{ applicationId: string; status: ReferralPartnerStatus }>(
    { method: "POST", url: "/api/referral-program/partners", data },
    "Failed to submit referral partner application."
  );
  trackConversion("referral_partner_application_submitted", "referral_partner_application");
  return response;
};

export const submitReferralLead = async (data: ReferralLeadPayload) => {
  const response = await publicRequest<{ leadId: string; status: ReferralLeadStatus }>(
    { method: "POST", url: "/api/referral-program/leads", data },
    "Failed to submit referral."
  );
  trackConversion("referral_lead_submitted", "referral_lead");
  return response;
};

export const submitProspectReferral = async (data: ProspectReferralPayload) => {
  const response = await publicRequest<{ leadId: string; status: ReferralLeadStatus }>(
    { method: "POST", url: "/api/referral-program/prospect-referrals", data },
    "Failed to submit your project request."
  );
  trackConversion("prospect_confirmed_referral_submitted", "referral_lead");
  return response;
};

export const getReferralProgramSummary = () => authRequest<{ metrics: Record<string, number> }>(
  { method: "GET", url: "/api/referral-program/summary" },
  "Failed to fetch referral program summary."
);

export const getReferralPartners = (page = 1, status = "all", search = "") => authRequest<{
  partners: ReferralPartner[];
  pagination: { currentPage: number; totalPages: number; total: number; limit: number };
}>({ method: "GET", url: "/api/referral-program/partners", params: { page, status, search } }, "Failed to fetch referral partners.");

export const updateReferralPartner = (id: string, data: { status: ReferralPartnerStatus; reason?: string; regenerateAccess?: boolean }) => authRequest<{ partner: ReferralPartner; emailSent: boolean }>(
  { method: "PATCH", url: `/api/referral-program/partners/${id}`, data },
  "Failed to update referral partner."
);

export const getReferralLeads = (page = 1, status = "all", search = "") => authRequest<{
  leads: ReferralLead[];
  pagination: { currentPage: number; totalPages: number; total: number; limit: number };
}>({ method: "GET", url: "/api/referral-program/leads", params: { page, status, search } }, "Failed to fetch referral leads.");

export const updateReferralLead = (id: string, data: { status?: ReferralLeadStatus; eligibility?: ReferralLead["eligibility"]; reason?: string }) => authRequest<{ lead: ReferralLead }>(
  { method: "PATCH", url: `/api/referral-program/leads/${id}`, data },
  "Failed to update referral lead."
);

export const claimReferralLead = (id: string) => authRequest<{ lead: ReferralLead }>(
  { method: "POST", url: `/api/referral-program/leads/${id}/claim` },
  "Failed to assign referral lead."
);

export const getReferralRewards = (page = 1, status = "all") => authRequest<{
  rewards: ReferralReward[];
  pagination: { currentPage: number; totalPages: number; total: number; limit: number };
}>({ method: "GET", url: "/api/referral-program/rewards", params: { page, status } }, "Failed to fetch referral rewards.");

export const upsertReferralReward = (leadId: string, data: { eligibleRevenueCents: number; rateBasisPoints?: number; capCents?: number; status: ReferralRewardStatus; paymentReference?: string }) => authRequest<{ reward: ReferralReward }>(
  { method: "PUT", url: `/api/referral-program/leads/${leadId}/reward`, data },
  "Failed to update referral reward."
);

export const updateReferralRewardStatus = (id: string, status: "earned" | "approved" | "scheduled" | "cancelled") => authRequest<{ reward: ReferralReward }>(
  { method: "PATCH", url: `/api/referral-program/rewards/${id}/status`, data: { status } },
  "Failed to update referral reward status."
);

export const markReferralRewardPaid = (id: string, paymentReference: string) => authRequest<{ reward: ReferralReward }>(
  { method: "PATCH", url: `/api/referral-program/rewards/${id}/pay`, data: { paymentReference } },
  "Failed to mark referral reward as paid."
);
