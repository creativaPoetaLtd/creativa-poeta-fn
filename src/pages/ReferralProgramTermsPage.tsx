import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { seoConfig } from "../components/SEO/seoConfig";
import { getCurrentLocale } from "../data/marketRuntime";

type TermsCopy = { title: string; intro: string; updated: string; sections: Array<{ title: string; body: string[] }> };

const terms: Record<"fr" | "en" | "nl" | "kiny", TermsCopy> = {
  fr: {
    title: "Conditions du Referral Partner Program",
    intro: "Ces conditions définissent les règles du Creativa Poeta Referral Partner Program (CPRPP). Elles privilégient des introductions authentiques, une attribution équitable et une rémunération transparente.",
    updated: "Version du 10 août 2026",
    sections: [
      { title: "1. Éligibilité", body: ["Le programme est accessible aux personnes âgées d’au moins 18 ans et aux organisations situées dans un pays où CP peut légalement opérer et effectuer un paiement.", "Une candidature doit être approuvée par CP avant de pouvoir soumettre un referral éligible."] },
      { title: "2. Referral valide", body: ["Un referral exige une relation réelle ou une introduction authentique avec le prospect. La soumission de coordonnées publiques, achetées ou extraites d’Internet n’est pas admissible.", "Le prospect doit être nouveau pour CP, ne pas être déjà client et ne pas se trouver dans le pipeline commercial de CP."] },
      { title: "3. Consentement du prospect", body: ["Le partenaire doit avoir l’autorisation du prospect avant que CP le contacte, ou effectuer une introduction directe. Un referral sans accord reste en attente et ne réserve pas automatiquement le prospect."] },
      { title: "4. Attribution", body: ["Lorsqu’un même prospect est proposé plusieurs fois, CP retient la première introduction authentique acceptée, et non simplement le premier formulaire reçu.", "CP peut classer un referral comme doublon, inéligible ou rejeté en conservant la justification dans son historique interne."] },
      { title: "5. Récompense standard", body: ["Pour un Referral Partner, la récompense standard correspond à 10 % du revenu admissible effectivement encaissé par CP pour le premier projet du nouveau client, avec un plafond total de 200 € par client.", "Le revenu admissible exclut notamment la TVA, les remboursements, chargebacks, budgets publicitaires, licences, hébergement, matériel et dépenses reversées à des tiers."] },
      { title: "6. Paiement", body: ["La récompense n’est acquise qu’après validation du referral, signature du projet et encaissement effectif du montant admissible. Une annulation, un impayé ou un remboursement peut annuler ou réduire la récompense.", "Le partenaire doit fournir les informations légales, fiscales et de paiement nécessaires. Il reste responsable de ses déclarations et obligations fiscales."] },
      { title: "7. Business Partners", body: ["Les commissions, rôles, durées et éventuelles rémunérations récurrentes des Business Partners sont définis dans un accord séparé. Les conditions standard de 10 % et du plafond de 200 € ne s’appliquent que si cet accord le prévoit."] },
      { title: "8. Comportement interdit", body: ["Le spam, le scraping, les fausses identités, les déclarations trompeuses, les enchères publicitaires sur la marque CP et toute promesse faite au nom de CP sont interdits.", "Le partenaire n’est ni salarié, ni agent, ni représentant légal de Creativa Poeta et ne peut engager CP envers un tiers."] },
      { title: "9. Données et confidentialité", body: ["Seules les données nécessaires à la validation et au suivi du referral doivent être transmises. Elles sont traitées conformément à la politique de confidentialité de CP."] },
      { title: "10. Suspension et évolution", body: ["CP peut suspendre ou clôturer un compte en cas d’abus, fraude, risque légal ou violation des présentes conditions. Les changements futurs s’appliquent prospectivement et la version applicable à un referral est conservée."] },
    ],
  },
  en: {
    title: "Referral Partner Program Terms", intro: "These terms govern the Creativa Poeta Referral Partner Program (CPRPP). They are designed around genuine introductions, fair attribution and transparent rewards.", updated: "Version dated 10 August 2026",
    sections: [
      { title: "1. Eligibility", body: ["The program is available to people aged 18 or over and organisations in countries where CP can legally operate and make payments.", "An application must be approved by CP before an eligible referral can be submitted."] },
      { title: "2. Valid referral", body: ["A referral requires a real relationship or genuine introduction to the prospect. Public, purchased or scraped contact details are not eligible.", "The prospect must be new to CP, not an existing client and not already in CP's sales pipeline."] },
      { title: "3. Prospect permission", body: ["The partner must have the prospect's permission before CP contacts them, or make a direct introduction. A referral without permission remains waiting and does not automatically reserve the prospect."] },
      { title: "4. Attribution", body: ["If the same prospect is submitted more than once, CP considers the first genuine introduction it accepts, not simply the first form received.", "CP may mark a referral as duplicate, ineligible or rejected while keeping the reason in its internal audit trail."] },
      { title: "5. Standard reward", body: ["For a Referral Partner, the standard reward is 10% of eligible revenue actually collected by CP for the new client's first project, capped at €200 in total per client.", "Eligible revenue excludes VAT, refunds, chargebacks, advertising budgets, licences, hosting, hardware and pass-through third-party costs."] },
      { title: "6. Payment", body: ["A reward is earned only after the referral is validated, the project is signed and CP has collected the eligible amount. Cancellation, non-payment or a refund can cancel or reduce the reward.", "The partner must provide the legal, tax and payment information required for payment and remains responsible for their own declarations and tax obligations."] },
      { title: "7. Business Partners", body: ["Business Partner commissions, roles, duration and any recurring compensation are defined in a separate agreement. The standard 10% rate and €200 cap apply only if that agreement says so."] },
      { title: "8. Prohibited conduct", body: ["Spam, scraping, false identities, misleading statements, bidding on CP brand terms and making promises on CP's behalf are prohibited.", "The partner is not an employee, agent or legal representative of Creativa Poeta and cannot bind CP to any third party."] },
      { title: "9. Data and confidentiality", body: ["Only data necessary to validate and manage the referral should be shared. It is processed under CP's privacy policy."] },
      { title: "10. Suspension and changes", body: ["CP may suspend or close an account in cases of abuse, fraud, legal risk or breach of these terms. Future changes apply prospectively and the version attached to each referral is retained."] },
    ],
  },
  nl: {
    title: "Voorwaarden Referral Partner Program", intro: "Deze voorwaarden regelen het Creativa Poeta Referral Partner Program (CPRPP), met authentieke introducties, eerlijke toewijzing en transparante beloningen.", updated: "Versie van 10 augustus 2026",
    sections: [
      { title: "1. Toelating", body: ["Het programma is beschikbaar voor personen vanaf 18 jaar en organisaties in landen waar CP wettelijk kan werken en betalen.", "CP moet een aanvraag goedkeuren voordat een geldige referral kan worden ingediend."] },
      { title: "2. Geldige referral", body: ["Een echte relatie of authentieke introductie is vereist. Openbare, gekochte of gescrapete contactgegevens zijn niet geldig.", "De prospect moet nieuw zijn voor CP en mag geen bestaande klant of bestaand salescontact zijn."] },
      { title: "3. Toestemming", body: ["De partner heeft toestemming van de prospect nodig voordat CP contact opneemt, of maakt een directe introductie. Zonder toestemming blijft de referral in afwachting."] },
      { title: "4. Toewijzing", body: ["Bij meerdere inzendingen geldt de eerste authentieke introductie die CP aanvaardt, niet enkel het eerste formulier.", "CP kan een referral als dubbel, ongeldig of geweigerd markeren en bewaart intern de reden."] },
      { title: "5. Standaardbeloning", body: ["De standaardbeloning is 10% van de werkelijk ontvangen in aanmerking komende omzet van het eerste project, met maximaal €200 per nieuwe klant.", "Btw, terugbetalingen, chargebacks, advertentiebudgetten, licenties, hosting, materiaal en doorgerekende kosten zijn uitgesloten."] },
      { title: "6. Betaling", body: ["De beloning ontstaat pas na validatie, ondertekening en werkelijke ontvangst door CP. Annulering, wanbetaling of terugbetaling kan de beloning verminderen of annuleren.", "De partner verstrekt de nodige juridische, fiscale en betalingsgegevens en blijft verantwoordelijk voor eigen fiscale verplichtingen."] },
      { title: "7. Business Partners", body: ["Commissies en terugkerende vergoedingen voor Business Partners staan in een aparte overeenkomst."] },
      { title: "8. Verboden gedrag", body: ["Spam, scraping, valse identiteiten, misleiding en beloften namens CP zijn verboden.", "De partner is geen werknemer, agent of wettelijke vertegenwoordiger van CP."] },
      { title: "9. Gegevens", body: ["Deel alleen gegevens die noodzakelijk zijn voor de validatie en opvolging van de referral. De privacyverklaring van CP is van toepassing."] },
      { title: "10. Opschorting en wijzigingen", body: ["CP kan accounts opschorten bij misbruik, fraude, juridisch risico of schending. Latere wijzigingen gelden voor de toekomst en de toepasselijke versie wordt per referral bewaard."] },
    ],
  },
  kiny: {
    title: "Referral Partner Program Terms", intro: "Aya mategeko agenga Creativa Poeta Referral Partner Program (CPRPP), kugira ngo introductions zibe nyazo, attribution ibe fair kandi rewards zisobanuke.", updated: "Version yo ku wa 10 Kanama 2026",
    sections: [
      { title: "1. Eligibility", body: ["Program yemera abantu bafite nibura imyaka 18 n’organisations zo mu bihugu CP ishobora gukoreramo no kwishyuramo byemewe n’amategeko.", "CP igomba kubanza kwemeza application mbere ya referral eligible."] },
      { title: "2. Referral yemewe", body: ["Referral ikenera relationship cyangwa introduction nyayo. Public contacts, lists zaguzwe cyangwa zascrapwe ntibyemewe.", "Prospect igomba kuba nshya kuri CP, itari client kandi itari muri sales pipeline ya CP."] },
      { title: "3. Uruhushya rwa prospect", body: ["Partner agomba kuba afite uruhushya mbere y’uko CP ivugisha prospect, cyangwa agakora direct introduction. Referral idafite uruhushya iguma waiting."] },
      { title: "4. Attribution", body: ["Iyo prospect yoherejwe n’abantu benshi, CP yemera genuine introduction yabanje kwemezwa, si form yabanje gusa.", "CP ishobora gushyira referral kuri duplicate, ineligible cyangwa rejected kandi ikabika impamvu."] },
      { title: "5. Reward isanzwe", body: ["Reward ni 10% by’eligible revenue CP yakiriye kuri project ya mbere ya client mushya, ntirenge €200 kuri client.", "VAT, refunds, chargebacks, advertising budgets, licences, hosting, hardware n’amafaranga ahabwa abandi ntibibarwa."] },
      { title: "6. Payment", body: ["Reward iboneka referral imaze kwemezwa, project yasinywe kandi CP yakiriye eligible amount. Cancellation, kutishyura cyangwa refund bishobora kuyigabanya cyangwa kuyikuraho.", "Partner atanga legal, tax na payment information ikenewe kandi ni we ushinzwe tax obligations ze."] },
      { title: "7. Business Partners", body: ["Business Partner commissions n’amategeko yo gukorana kenshi bishyirwa mu masezerano yihariye."] },
      { title: "8. Ibibujijwe", body: ["Spam, scraping, false identities, misleading statements no gusezeranya mu izina rya CP birabujijwe.", "Partner ntabwo ari employee, agent cyangwa legal representative wa CP."] },
      { title: "9. Data", body: ["Hatangwa gusa data ikenewe mu gusuzuma no gukurikirana referral, hakurikijwe privacy policy ya CP."] },
      { title: "10. Suspension n’impinduka", body: ["CP ishobora guhagarika account kubera abuse, fraud, legal risk cyangwa kurenga aya mategeko. Future changes zikurikizwa ku referrals nshya kandi version ya buri referral irabikwa."] },
    ],
  },
};

