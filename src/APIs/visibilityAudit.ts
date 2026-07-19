import { API_BASE_URL, publicRequest } from "./client";

export type TechnicalAuditCheck = {
  id: string;
  label: string;
  passed: boolean;
  weight: number;
  detail: string;
  priority: string;
};

export type TechnicalVisibilityAudit = {
  requestedUrl: string;
  finalUrl: string;
  fetchedAt: string;
  score: number;
  verdict: string;
  priorities: string[];
  http: {
    status: number;
    contentType: string;
    redirects: number;
    responseTimeMs: number;
  };
  page: {
    title: string;
    description: string;
    language: string;
    canonical: string;
    h1Count: number;
    h1Texts: string[];
    bodyTextLength: number;
  };
  discoverability: {
    hasEmail: boolean;
    hasPhone: boolean;
    socialLinks: string[];
    mapLinks: string[];
    structuredDataTypes: string[];
    validStructuredDataBlocks: number;
  };
  images: {
    total: number;
    withoutAlt: number;
  };
  checks: TechnicalAuditCheck[];
};

const VISIBILITY_AUDIT_BASE_URL =
  import.meta.env.VITE_VISIBILITY_AUDIT_API_BASE_URL?.replace(/\/$/, "") ||
  (import.meta.env.DEV ? "http://127.0.0.1:5000" : API_BASE_URL);

export const runTechnicalVisibilityAudit = async (url: string) => {
  return publicRequest<{ audit: TechnicalVisibilityAudit }>(
    {
      method: "POST",
      url: `${VISIBILITY_AUDIT_BASE_URL}/api/visibility-audit/technical`,
      data: { url },
      timeout: 15_000,
    },
    "Impossible d'analyser ce site pour le moment."
  );
};
export type VisibilityInterpretation = {
  source: "openai" | "rules";
  headline: string;
  summary: string;
  strengths: string[];
  actions: Array<{
    title: string;
    why: string;
    priority: "high" | "medium" | "low";
  }>;
  caution: string;
};

export type VisibilityInterpretationInput = {
  locale: "fr" | "en" | "nl" | "kiny";
  finalScore: number;
  goal: string;
  company: string;
  city: string;
  languages: string;
  signals: {
    googleProfile: string;
    social: string;
    consistentInfo: string;
    reviews: string;
  };
  technical: null | {
    score: number;
    verdict: string;
    failedChecks: Array<{
      label: string;
      detail: string;
      priority: string;
      weight: number;
    }>;
    passedChecks: string[];
  };
};

export const runVisibilityAuditInterpretation = async (
  data: VisibilityInterpretationInput
) => {
  return publicRequest<{ interprétation: VisibilityInterpretation }>(
    {
      method: "POST",
      url: `${VISIBILITY_AUDIT_BASE_URL}/api/visibility-audit/interpret`,
      data,
      timeout: 20_000,
    },
    "Impossible de générer l'interprétation personnalisée."
  );
};