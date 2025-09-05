import { Link } from 'react-router-dom';
import MainFooterLocale from "../../i18n/MainFooterLocale";
import getLangFromLocalStorage from "../../../utils/Lang";
const MainFooter = () => {

  const lang = getLangFromLocalStorage() || "en";
  return (

    <div className='flex flex-wrap mx-auto text-center items-center justify-center w-full gap-y-2 laptop:justify-between desktop:justify-between desktop:flex-row px-8 laptop:flex-row flex-col-reverse bg-black h-fit p-2 py-4'>
    <div className='flex flex-row flex-wrap justify-center items-center space-x-2 mr-2'>
      <p className='text-xs font-bold text-slate-400'> {MainFooterLocale[lang]?.legalMentions ?? MainFooterLocale["en"].legalMentions}</p>
      <Link to="/terms-and-conditions" className='text-xs font-bold text-slate-400'>{MainFooterLocale[lang]?.terms ?? MainFooterLocale["en"].terms}</Link>
      <p className='text-xs font-bold text-slate-400'>{MainFooterLocale[lang]?.cookies ?? MainFooterLocale["en"].cookies}</p>
    </div>
    <p className='text-xs font-bold text-slate-400 laptop:mt-0 desktop:mt-0'>{MainFooterLocale[lang]?.copyright ?? MainFooterLocale["en"].copyright}</p>
  </div>

  )
}

export default MainFooter