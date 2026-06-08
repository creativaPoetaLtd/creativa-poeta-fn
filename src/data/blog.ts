import web from '../assets/web.png'
import market from '../assets/market.png'
import co from '../assets/co.png'
import des from '../assets/des.png'
import getLangFromLocalStorage from '../../utils/Lang'
import ServiceLocale from '../i18n/ServiceLocale'

const lang:any = getLangFromLocalStorage();
const blogData = [
    {
        id: 1,
        h1: ServiceLocale[lang].service11,
        h2: ServiceLocale[lang].service12,
        image : web,
        description: ServiceLocale[lang].description1
    },
    {
        id: 2,
        h1: ServiceLocale[lang].service21,
        h2: ServiceLocale[lang].service22,
        image : co, 
        description: ServiceLocale[lang].description2
    },
    {
        id: 3,
        h1: ServiceLocale[lang].service31,
        h2: ServiceLocale[lang].service32,
        image : des,
        description: ServiceLocale[lang].description3
    },
    {
        id: 4,
        h1: ServiceLocale[lang].service41,
        h2: ServiceLocale[lang].service42,       
        image : market,    
        description: ServiceLocale[lang].description4
    },
    {
        id: 5,
        h1: ServiceLocale[lang].service51,
        h2: ServiceLocale[lang].service52,
        image : web,
        description: ServiceLocale[lang].description5
    },
  
]

export default blogData;
