import PageLayout from "../components/layout/PageLayout";
import MarketSEOHead from "../components/SEO/MarketSEOHead";
import { seoConfig } from "../components/SEO/seoConfig";
import { getCurrentLocale } from "../data/marketRuntime";

type TermsCopy = { title: string; intro: string; updated: string; sections: Array<{ title: string; body: string[] }> };

const terms: Record<"fr" | "en" | "nl" | "kiny", TermsCopy> = {
  fr: {
    title: "Conditions du programme d’apporteurs de clients",
    intro: "Ces conditions définissent le programme par lequel une personne présente un nouveau client à Creativa Poeta et reçoit une récompense si cette présentation aboutit à un projet payé.",
    updated: "Version du 11 août 2026",
    sections: [
      { title: "1. Éligibilité", body: ["Le programme est accessible aux personnes âgées d’au moins 18 ans et aux organisations situées dans un pays où Creativa Poeta peut légalement opérer et effectuer un paiement.", "Une première présentation peut accompagner l’inscription, mais Creativa Poeta doit la valider avant qu’elle ouvre un droit à récompense."] },
      { title: "2. Présentation valide", body: ["Une présentation exige une relation réelle ou une introduction authentique avec le client potentiel. Les coordonnées publiques, achetées ou extraites d’Internet ne sont pas admissibles.", "Le client potentiel doit être nouveau pour Creativa Poeta, ne pas être déjà client et ne pas se trouver dans son suivi commercial actif."] },
      { title: "3. Autorisation de contact", body: ["L’apporteur doit avoir l’autorisation du client potentiel avant que Creativa Poeta le contacte, ou effectuer une introduction directe. Sans accord, la présentation reste en attente."] },
      { title: "4. Attribution", body: ["Lorsqu’une même entreprise est proposée plusieurs fois, Creativa Poeta retient la première introduction authentique acceptée, et non simplement le premier formulaire reçu.", "Creativa Poeta peut classer une présentation comme doublon, inéligible ou rejetée en conservant la justification dans son historique interne."] },
      { title: "5. Récompense standard", body: ["Pour un apporteur occasionnel, la récompense standard correspond à 10 % du revenu admissible effectivement encaissé par Creativa Poeta pour le premier projet du nouveau client, sans plafond fixe.", "Le revenu admissible exclut notamment la TVA, les remboursements, chargebacks, budgets publicitaires, licences, hébergement, matériel et dépenses reversées à des tiers."] },
      { title: "6. Paiement", body: ["La récompense n’est acquise qu’après validation de la présentation, signature du projet et encaissement effectif du montant admissible. Une annulation, un impayé ou un remboursement peut annuler ou réduire la récompense.", "L’apporteur doit fournir les informations légales, fiscales et de paiement nécessaires et reste responsable de ses obligations fiscales."] },
      { title: "7. Partenaires commerciaux", body: ["Les commissions, rôles, durées et éventuelles rémunérations récurrentes des partenaires commerciaux sont définis dans un accord séparé adapté à leur implication."] },
      { title: "8. Comportement interdit", body: ["Le spam, la collecte automatisée de contacts, les fausses identités, les déclarations trompeuses et toute promesse faite au nom de Creativa Poeta sont interdits.", "L’apporteur n’est ni salarié, ni agent, ni représentant légal de Creativa Poeta et ne peut engager l’entreprise envers un tiers."] },
      { title: "9. Données et confidentialité", body: ["Seules les données nécessaires à la validation et au suivi de la présentation doivent être transmises. Elles sont traitées conformément à la politique de confidentialité de Creativa Poeta."] },
      { title: "10. Suspension et évolution", body: ["Creativa Poeta peut suspendre ou clôturer un compte en cas d’abus, fraude, risque légal ou violation des présentes conditions. La version applicable à chaque présentation est conservée."] },
    ],
  },
  en: {
    title: "Client Introduction Program Terms", intro: "These terms govern the program through which someone introduces a new client to Creativa Poeta and receives a reward if the introduction becomes a paid project.", updated: "Version dated 11 August 2026",
    sections: [
      { title: "1. Eligibility", body: ["The program is available to people aged 18 or over and organisations in countries where Creativa Poeta can legally operate and make payments.", "A first client introduction may accompany registration, but Creativa Poeta must validate it before any reward becomes due."] },
      { title: "2. Valid introduction", body: ["A real relationship or genuine introduction to the potential client is required. Public, purchased or scraped contact details are not eligible.", "The potential client must be new to Creativa Poeta, not an existing client and not already in active sales follow-up."] },
      { title: "3. Permission", body: ["The introducer must have permission before Creativa Poeta contacts the potential client, or make a direct introduction. Without permission, the introduction remains waiting."] },
      { title: "4. Attribution", body: ["If the same business is submitted more than once, Creativa Poeta considers the first genuine introduction it accepts, not simply the first form received.", "Creativa Poeta may mark an introduction as duplicate, ineligible or rejected while keeping the reason internally."] },
      { title: "5. Standard reward", body: ["For an occasional introducer, the standard reward is 10% of eligible revenue actually collected by Creativa Poeta for the new client's first project, with no fixed cap.", "Eligible revenue excludes VAT, refunds, chargebacks, advertising budgets, licences, hosting, hardware and pass-through third-party costs."] },
      { title: "6. Payment", body: ["A reward is earned only after the introduction is validated, the project is signed and Creativa Poeta has collected the eligible amount. Cancellation, non-payment or a refund can cancel or reduce the reward.", "The introducer must provide the legal, tax and payment information required and remains responsible for their tax obligations."] },
      { title: "7. Commercial partners", body: ["Commercial partner commissions, roles, duration and any recurring compensation are defined in a separate agreement based on their involvement."] },
      { title: "8. Prohibited conduct", body: ["Spam, automated contact collection, false identities, misleading statements and promises made on behalf of Creativa Poeta are prohibited.", "An introducer is not an employee, agent or legal representative of Creativa Poeta and cannot bind the company to a third party."] },
      { title: "9. Data and confidentiality", body: ["Only data necessary to validate and manage the introduction should be shared. It is processed under Creativa Poeta's privacy policy."] },
      { title: "10. Suspension and changes", body: ["Creativa Poeta may suspend or close an account in cases of abuse, fraud, legal risk or breach of these terms. The version attached to each introduction is retained."] },
    ],
  },
  nl: {
    title: "Voorwaarden programma voor klantenaanbrengers", intro: "Deze voorwaarden regelen het programma waarmee iemand een nieuwe klant aan Creativa Poeta voorstelt en een beloning ontvangt als daaruit een betaald project ontstaat.", updated: "Versie van 11 augustus 2026",
    sections: [
      { title: "1. Toelating", body: ["Het programma is beschikbaar voor personen vanaf 18 jaar en organisaties in landen waar Creativa Poeta wettelijk kan werken en betalen.", "Een eerste introductie mag samen met de registratie worden verstuurd, maar moet worden gevalideerd voordat een beloning ontstaat."] },
      { title: "2. Geldige introductie", body: ["Een echte relatie of authentieke introductie is vereist. Openbare, gekochte of automatisch verzamelde contactgegevens zijn niet geldig.", "De potentiële klant moet nieuw zijn voor Creativa Poeta en mag geen bestaande klant of actief verkoopcontact zijn."] },
      { title: "3. Toestemming", body: ["De aanbrenger heeft toestemming nodig voordat Creativa Poeta contact opneemt, of maakt een directe introductie. Zonder toestemming blijft de introductie in afwachting."] },
      { title: "4. Toewijzing", body: ["Bij meerdere inzendingen geldt de eerste authentieke introductie die Creativa Poeta aanvaardt, niet enkel het eerste formulier.", "Creativa Poeta kan een introductie als dubbel, ongeldig of geweigerd markeren en bewaart intern de reden."] },
      { title: "5. Standaardbeloning", body: ["De standaardbeloning is 10% van de werkelijk ontvangen in aanmerking komende omzet van het eerste project, zonder vaste limiet.", "Btw, terugbetalingen, chargebacks, advertentiebudgetten, licenties, hosting, materiaal en doorgerekende kosten zijn uitgesloten."] },
      { title: "6. Betaling", body: ["De beloning ontstaat pas na validatie, ondertekening en werkelijke ontvangst door Creativa Poeta. Annulering, wanbetaling of terugbetaling kan de beloning verminderen of annuleren.", "De aanbrenger verstrekt de nodige juridische, fiscale en betalingsgegevens en blijft verantwoordelijk voor eigen fiscale verplichtingen."] },
      { title: "7. Business Partners", body: ["Commissies en terugkerende vergoedingen voor Business Partners staan in een aparte overeenkomst."] },
      { title: "8. Verboden gedrag", body: ["Spam, automatische contactverzameling, valse identiteiten, misleiding en beloften namens Creativa Poeta zijn verboden.", "De aanbrenger is geen werknemer, agent of wettelijke vertegenwoordiger van Creativa Poeta."] },
      { title: "9. Gegevens", body: ["Deel alleen gegevens die noodzakelijk zijn voor validatie en opvolging. De privacyverklaring van Creativa Poeta is van toepassing."] },
      { title: "10. Opschorting en wijzigingen", body: ["Creativa Poeta kan accounts opschorten bij misbruik, fraude, juridisch risico of schending. De toepasselijke versie wordt per introductie bewaard."] },
    ],
  },
  kiny: {
    title: "Amategeko ya porogaramu yo kumenyekanisha abakiliya", intro: "Aya mategeko agenga uburyo umuntu amenyekanisha umukiliya mushya kuri Creativa Poeta maze agahabwa igihembo iyo habonetse project yishyuwe.", updated: "Version yo ku wa 11 Kanama 2026",
    sections: [
      { title: "1. Eligibility", body: ["Porogaramu yemera abantu bafite nibura imyaka 18 n’organisations zo mu bihugu Creativa Poeta ishobora gukoreramo no kwishyuramo byemewe n’amategeko.", "Introduction ya mbere ishobora koherezwa hamwe no kwiyandikisha, ariko ibanza kwemezwa mbere y’igihembo."] },
      { title: "2. Introduction yemewe", body: ["Hakenewe relationship cyangwa introduction nyayo. Public contacts, lists zaguzwe cyangwa zakusanyijwe na robots ntibyemewe.", "Umukiliya agomba kuba mushya kuri Creativa Poeta kandi atari mu biganiro by’ubucuruzi bisanzwe bihari."] },
      { title: "3. Uruhushya", body: ["Uwatanze introduction agomba kuba afite uruhushya mbere y’uko Creativa Poeta ivugisha umukiliya, cyangwa agakora direct introduction. Idafite uruhushya iguma waiting."] },
      { title: "4. Attribution", body: ["Iyo business yoherejwe n’abantu benshi, Creativa Poeta yemera genuine introduction yabanje kwemezwa, si form yabanje gusa.", "Creativa Poeta ishobora gushyira introduction kuri duplicate, ineligible cyangwa rejected kandi ikabika impamvu."] },
      { title: "5. Igihembo gisanzwe", body: ["Igihembo ni 10% by’eligible revenue Creativa Poeta yakiriye kuri project ya mbere y’umukiliya mushya, nta cap ihamye.", "VAT, refunds, chargebacks, advertising budgets, licences, hosting, hardware n’amafaranga ahabwa abandi ntibibarwa."] },
      { title: "6. Payment", body: ["Igihembo kiboneka introduction imaze kwemezwa, project yasinywe kandi Creativa Poeta yakiriye eligible amount. Cancellation, kutishyura cyangwa refund bishobora kuyigabanya cyangwa kuyikuraho.", "Uwatanze introduction atanga legal, tax na payment information ikenewe kandi ni we ushinzwe tax obligations ze."] },
      { title: "7. Business Partners", body: ["Business Partner commissions n’amategeko yo gukorana kenshi bishyirwa mu masezerano yihariye."] },
      { title: "8. Ibibujijwe", body: ["Spam, scraping, false identities, misleading statements no gusezeranya mu izina rya Creativa Poeta birabujijwe.", "Uwatanze introduction ntabwo ari employee, agent cyangwa legal representative wa Creativa Poeta."] },
      { title: "9. Data", body: ["Hatangwa gusa data ikenewe mu gusuzuma no gukurikirana introduction, hakurikijwe privacy policy ya Creativa Poeta."] },
      { title: "10. Suspension n’impinduka", body: ["Creativa Poeta ishobora guhagarika account kubera abuse, fraud, legal risk cyangwa kurenga aya mategeko. Version ya buri introduction irabikwa."] },
    ],
  },
};

