// SEO configurations for different pages
export const seoConfig = {
  home: {
    title:
      "Creativa Poeta - Creative Digital Solutions | Web Development, Design & Marketing",
    description:
      "Transform your business with professional web development, graphic design, content writing, and digital marketing services. Expert creative solutions for modern businesses in Rwanda and East Africa.",
    keywords:
      "web development Rwanda, graphic design services, digital marketing Rwanda, content writing, creative solutions, business growth, professional services, Kigali",
    url: "https://creativapoeta.rw/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Creativa Poeta",
      url: "https://creativapoeta.rw",
      logo: "https://creativapoeta.rw/poeta.jpeg",
      description:
        "Professional creative digital solutions including web development, graphic design, content writing, and digital marketing services.",
      foundingDate: "2023",
      address: {
        "@type": "PostalAddress",
        addressCountry: "RW",
        addressRegion: "Kigali",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        url: "https://creativapoeta.rw/contact",
      },
      service: [
        {
          "@type": "Service",
          name: "Web Development",
          description: "Professional web application development services",
        },
        {
          "@type": "Service",
          name: "Graphic Design",
          description: "Creative graphic design solutions for businesses",
        },
        {
          "@type": "Service",
          name: "Digital Marketing",
          description: "Comprehensive digital marketing strategies",
        },
        {
          "@type": "Service",
          name: "Content Writing",
          description: "Professional content creation and copywriting services",
        },
      ],
    },
  },

  services: {
    webDevelopment: {
      title:
        "Web Development Services | Professional Web Apps | Creativa Poeta",
      description:
        "Expert web development services including responsive websites, web applications, e-commerce solutions, and custom development. Modern technologies for optimal performance.",
      keywords:
        "web development, responsive websites, web applications, e-commerce development, custom web solutions, React development, Node.js, Rwanda web development",
      url: "https://creativapoeta.rw/services/web-app",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Web Development Services",
        description:
          "Professional web development including responsive websites, web applications, and e-commerce solutions",
        provider: {
          "@type": "Organization",
          name: "Creativa Poeta",
        },
        serviceType: "Web Development",
        areaServed: "Rwanda",
      },
    },

    graphicDesign: {
      title:
        "Graphic Design Services | Brand Identity & Visual Design | Creativa Poeta",
      description:
        "Professional graphic design services including logo design, brand identity, marketing materials, and visual content creation. Creative solutions for your brand.",
      keywords:
        "graphic design, logo design, brand identity, marketing materials, visual design, creative design, business cards, posters, Rwanda graphic design",
      url: "https://creativapoeta.rw/services/graphic-design",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Graphic Design Services",
        description:
          "Professional graphic design including logo design, brand identity, and marketing materials",
        provider: {
          "@type": "Organization",
          name: "Creativa Poeta",
        },
        serviceType: "Graphic Design",
      },
    },

    digitalMarketing: {
      title: "Digital Marketing Services | SEO & Social Media | Creativa Poeta",
      description:
        "Comprehensive digital marketing services including SEO, social media marketing, content strategy, and online advertising. Grow your business online.",
      keywords:
        "digital marketing, SEO services, social media marketing, content strategy, online advertising, digital growth, marketing campaigns, Rwanda digital marketing",
      url: "https://creativapoeta.rw/services/digital-marketing",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Marketing Services",
        description:
          "Comprehensive digital marketing including SEO, social media marketing, and online advertising",
        provider: {
          "@type": "Organization",
          name: "Creativa Poeta",
        },
        serviceType: "Digital Marketing",
      },
    },

    contentWriting: {
      title:
        "Content Writing Services | Professional Copywriting | Creativa Poeta",
      description:
        "Expert content writing services including blog posts, website copy, marketing content, and technical writing. Engaging content that converts.",
      keywords:
        "content writing, copywriting, blog writing, website content, marketing copy, technical writing, content creation, professional writing, Rwanda content services",
      url: "https://creativapoeta.rw/services/content-writing",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Content Writing Services",
        description:
          "Professional content writing including blog posts, website copy, and marketing content",
        provider: {
          "@type": "Organization",
          name: "Creativa Poeta",
        },
        serviceType: "Content Writing",
      },
    },
  },

  contact: {
    title: "Contact Us | Get In Touch | Creativa Poeta",
    description:
      "Ready to start your project? Contact Creativa Poeta for professional web development, design, and marketing services. Get a free consultation today.",
    keywords:
      "contact creativa poeta, get quote, free consultation, project inquiry, web development contact, design services contact",
    url: "https://creativapoeta.rw/contact",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Creativa Poeta",
      description: "Contact page for Creativa Poeta digital services",
      url: "https://creativapoeta.rw/contact",
    },
  },

  startProject: {
    title: "Start Your Project | Free Quote | Creativa Poeta",
    description:
      "Ready to bring your ideas to life? Start your project with Creativa Poeta. Get a personalized quote for web development, design, or marketing services.",
    keywords:
      "start project, free quote, project consultation, web development quote, design quote, marketing services quote",
    url: "https://creativapoeta.rw/start-project",
  },

  thankYou: {
    title: "Thank You | Project Submitted | Creativa Poeta",
    description:
      "Thank you for choosing Creativa Poeta! Your project has been submitted successfully. We'll get back to you soon with a detailed proposal.",
    keywords:
      "thank you, project submitted, consultation request, creativa poeta",
    url: "https://creativapoeta.rw/thank-you",
  },
};

export default seoConfig;