export default function ReferralProgramTermsPage() {
  const locale = getCurrentLocale();
  const copy = terms[locale] ?? terms.fr;
  return <PageLayout className="text-white">
    <MarketSEOHead {...seoConfig.referralTerms} path="/referral-program-terms" />
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(5,12,22,.35),rgba(5,12,22,.82))] px-4 pb-16 pt-28 md:px-8">
      <article className="mx-auto max-w-4xl"><p className="text-xs font-black uppercase tracking-[.18em] text-[#EEBA2B]">CPRPP</p><h1 className="mt-3 text-3xl font-black sm:text-5xl">{copy.title}</h1><p className="mt-4 text-base font-semibold leading-relaxed text-slate-200">{copy.intro}</p><p className="mt-2 text-sm font-black text-[#EEBA2B]">{copy.updated}</p>
        <div className="mt-8 space-y-4">{copy.sections.map((section) => <section key={section.title} className="rounded-xl border border-white/15 bg-black/25 p-4 backdrop-blur sm:p-6"><h2 className="text-xl font-black">{section.title}</h2>{section.body.map((paragraph) => <p key={paragraph} className="mt-3 text-sm font-semibold leading-relaxed text-slate-300 sm:text-base">{paragraph}</p>)}</section>)}</div>
      </article>
    </main>
  </PageLayout>;
}