export default function ReferralProgramTermsPage() {
  const locale = getCurrentLocale();
  const copy = terms[locale] ?? terms.fr;
  return <PageLayout className="text-white">
    <MarketSEOHead {...seoConfig.referralTerms} path="/referral-program-terms" />
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(5,12,22,.35),rgba(5,12,22,.82))] px-4 pb-16 pt-28 md:px-8">
      <article className="mx-auto max-w-4xl"><p className="text-xs font-black uppercase tracking-[.18em] text-[#EEBA2B]">Creativa Poeta</p><h1 className="mt-3 text-3xl font-black sm:text-5xl">{copy.title}</h1><p className="mt-4 text-base font-semibold leading-relaxed text-slate-200">{copy.intro}</p><p className="mt-2 text-sm font-black text-[#EEBA2B]">{copy.updated}</p>
        <div className="mt-8 space-y-4">{copy.sections.map((section) => <section key={section.title} className="rounded-xl border border-white/15 bg-black/25 p-4 backdrop-blur sm:p-6"><h2 className="text-xl font-black">{section.title}</h2>{section.body.map((paragraph) => <p key={paragraph} className="mt-3 text-sm font-semibold leading-relaxed text-slate-300 sm:text-base">{paragraph}</p>)}</section>)}</div>
      </article>
    </main>
  </PageLayout>;
}
