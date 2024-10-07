import web from '../assets/web.png'
import pub from '../assets/pub.png'
import tech from '../assets/tech.png'
import market from '../assets/market.png'
import vid from '../assets/vid.png'
import proj from '../assets/proj.png'
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
        image : des,
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
        image : proj,
        description: ServiceLocale[lang].description3
    },
    {
        id: 4,
        h1: ServiceLocale[lang].service41,
        h2: ServiceLocale[lang].service42,       
        image : vid,    
        description: ServiceLocale[lang].description4
    },
    {
        id: 5,
        h1: ServiceLocale[lang].service51,
        h2: ServiceLocale[lang].service52,
        image : market,
        description: ServiceLocale[lang].description5
    },
    {
        id: 6,
        h1: ServiceLocale[lang].service61,
        h2: ServiceLocale[lang].service62,
        image : pub,
        description: ServiceLocale[lang].description6
    },
    {
        id: 7,
        h1: ServiceLocale[lang].service71,
        h2: ServiceLocale[lang].service72,
        image : web,
        description: ServiceLocale[lang].description8
    },
    {
        id: 8,
        h1: ServiceLocale[lang].service81,
        h2: ServiceLocale[lang].service82,
        image : tech,
        description: ServiceLocale[lang].description8
    },
]

export default blogData;