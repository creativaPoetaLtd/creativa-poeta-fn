import getLangFromLocalStorage from "../../utils/Lang";
import FaqLocale from "../i18n/FaqLocale";

const lang:any = getLangFromLocalStorage();
const faqData = [
    {
        id: 1,
        title: FaqLocale[lang].title1,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description1
    },
    {
        id: 2,
        title: FaqLocale[lang].title2,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description2
    },
    {
        id: 3,
        title: FaqLocale[lang].title1,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description2
    },
    {
        id: 1,
        title: FaqLocale[lang].title3,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description3
    },
    {
        id: 4,
        title: FaqLocale[lang].title4,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description4
    },
    {
        id: 5,
        title: FaqLocale[lang].title5,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description5
    },
    {
        id: 6,
        title: FaqLocale[lang].title6,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description6
    },
    {
        id: 7,
        title: FaqLocale[lang].title7,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description7
    },
    {
        id: 8,
        title: FaqLocale[lang].title8,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description8
    },
    {
        id: 9,
        title: FaqLocale[lang].title9,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description9
    },
    {
        id: 10,
        title: FaqLocale[lang].title10,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description10
    },
    {
        id: 11,
        title: FaqLocale[lang].title11,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description11
    },
    {
        id: 12,
        title: FaqLocale[lang].title12,
        // image : 'https://picsum.photos/200/300',
        description: FaqLocale[lang].description12
    },
    
   
]

export default faqData;