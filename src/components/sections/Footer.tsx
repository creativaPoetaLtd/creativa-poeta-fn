// import { useTranslation } from 'react-i18next';
import logopoeta1 from '../../assets/flags/logopoeta1.png';
import Cont from '../unUsedComponents/Cont';
// import { SetStateAction, useState } from 'react';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
import FooterLocale from '../../i18n/FooterLocale';
import { Link } from 'react-router-dom';
import {
  buildLocalLocalePath,
  getCurrentLocale,
  getCurrentMarket,
} from '../../data/marketRuntime';

function Footer() {
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const footerCopy = FooterLocale[locale] ?? FooterLocale.fr;
  const homePath = buildLocalLocalePath(market, locale, "/");
  const linkPath = (path: string) => buildLocalLocalePath(market, locale, path);
  const assistanceLabel =
    locale === "nl"
      ? "Digitale hulp aanvragen"
      : locale === "en"
      ? "Request digital assistance"
      : locale === "kiny"
      ? "Saba assistance numérique"
      : "Demander une assistance numérique";
  const answersLabel =
    locale === "nl"
      ? "Nuttige antwoorden"
      : locale === "en"
      ? "Useful answers"
      : locale === "kiny"
      ? "Useful answers"
      : "Réponses utiles";

  const knowledgeLabel =
    locale === "nl"
      ? "Kennisbank zichtbaarheid"
      : locale === "en"
      ? "Knowledge base"
      : locale === "kiny"
      ? "Knowledge base"
      : "Glossaire visibilité";

  const blogLabel =
    locale === "nl"
      ? "Advies & bronnen"
      : locale === "en"
      ? "Advice & resources"
      : locale === "kiny"
      ? "Inama & resources"
      : "Journal & conseils";
  const careerLabel =
    locale === "nl"
      ? "Carrière & kansen"
      : locale === "en"
      ? "Careers & opportunities"
      : locale === "kiny"
      ? "Career & opportunities"
      : "Carrières & opportunités";
  const impactLabel = "Creativa Poeta Impact";
  const resourcesTitle =
    locale === "nl"
      ? "Ontdek Creativa Poeta"
      : locale === "en"
      ? "Explore Creativa Poeta"
      : locale === "kiny"
      ? "Menya Creativa Poeta"
      : "Explorer Creativa Poeta";
  const skillLinks = [
    { label: footerCopy.competence1, path: "/services/site-officiel" },
    { label: footerCopy.competence2, path: "/services/site-officiel" },
    { label: footerCopy.competence3, path: "/services/site-officiel" },
    { label: footerCopy.competence14, path: "/services/site-officiel" },
    { label: footerCopy.competence15, path: "/services/site-officiel" },
    { label: footerCopy.competence16, path: "/services/site-officiel" },
    { label: footerCopy.competence23, path: "/services/visibilite-locale" },
    { label: footerCopy.competence4, path: "/services/content-writing" },
    { label: footerCopy.competence6, path: "/services/visibilite-locale" },
    { label: footerCopy.competence7, path: "/services/visibilite-locale" },
    { label: footerCopy.competence8, path: "/services/visibilite-locale" },
    { label: footerCopy.competence9, path: "/services/graphic-design" },
    { label: footerCopy.competence10, path: "/services/content-writing" },
    { label: footerCopy.competence11, path: "/services/visibilite-locale" },
    { label: footerCopy.competence12, path: "/services/visibilite-locale" },
    { label: footerCopy.competence13, path: "/services/ia-automatisation" },
    { label: footerCopy.competence17, path: "/services/ia-automatisation" },
    { label: footerCopy.competence18, path: "/services/graphic-design" },
    { label: footerCopy.competence19, path: "/services/graphic-design" },
    { label: footerCopy.competence20, path: "/services/graphic-design" },
  ];
  const resourceLinks = [
    { label: impactLabel, path: "/impact" },
    { label: careerLabel, path: "/career" },
    { label: blogLabel, path: "/blogs" },
    { label: knowledgeLabel, path: "/knowledge" },
    { label: answersLabel, path: "/answers" },
    { label: footerCopy.competence5, path: "/answers", hash: "#q-1" },
    { label: assistanceLabel, path: "/demander-assistance-numerique" },
  ];
  const referralFooter = locale === "nl"
    ? { title: "Klanten voorstellen & samenwerken", intro: "Uw netwerk kan bedrijven verbinden met de digitale diensten die ze nodig hebben.", overview: "Hoe het werkt", guide: "Praktische gids", join: "Deelnemen", submit: "Een klant voorstellen", business: "Commerciële partners", strategic: "Samenwerking op maat", terms: "Programmavoorwaarden" }
    : locale === "en"
    ? { title: "Client introductions & partnerships", intro: "Your network can connect businesses with the digital services they need.", overview: "How it works", guide: "Practical guide", join: "Join the program", submit: "Introduce a client", business: "Commercial partners", strategic: "Tailored collaboration", terms: "Program terms" }
    : locale === "kiny"
    ? { title: "Kumenyekanisha abakiliya & partnerships", intro: "Network yawe ishobora guhuza businesses na digital services zikeneye.", overview: "Uko ikora", guide: "Guide ifatika", join: "Injira muri porogaramu", submit: "Menyekanisha umukiliya", business: "Abafatanyabikorwa b’ubucuruzi", strategic: "Ubufatanye bwihariye", terms: "Amategeko ya porogaramu" }
    : { title: "Apporteurs de clients & partenariats", intro: "Votre réseau peut connecter les entreprises aux services numériques dont elles ont besoin.", overview: "Comment ça marche", guide: "Guide pratique", join: "Rejoindre le programme", submit: "Présenter un client", business: "Partenaires commerciaux", strategic: "Collaboration sur mesure", terms: "Conditions du programme" };
  const impactFooter = locale === "nl"
    ? { title: "Creativa Poeta Impact", intro: "Digitale expertise voor verenigingen, ngo's, collectieven en projecten die een positief verschil maken.", overview: "Overzicht", how: "Hoe werkt het", conditions: "Voorwaarden", apply: "Een project voorstellen", support: "Het programma steunen" }
    : locale === "en"
    ? { title: "Creativa Poeta Impact", intro: "Digital expertise for charities, NGOs, community groups and projects creating positive change.", overview: "Overview", how: "How it works", conditions: "Conditions", apply: "Present a project", support: "Support the program" }
    : locale === "kiny"
    ? { title: "Creativa Poeta Impact", intro: "Digital expertise ku mashyirahamwe n'imishinga ifitiye abantu akamaro.", overview: "Overview", how: "Uko ikora", conditions: "Conditions", apply: "Tanga project", support: "Shyigikira program" }
    : { title: "Creativa Poeta Impact", intro: "Nos compétences numériques au service des associations, ONG, collectifs et projets qui changent les choses.", overview: "Aperçu", how: "Comment ça marche", conditions: "Conditions", apply: "Présenter un projet", support: "Soutenir le programme" };
  // const { t } = useTranslation();
  // const today = new Date();
  // const[isLoading, setIsLoading] = useState(false);
  // const [email, setEmail] = useState('');
 
  // const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
  //   setEmail(e.target.value);
  // };

  // const handleSubmit = async (e: { preventDefault: () => void; }) => {
  //   setIsLoading(true);
  //   e.preventDefault();7
  //  const res = await fetch('https://blue-angry-gorilla.cyclic.app/subscribe', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ email: email })
  //   });

  //   const data = await res.json();

  //   if(data.error){
  //     toast.error(data.error, {
  //       theme: 'colored'
  //     }
  //       );
  //     setIsLoading(false);
  //     return; 
  //   }
  //   setIsLoading(false);
  //   setShowPopUp(true)
  //   setEmail('');
    
  // };
  return (
    <footer id="footer" className="foote py-12 backdrop-blur-lg blur-none  laptop:px-32 desktop:px-32 tablet:px-24 px-4 bg-slate-900 text-white bottom-0 w-full h-fit flex flex-col">
      <div className="laptop:flex-row  desktop:flex-row tablet:flex-col flex-col flex  items-center w-full">
        <div className="flex flex-col laptop:w-[63%] desktop:w-[63%] tablet:w-full w-full h-fit ">
          <h1 className='logo text-4xl text-[#EEBA2B] flex laptop:mx-0 tablet:mx-0 laptop:justify-start tablet:justify-start text-left laptop:items-start tablet:items-start float-left justify-start items-start'>
          <Link
            to={homePath}
            aria-label="Retour à l’accueil Creativa Poeta"
            className="block laptop:w-[30%] tablet:w-[40%] desktop:w-[30%] w-[50%]"
          >
            <img src={logopoeta1} alt="Creativa Poeta" className="h-auto w-full"/>
          </Link>
          </h1>
          <p className='mt-3 flex items-start justify-start pr-7 text-start text-slate-400'>
            {footerCopy.desc}
          </p>
          <div className="mt-6 grid w-full items-start gap-7 pr-1 md:grid-cols-[minmax(0,1.35fr)_minmax(12rem,.65fr)] md:pr-6">
            <section aria-labelledby="footer-skills-title">
              <h2 id="footer-skills-title" className="text-xl font-bold text-[#EEBA2B]">{footerCopy.key}</h2>
              <div className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                {skillLinks.map((item) => (
                  <Link key={`${item.path}-${item.label}`} to={`${linkPath(item.path)}${"hash" in item ? item.hash : ""}`} className="py-0.5 text-sm leading-relaxed text-slate-400 transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
            <section aria-labelledby="footer-resources-title" className="border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <h2 id="footer-resources-title" className="text-xl font-bold text-[#EEBA2B]">{resourcesTitle}</h2>
              <div className="mt-3 flex flex-col gap-1">
                {resourceLinks.map((item) => (
                  <Link key={`${item.path}-${item.label}`} to={linkPath(item.path)} className="py-0.5 text-sm leading-relaxed text-slate-400 transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className='mt-6 flex h-fit w-full flex-col items-start justify-start border-t border-white/10 pt-5'>
            <p className='flex items-start justify-start pr-7 text-slate-400'>{footerCopy.competence21}</p>
            <p className='mt-5 flex items-start justify-start font-bold text-white'>{footerCopy.competence22}</p>
          </div>
        </div>
        <div className="flex flex-col laptop:w-[37%] desktop:w-[37%] b w-full h-fit ">
          <Cont />
        {/* <h1 className='flex justify-start text-left items-start float-left font-bold text-xl mt-5 desktop:mt-0 laptop:mt-0'>
        Get Notified
          </h1>
          <p className='flex justify-start text-left items-start float-left mt-3 text-slate-400'>
          Quia quo qui sed odit. Quaerat voluptas autem necessitatibus vitae aut non alias sed quia. Ut itaque enim optio ut excepturi deserunt iusto porro.
          </p>
          <form onSubmit={handleSubmit} className='flex justify-start items-start float-left space-x-6 mt-4'>
      <input
        type="email"
        placeholder='Entrer votre email'
        value={email}
        onChange={handleEmailChange}
        className='w-full h-10 px-3 bg-black rounded-md'
      />
      <button type='submit' className='w-fit laptop:px-10 desktop:px-10 tablet:px-8 px-2 h-10 bg-[#EEBA2B] text-white font-semibold rounded-md'> {!isLoading ? "s'abonner": 'attendez...'} </button>
    </form> */}
        </div>
      {/* </div> */}
      {/* <div className='flex w-full bg-white h-[1px] mt-5'></div>
      <div className="grid laptop:grid-cols-5 desktop:grid-cols-5 tablet:grid-cols-3 grid-cols-2  mt-5 justify-center items-center basis-full text-slate-400">
          <a href='' className='text-xs font-bold'>Clause de non-responsabilité</a>
          <a href='' className='text-xs font-bold'>Politique de confidentialité</a>
          <a href='' className='text-xs font-bold'>Mentions légales </a>
          <Link to='/terms-and-conditions' className='text-xs font-bold'>Conditions générales  </Link>
          <a href='' className='text-xs font-bold'>Cookes policy</a>
        </div>
        <div className="flex laptop:flex-row desktop:flex-row tablet:flex-row flex-col  space-x-10 mt-16 justify-center items-center basis-full text-slate-400">
          <p>
            {t('copylights')} &copy; {today.getFullYear()} CREATIVA POETA
          </p>
          <a href='' className='text-xs font-bold'>all rights reserved</a>
        </div>
        <div className='powerdby flex flex-row justify-center items-center mt-3'>
          <p className='text-xs font-bold text-slate-400'>powered by</p>
          <a href="https://fabcode67.github.io/my-brand-fabrice" target="_blank" rel="noreferrer text-slate-400">
           <p className='text-xs ml-2 text-gray-300'>fabrice.mwanafunzi@karisimbitech.rw</p>
          </a>
          </div> */}
          </div>
          <section className="mt-10 w-full border-t border-white/15 pt-7">
            <div className="grid gap-5 rounded-2xl border border-[#6686ff]/40 bg-[#172038] p-5 md:grid-cols-[1fr_2fr] md:p-7">
              <div>
                <p className="text-xl font-black text-white">{impactFooter.title}</p>
                <p className="mt-2 max-w-md text-sm font-semibold leading-relaxed text-slate-300">{impactFooter.intro}</p>
                <Link to={linkPath("/impact/candidature")} className="mt-4 inline-flex min-h-[42px] items-center rounded-full bg-[#b8ef45] px-5 text-sm font-black text-[#172038] transition hover:bg-white">{impactFooter.apply}</Link>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm font-bold sm:grid-cols-3">
                <Link className="rounded-lg border border-white/10 p-3 text-slate-200 hover:border-[#6686ff] hover:text-white" to={linkPath("/impact")}>{impactFooter.overview}</Link>
                <Link className="rounded-lg border border-white/10 p-3 text-slate-200 hover:border-[#6686ff] hover:text-white" to={linkPath("/impact/comment-ca-marche")}>{impactFooter.how}</Link>
                <Link className="rounded-lg border border-white/10 p-3 text-slate-200 hover:border-[#6686ff] hover:text-white" to={linkPath("/impact/conditions")}>{impactFooter.conditions}</Link>
                <Link className="rounded-lg border border-white/10 p-3 text-slate-200 hover:border-[#6686ff] hover:text-white" to={linkPath("/impact/candidature")}>{impactFooter.apply}</Link>
                <a className="rounded-lg border border-white/10 p-3 text-slate-200 hover:border-[#b8ef45] hover:text-white" href="mailto:contact@creativapoeta.com?subject=Soutenir%20Creativa%20Poeta%20Impact">{impactFooter.support}</a>
              </div>
            </div>
          </section>
          <section className="mt-10 w-full border-t border-white/15 pt-7">
            <div className="grid gap-5 rounded-2xl border border-[#EEBA2B]/25 bg-black/20 p-5 backdrop-blur-sm md:grid-cols-[1fr_2fr] md:p-7">
              <div>
                <p className="text-xl font-black text-[#EEBA2B]">{referralFooter.title}</p>
                <p className="mt-2 max-w-md text-sm font-semibold leading-relaxed text-slate-400">{referralFooter.intro}</p>
                <Link to={`${linkPath("/referral-partners")}#join-cprpp`} className="mt-4 inline-flex min-h-[42px] items-center rounded-full bg-[#EEBA2B] px-5 text-sm font-black text-slate-950 transition hover:bg-white">
                  {referralFooter.join}
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm font-bold sm:grid-cols-3">
                <Link className="rounded-lg border border-white/10 p-3 text-slate-300 hover:border-[#EEBA2B] hover:text-white" to={linkPath("/referral-partners")}>{referralFooter.overview}</Link>
                <Link className="rounded-lg border border-white/10 p-3 text-slate-300 hover:border-[#EEBA2B] hover:text-white" to={linkPath("/referral-partners/guide")}>{referralFooter.guide}</Link>
                <Link className="rounded-lg border border-white/10 p-3 text-slate-300 hover:border-[#EEBA2B] hover:text-white" to={`${linkPath("/referral-partners")}#join-cprpp`}>{referralFooter.join}</Link>
                <Link className="rounded-lg border border-white/10 p-3 text-slate-300 hover:border-[#EEBA2B] hover:text-white" to={`${linkPath("/referral-partners")}#submit-referral`}>{referralFooter.submit}</Link>
                <Link className="rounded-lg border border-white/10 p-3 text-slate-300 hover:border-[#EEBA2B] hover:text-white" to={`${linkPath("/referral-partners")}#business-partners`}>{referralFooter.business}</Link>
                <Link className="rounded-lg border border-white/10 p-3 text-slate-300 hover:border-[#EEBA2B] hover:text-white" to={`${linkPath("/referral-partners")}#strategic-partnerships`}>{referralFooter.strategic}</Link>
                <Link className="rounded-lg border border-white/10 p-3 text-slate-300 hover:border-[#EEBA2B] hover:text-white" to={linkPath("/referral-program-terms")}>{referralFooter.terms}</Link>
              </div>
            </div>
          </section>
    </footer>
  );
}

export default Footer;





