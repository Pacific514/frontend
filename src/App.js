import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('fr'); // Default to French
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    location: '',
    date: '',
    time: '',
    emergency: false,
    message: ''
  });
  const [pricingCalculator, setPricingCalculator] = useState({
    service: '',
    vehicleType: '',
    location: '',
    emergency: false,
    parkingSpace: true, // Default to having parking space
    partsOption: 'customer' // Default to customer providing parts
  });
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  // Language content
  const content = {
    fr: {
      // Navigation
      nav: {
        logo: "MécaniqueMobile",
        services: "Services",
        pricing: "Tarifs",
        coverage: "Couverture",
        bookNow: "Réserver"
      },
      // Hero Section
      hero: {
        title: "Mécanique mobile",
        subtitle: "À Votre Emplacement",
        description: "Service automobile expert livré à votre porte à Montréal, Laval et Rive Sud. Support d'urgence 24/7 avec garantie.",
        bookService: "Réserver Maintenant",
        emergency: "Urgence: (514) 555-1234",
        stats: {
          emergency: "24/7",
          emergencyLabel: "Service d'Urgence",
          warranty: "3 Mois",
          warrantyLabel: "Garantie",
          response: "30 Min",
          responseLabel: "Temps de Réponse"
        }
      },
      // Services Section
      services: {
        title: "Services Automobiles Complets",
        description: "Services de mécanicien mobile professionnel pour voitures, camions et VUS livrés avec précision experte et qualité garantie.",
        items: {
          tireServices: {
            title: "Services de Pneus",
            description: "Installation, réparation, équilibrage et changements de pneus d'urgence",
            price: "À partir de 149$"
          },
          oilChange: {
            title: "Changements d'Huile",
            description: "Huile synthétique complète, conventionnelle et à kilométrage élevé",
            price: "À partir de 99$"
          },
          brakeService: {
            title: "Service de Freins",
            description: "Remplacement des plaquettes de frein, service de rotor et inspection du système de freinage",
            price: "À partir de 199$"
          },
          batteryService: {
            title: "Service de Batterie",
            description: "Test de batterie, remplacement et diagnostic du système de charge",
            price: "À partir de 159$"
          },
          diagnostics: {
            title: "Diagnostics",
            description: "Diagnostics informatiques, analyse du moteur et dépannage",
            price: "À partir de 99$"
          },
          tuneUp: {
            title: "Mise au Point",
            description: "Mise au point complète du moteur et services d'entretien",
            price: "À partir de 249$"
          }
        },
        bookService: "Réserver ce Service"
      },
      // Coverage Areas
      coverage: {
        title: "Zones de Couverture de Service",
        description: "Nous fournissons des services de mécanicien mobile dans la région du Grand Montréal.",
        areas: {
          montreal: {
            area: "Montréal",
            description: "Centre-ville, Plateau, Westmount, NDG et tous les arrondissements de Montréal",
            response: "20-30 minutes"
          },
          laval: {
            area: "Laval",
            description: "Tous les districts de Laval incluant Chomedey, Vimont et Sainte-Rose",
            response: "25-35 minutes"
          },
          riveSud: {
            area: "Rive Sud",
            description: "Longueuil, Brossard, Saint-Lambert et environs",
            response: "30-40 minutes"
          }
        },
        emergency: {
          title: "Service d'Urgence",
          description: "Disponible 24/7 dans toutes les zones de couverture",
          callNow: "Appeler Maintenant: (514) 555-1234"
        },
        responseLabel: "Réponse:"
      },
      // Pricing Calculator
      pricing: {
        title: "Calculateur de Prix",
        description: "Obtenez une estimation instantanée pour vos besoins de service automobile.",
        serviceDetails: "Détails du Service",
        serviceType: "Type de Service",
        selectService: "Sélectionner un service",
        vehicleType: "Type de Véhicule",
        location: "Emplacement",
        emergency: "Service d'Urgence (24/7)",
        parkingSpace: "Espace de Stationnement",
        parkingAvailable: "Espace de stationnement disponible",
        noParkingSpace: "Aucun espace de stationnement (+15$)",
        partsOption: "Options des Pièces",
        partsNote: "Les pièces ne sont pas incluses dans le prix de base",
        estimate: "Estimation de Prix",
        estimatedCost: "Coût total estimé incluant l'appel de service",
        includes: "Inclut:",
        includesList: [
          "• Service professionnel à votre emplacement",
          "• Garantie de 3 mois ou 5000km",
          "• Pièces et matériaux de qualité",
          "• Diagnostic et réparation experts"
        ],
        bookThisService: "Réserver ce Service",
        selectServiceToSee: "Sélectionner un service pour voir l'estimation de prix",
        services: {
          "oil-change": "Changement d'Huile",
          "tire-replacement": "Remplacement de Pneus",
          "brake-service": "Service de Freins",
          "battery-replacement": "Remplacement de Batterie",
          "diagnostic": "Diagnostic",
          "tune-up": "Mise au Point"
        },
        vehicles: {
          standard: "Voiture (Standard)",
          truck: "Camion/VUS (+20%)",
          luxury: "Voiture de Luxe (+30%)"
        },
        parkingOptions: {
          available: "Oui, espace disponible",
          notAvailable: "Non, aucun espace (+15$)"
        },
        partsOptions: {
          customer: "J'ai mes propres pièces (0$ de plus)",
          mechanic: "Trouver les pièces pour moi (+15$ - pièces neuves)"
        },
        locations: {
          montreal: "Montréal",
          laval: "Laval",
          "rive-sud": "Rive Sud"
        }
      },
      // Booking Section
      booking: {
        title: "Réservez Votre Service",
        description: "Planifiez votre service de mécanicien mobile en ligne. Nous confirmerons votre rendez-vous dans les 15 minutes.",
        form: {
          fullName: "Nom Complet *",
          fullNamePlaceholder: "Entrez votre nom complet",
          phone: "Numéro de Téléphone *",
          phonePlaceholder: "(514) 555-1234",
          email: "Adresse Courriel *",
          emailPlaceholder: "votre.courriel@exemple.com",
          serviceRequired: "Service Requis *",
          serviceLocation: "Emplacement du Service *",
          locationPlaceholder: "123 Rue Principale, Montréal, QC",
          preferredDate: "Date Préférée *",
          preferredTime: "Heure Préférée *",
          selectTime: "Sélectionner l'heure",
          emergencyRequest: "Ceci est une demande de service d'urgence",
          additionalDetails: "Détails Supplémentaires",
          additionalPlaceholder: "Décrivez le problème de votre véhicule ou toute exigence spécifique...",
          bookServiceNow: "Réserver le Service Maintenant",
          confirmationNote: "Nous confirmerons votre rendez-vous dans les 15 minutes"
        },
        times: {
          "08:00": "8h00",
          "09:00": "9h00",
          "10:00": "10h00",
          "11:00": "11h00",
          "12:00": "12h00",
          "13:00": "13h00",
          "14:00": "14h00",
          "15:00": "15h00",
          "16:00": "16h00",
          "17:00": "17h00"
        }
      },
      // Why Choose Us
      whyChoose: {
        title: "Pourquoi Choisir Notre Service Mobile?",
        description: "Soins automobiles professionnels pour voitures, camions et VUS livrés avec commodité, qualité et fiabilité.",
        features: [
          {
            title: "Techniciens Experts",
            description: "Mécaniciens certifiés avec des années d'expérience"
          },
          {
            title: "À Votre Emplacement",
            description: "Service à domicile, au travail ou en bordure de route"
          },
          {
            title: "Réponse Rapide",
            description: "Temps de réponse moyen de 30 minutes"
          },
          {
            title: "Garantie 3 Mois",
            description: "Garantie limitée de 5000km sur tous les services"
          }
        ]
      },
      // FAQ
      faq: {
        title: "Questions Fréquemment Posées",
        items: [
          {
            question: "Quelles zones desservez-vous?",
            answer: "Nous fournissons des services de mécanicien mobile dans toute la région de Montréal, Laval et Rive Sud avec des temps de réponse de 20-40 minutes selon l'emplacement."
          },
          {
            question: "Offrez-vous des services d'urgence?",
            answer: "Oui! Nous offrons des services automobiles d'urgence 24/7 avec réponse prioritaire. Appelez le (514) 555-1234 pour une assistance immédiate."
          },
          {
            question: "Quelle garantie offrez-vous?",
            answer: "Tous nos services sont accompagnés d'une garantie limitée de 3 mois ou 5000km, selon la première éventualité. Nous soutenons notre travail avec des garanties de qualité."
          },
          {
            question: "Comment puis-je payer les services?",
            answer: "Nous acceptons l'argent comptant, les cartes de crédit et les virements électroniques. Le paiement est dû à la fin du service."
          },
          {
            question: "Que faire si je dois reporter mon rendez-vous?",
            answer: "Vous pouvez reporter jusqu'à 2 heures avant votre rendez-vous sans frais. Les situations d'urgence sont toujours accommodées."
          }
        ]
      },
      // Footer
      footer: {
        description: "Services automobiles mobiles professionnels dans le Grand Montréal.",
        contact: {
          phone: "📞 (514) 555-1234",
          email: "📧 info@mecaniquemobile.ca",
          address: "📍 Montréal, Laval et Rive Sud"
        },
        servicesTitle: "Services",
        coverageTitle: "Zones de Couverture",
        quickLinksTitle: "Liens Rapides",
        copyright: "© 2025 MécaniqueMobile. Tous droits réservés. | Garantie 3 Mois/5000km | Licencié et Assuré"
      },
      // Alerts
      bookingSuccess: "Demande de réservation soumise! Nous vous contacterons dans les 15 minutes."
    },
    en: {
      // Navigation
      nav: {
        logo: "MobileMechanic",
        services: "Services",
        pricing: "Pricing", 
        coverage: "Coverage",
        bookNow: "Book Now"
      },
      // Hero Section
      hero: {
        title: "Professional Mobile Mechanic",
        subtitle: "At Your Location",
        description: "Expert car and truck service delivered to your doorstep in Montreal, Laval & Rive Sud. 24/7 emergency support with 3-month/5000km warranty.",
        bookService: "Book Service Now",
        emergency: "Emergency: (514) 555-1234",
        stats: {
          emergency: "24/7",
          emergencyLabel: "Emergency Service",
          warranty: "3 Month",
          warrantyLabel: "Warranty",
          response: "30 Min",
          responseLabel: "Response Time"
        }
      },
      // Services Section
      services: {
        title: "Complete Automotive Services",
        description: "Professional mobile mechanic services for cars, trucks, and SUVs delivered with expert precision and guaranteed quality.",
        items: {
          tireServices: {
            title: "Tire Services",
            description: "Installation, repair, balancing, and emergency tire changes",
            price: "From $149"
          },
          oilChange: {
            title: "Oil Changes",
            description: "Full synthetic, conventional, and high-mileage oil changes",
            price: "From $89"
          },
          brakeService: {
            title: "Brake Service",
            description: "Brake pad replacement, rotor service, and brake system inspection",
            price: "From $199"
          },
          batteryService: {
            title: "Battery Service",
            description: "Battery testing, replacement, and charging system diagnosis",
            price: "From $159"
          },
          diagnostics: {
            title: "Diagnostics",
            description: "Computer diagnostics, engine analysis, and troubleshooting",
            price: "From $99"
          },
          tuneUp: {
            title: "Tune-Ups",
            description: "Complete engine tune-ups and maintenance services",
            price: "From $249"
          }
        },
        bookService: "Book This Service"
      },
      // Coverage Areas
      coverage: {
        title: "Service Coverage Areas",
        description: "We provide mobile mechanic services across the Greater Montreal area.",
        areas: {
          montreal: {
            area: "Montreal",
            description: "Downtown, Plateau, Westmount, NDG, and all Montreal boroughs",
            response: "20-30 minutes"
          },
          laval: {
            area: "Laval", 
            description: "All Laval districts including Chomedey, Vimont, and Sainte-Rose",
            response: "25-35 minutes"
          },
          riveSud: {
            area: "Rive Sud",
            description: "Longueuil, Brossard, Saint-Lambert, and surrounding areas",
            response: "30-40 minutes"
          }
        },
        emergency: {
          title: "Emergency Service",
          description: "Available 24/7 across all coverage areas",
          callNow: "Call Now: (514) 555-1234"
        },
        responseLabel: "Response:"
      },
      // Pricing Calculator
      pricing: {
        title: "Pricing Calculator",
        description: "Get an instant estimate for your automotive service needs.",
        serviceDetails: "Service Details",
        serviceType: "Service Type",
        selectService: "Select a service",
        vehicleType: "Vehicle Type",
        location: "Location",
        emergency: "Emergency Service (24/7)",
        parkingSpace: "Parking Space",
        parkingAvailable: "Parking space available",
        noParkingSpace: "No parking space (+$15)",
        partsOption: "Parts Options",
        partsNote: "Parts are not included in the base price",
        estimate: "Price Estimate",
        estimatedCost: "Estimated total cost including service call",
        includes: "Includes:",
        includesList: [
          "• Professional service at your location",
          "• 3-month or 5000km warranty",
          "• Quality parts and materials",
          "• Expert diagnosis and repair"
        ],
        bookThisService: "Book This Service",
        selectServiceToSee: "Select a service to see pricing estimate",
        services: {
          "oil-change": "Oil Change",
          "tire-replacement": "Tire Replacement",
          "brake-service": "Brake Service",
          "battery-replacement": "Battery Replacement",
          "diagnostic": "Diagnostic",
          "tune-up": "Tune-Up"
        },
        vehicles: {
          standard: "Car (Standard)",
          truck: "Truck/SUV (+20%)",
          luxury: "Luxury Car (+30%)"
        },
        parkingOptions: {
          available: "Yes, space available",
          notAvailable: "No parking space (+$15)"
        },
        partsOptions: {
          customer: "I have my own parts (no extra charge)",
          mechanic: "Find parts for me (+$15 - new parts only)"
        },
        locations: {
          montreal: "Montreal",
          laval: "Laval",
          "rive-sud": "Rive Sud"
        }
      },
      // Booking Section
      booking: {
        title: "Book Your Service",
        description: "Schedule your mobile mechanic service online. We'll confirm your appointment within 15 minutes.",
        form: {
          fullName: "Full Name *",
          fullNamePlaceholder: "Enter your full name",
          phone: "Phone Number *",
          phonePlaceholder: "(514) 555-1234",
          email: "Email Address *", 
          emailPlaceholder: "your.email@example.com",
          serviceRequired: "Service Required *",
          serviceLocation: "Service Location *",
          locationPlaceholder: "123 Main St, Montreal, QC",
          preferredDate: "Preferred Date *",
          preferredTime: "Preferred Time *",
          selectTime: "Select time",
          emergencyRequest: "This is an emergency service request",
          additionalDetails: "Additional Details",
          additionalPlaceholder: "Describe your vehicle's issue or any specific requirements...",
          bookServiceNow: "Book Service Now",
          confirmationNote: "We'll confirm your appointment within 15 minutes"
        },
        times: {
          "08:00": "8:00 AM",
          "09:00": "9:00 AM",
          "10:00": "10:00 AM",
          "11:00": "11:00 AM",
          "12:00": "12:00 PM",
          "13:00": "1:00 PM",
          "14:00": "2:00 PM",
          "15:00": "3:00 PM",
          "16:00": "4:00 PM",
          "17:00": "5:00 PM"
        }
      },
      // Why Choose Us
      whyChoose: {
        title: "Why Choose Our Mobile Service?",
        description: "Professional automotive care for cars, trucks, and SUVs delivered with convenience, quality, and reliability.",
        features: [
          {
            title: "Expert Technicians",
            description: "Certified mechanics with years of experience"
          },
          {
            title: "At Your Location",
            description: "Service at home, work, or roadside"
          },
          {
            title: "Fast Response",
            description: "30-minute average response time"
          },
          {
            title: "3-Month Warranty",
            description: "5000km limited warranty on all services"
          }
        ]
      },
      // FAQ
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "What areas do you service?",
            answer: "We provide mobile mechanic services throughout Montreal, Laval, and Rive Sud areas with response times of 20-40 minutes depending on location."
          },
          {
            question: "Do you offer emergency services?",
            answer: "Yes! We offer 24/7 emergency automotive services with priority response. Call (514) 555-1234 for immediate assistance."
          },
          {
            question: "What warranty do you provide?",
            answer: "All our services come with a 3-month or 5000km limited warranty, whichever comes first. We stand behind our work with quality guarantees."
          },
          {
            question: "How do I pay for services?",
            answer: "We accept cash, credit cards, and e-transfer. Payment is due upon completion of service."
          },
          {
            question: "What if I need to reschedule?",
            answer: "You can reschedule up to 2 hours before your appointment without any fees. Emergency situations are always accommodated."
          }
        ]
      },
      // Footer
      footer: {
        description: "Professional mobile automotive services across Greater Montreal.",
        contact: {
          phone: "📞 (514) 555-1234",
          email: "📧 info@mobilemechanic.ca",
          address: "📍 Serving Montreal, Laval & Rive Sud"
        },
        servicesTitle: "Services",
        coverageTitle: "Coverage Areas",
        quickLinksTitle: "Quick Links",
        copyright: "© 2025 MobileMechanic. All rights reserved. | 3-Month/5000km Warranty | Licensed & Insured"
      },
      // Alerts
      bookingSuccess: "Booking request submitted! We will contact you within 15 minutes."
    }
  };

  const t = content[language];

  // Pricing data
  const pricingData = {
    'oil-change': { base: 89, emergency: 129 },
    'tire-replacement': { base: 149, emergency: 199 },
    'brake-service': { base: 199, emergency: 269 },
    'battery-replacement': { base: 159, emergency: 209 },
    'diagnostic': { base: 99, emergency: 149 },
    'tune-up': { base: 249, emergency: 329 }
  };

  const calculatePrice = () => {
    if (!pricingCalculator.service) return;
    
    let basePrice = pricingData[pricingCalculator.service]?.base || 0;
    let finalPrice = basePrice;

    if (pricingCalculator.emergency) {
      finalPrice = pricingData[pricingCalculator.service]?.emergency || basePrice * 1.4;
    }

    if (pricingCalculator.vehicleType === 'truck') {
      finalPrice *= 1.2;
    } else if (pricingCalculator.vehicleType === 'luxury') {
      finalPrice *= 1.3;
    }

    // Add parking surcharge if no parking space available
    if (!pricingCalculator.parkingSpace) {
      finalPrice += 15;
    }

    // Add parts surcharge if mechanic finds parts
    if (pricingCalculator.partsOption === 'mechanic') {
      finalPrice += 15;
    }

    setCalculatedPrice(finalPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [pricingCalculator]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(t.bookingSuccess);
    setBookingForm({
      name: '',
      phone: '',
      email: '',
      service: '',
      location: '',
      date: '',
      time: '',
      emergency: false,
      message: ''
    });
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Logo Image */}
              <div className="logo-container">
                <img 
                  src="/logo.png" 
                  alt={language === 'fr' ? 'MécaniqueMobile Logo' : 'MobileMechanic Logo'}
                  className="logo-header"
                  onError={(e) => {
                    // Fallback to text logo if image not found
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div 
                  className="logo-fallback hidden"
                  style={{display: 'none'}}
                >
                  <span className="text-red-500">{language === 'fr' ? 'Mécanique' : 'Mobile'}</span>
                  {language === 'fr' ? 'Mobile' : 'Mechanic'}
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#services" className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.services}</a>
                <a href="#pricing" className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.pricing}</a>
                <a href="#areas" className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.coverage}</a>
                <a href="#booking" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{t.nav.bookNow}</a>
              </div>
              
              {/* Language Toggle */}
              <div className="flex items-center bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'fr' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'en' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-red-500 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#services" className="text-white hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium">{t.nav.services}</a>
              <a href="#pricing" className="text-white hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium">{t.nav.pricing}</a>
              <a href="#areas" className="text-white hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium">{t.nav.coverage}</a>
              <a href="#booking" className="bg-red-600 hover:bg-red-700 text-white block px-3 py-2 rounded-md text-base font-medium">{t.nav.bookNow}</a>
              
              {/* Mobile Language Toggle */}
              <div className="flex justify-center pt-4">
                <div className="flex items-center bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      language === 'fr' 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      language === 'en' 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900"></div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t.hero.title}<br />
              <span className="text-red-500">{language === 'fr' ? 'Mécanique' : 'Mobile'}</span><br />
              <span className="text-blue-400">{t.hero.subtitle}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#booking" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                {t.hero.bookService}
              </a>
              <a 
                href="tel:+15145551234" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                {t.hero.emergency}
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
              <div className="text-white">
                <div className="text-3xl font-bold text-red-500">{t.hero.stats.emergency}</div>
                <div className="text-sm text-gray-300">{t.hero.stats.emergencyLabel}</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-bold text-blue-400">{t.hero.stats.warranty}</div>
                <div className="text-sm text-gray-300">{t.hero.stats.warrantyLabel}</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-bold text-red-500">{t.hero.stats.response}</div>
                <div className="text-sm text-gray-300">{t.hero.stats.responseLabel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-20 md:opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1659353741240-f64b1f1ff081" 
            alt="Professional Mobile Mechanic"
            className="w-96 h-96 object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.services.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.services.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                key: 'tireServices',
                icon: "🔧",
                image: "https://images.unsplash.com/photo-1559132837-f5007d4fb2fd"
              },
              {
                key: 'oilChange',
                icon: "🛢️",
                image: "https://images.pexels.com/photos/5994458/pexels-photo-5994458.jpeg"
              },
              {
                key: 'brakeService',
                icon: "🛑",
                image: "https://images.pexels.com/photos/5994639/pexels-photo-5994639.jpeg"
              },
              {
                key: 'batteryService',
                icon: "🔋",
                image: "https://images.unsplash.com/photo-1659353741374-81bea628bf75"
              },
              {
                key: 'diagnostics',
                icon: "💻",
                image: "https://images.pexels.com/photos/7564223/pexels-photo-7564223.jpeg"
              },
              {
                key: 'tuneUp',
                icon: "⚙️",
                image: "https://images.unsplash.com/photo-1635155711443-ff00db483a5f"
              }
            ].map((service, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-red-500/20 hover:border-red-500/50 transition-all group hover:transform hover:scale-105">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={service.image} 
                    alt={t.services.items[service.key].title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-semibold">
                    {t.services.items[service.key].price}
                  </div>
                </div>
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{t.services.items[service.key].title}</h3>
                <p className="text-gray-300 mb-4">{t.services.items[service.key].description}</p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors">
                  {t.services.bookService}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section id="areas" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.coverage.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.coverage.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                key: 'montreal',
                area: t.coverage.areas.montreal.area,
                description: t.coverage.areas.montreal.description,
                responseTime: t.coverage.areas.montreal.response
              },
              {
                key: 'laval',
                area: t.coverage.areas.laval.area,
                description: t.coverage.areas.laval.description,
                responseTime: t.coverage.areas.laval.response
              },
              {
                key: 'riveSud',
                area: t.coverage.areas.riveSud.area,
                description: t.coverage.areas.riveSud.description,
                responseTime: t.coverage.areas.riveSud.response
              }
            ].map((location, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-blue-500/20 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">{location.area}</h3>
                <p className="text-gray-300 mb-6">{location.description}</p>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full inline-block">
                  {t.coverage.responseLabel} {location.responseTime}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-red-600/20 border border-red-500 rounded-xl p-6 inline-block">
              <h3 className="text-xl font-bold text-red-400 mb-2">{t.coverage.emergency.title}</h3>
              <p className="text-white">{t.coverage.emergency.description}</p>
              <a href="tel:+15145551234" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg mt-4 inline-block font-semibold transition-colors">
                {t.coverage.emergency.callNow}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section id="pricing" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.pricing.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.pricing.description}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-red-500/20">
                <h3 className="text-xl font-bold text-white mb-6">{t.pricing.serviceDetails}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">{t.pricing.serviceType}</label>
                    <select 
                      value={pricingCalculator.service}
                      onChange={(e) => setPricingCalculator({...pricingCalculator, service: e.target.value})}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2"
                    >
                      <option value="">{t.pricing.selectService}</option>
                      {Object.entries(t.pricing.services).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">{t.pricing.vehicleType}</label>
                    <select 
                      value={pricingCalculator.vehicleType}
                      onChange={(e) => setPricingCalculator({...pricingCalculator, vehicleType: e.target.value})}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2"
                    >
                      <option value="standard">{t.pricing.vehicles.standard}</option>
                      <option value="truck">{t.pricing.vehicles.truck}</option>
                      <option value="luxury">{t.pricing.vehicles.luxury}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">{t.pricing.location}</label>
                    <select 
                      value={pricingCalculator.location}
                      onChange={(e) => setPricingCalculator({...pricingCalculator, location: e.target.value})}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2"
                    >
                      {Object.entries(t.pricing.locations).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">{t.pricing.parkingSpace}</label>
                    <select 
                      value={pricingCalculator.parkingSpace}
                      onChange={(e) => setPricingCalculator({...pricingCalculator, parkingSpace: e.target.value === 'true'})}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2"
                    >
                      <option value="true">{t.pricing.parkingOptions.available}</option>
                      <option value="false">{t.pricing.parkingOptions.notAvailable}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">{t.pricing.partsOption}</label>
                    <select 
                      value={pricingCalculator.partsOption}
                      onChange={(e) => setPricingCalculator({...pricingCalculator, partsOption: e.target.value})}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2"
                    >
                      <option value="customer">{t.pricing.partsOptions.customer}</option>
                      <option value="mechanic">{t.pricing.partsOptions.mechanic}</option>
                    </select>
                    <p className="text-gray-400 text-sm mt-2">{t.pricing.partsNote}</p>
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={pricingCalculator.emergency}
                      onChange={(e) => setPricingCalculator({...pricingCalculator, emergency: e.target.checked})}
                      className="mr-3"
                    />
                    <label className="text-white">{t.pricing.emergency}</label>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-xl font-bold text-white mb-6">{t.pricing.estimate}</h3>
                
                {calculatedPrice ? (
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-400 mb-4">
                      ${calculatedPrice.toFixed(0)}
                    </div>
                    <p className="text-gray-300 mb-6">
                      {t.pricing.estimatedCost}
                    </p>
                    
                    <div className="bg-blue-600/20 border border-blue-500 rounded-lg p-4 mb-6">
                      <h4 className="text-white font-semibold mb-2">{t.pricing.includes}</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {t.pricing.includesList.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => document.getElementById('booking').scrollIntoView()}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      {t.pricing.bookThisService}
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    {t.pricing.selectServiceToSee}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Booking */}
      <section id="booking" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.booking.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.booking.description}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleBookingSubmit} className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-red-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2">{t.booking.form.fullName}</label>
                  <input 
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                    placeholder={t.booking.form.fullNamePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">{t.booking.form.phone}</label>
                  <input 
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                    placeholder={t.booking.form.phonePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">{t.booking.form.email}</label>
                  <input 
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                    placeholder={t.booking.form.emailPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">{t.booking.form.serviceRequired}</label>
                  <select 
                    required
                    value={bookingForm.service}
                    onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                  >
                    <option value="">{t.pricing.selectService}</option>
                    {Object.entries(t.pricing.services).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">{t.booking.form.serviceLocation}</label>
                  <input 
                    type="text"
                    required
                    value={bookingForm.location}
                    onChange={(e) => setBookingForm({...bookingForm, location: e.target.value})}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                    placeholder={t.booking.form.locationPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">{t.booking.form.preferredDate}</label>
                  <input 
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">{t.booking.form.preferredTime}</label>
                  <select 
                    required
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                  >
                    <option value="">{t.booking.form.selectTime}</option>
                    {Object.entries(t.booking.times).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center mb-4">
                    <input 
                      type="checkbox"
                      checked={bookingForm.emergency}
                      onChange={(e) => setBookingForm({...bookingForm, emergency: e.target.checked})}
                      className="mr-3"
                    />
                    <label className="text-white">{t.booking.form.emergencyRequest}</label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white mb-2">{t.booking.form.additionalDetails}</label>
                  <textarea 
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                    rows="4"
                    placeholder={t.booking.form.additionalPlaceholder}
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button 
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  {t.booking.form.bookServiceNow}
                </button>
                <p className="text-gray-400 mt-4 text-sm">
                  {t.booking.form.confirmationNote}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.whyChoose.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.whyChoose.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🔧" },
              { icon: "📍" },
              { icon: "⚡" },
              { icon: "🛡️" }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{t.whyChoose.features[index].title}</h3>
                <p className="text-gray-300">{t.whyChoose.features[index].description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.faq.title}
            </h2>
          </div>

          <div className="space-y-6">
            {t.faq.items.map((faq, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-red-500/20">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              {/* Footer Logo */}
              <div className="logo-container mb-4">
                <img 
                  src="/logo-white.png" 
                  alt={language === 'fr' ? 'MécaniqueMobile Logo' : 'MobileMechanic Logo'}
                  className="logo-footer"
                  onError={(e) => {
                    // Fallback to text logo if image not found
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div 
                  className="logo-fallback hidden"
                  style={{display: 'none'}}
                >
                  <span className="text-red-500">{language === 'fr' ? 'Mécanique' : 'Mobile'}</span>
                  {language === 'fr' ? 'Mobile' : 'Mechanic'}
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                {t.footer.description}
              </p>
              <div className="text-white">
                <div className="mb-2">{t.footer.contact.phone}</div>
                <div className="mb-2">{t.footer.contact.email}</div>
                <div>{t.footer.contact.address}</div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">{t.footer.servicesTitle}</h3>
              <ul className="text-gray-400 space-y-2">
                <li>{t.services.items.tireServices.title}</li>
                <li>{t.services.items.oilChange.title}</li>
                <li>{t.services.items.brakeService.title}</li>
                <li>{t.services.items.batteryService.title}</li>
                <li>{t.services.items.diagnostics.title}</li>
                <li>{t.services.items.tuneUp.title}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">{t.footer.coverageTitle}</h3>
              <ul className="text-gray-400 space-y-2">
                <li>{t.coverage.areas.montreal.area}</li>
                <li>{t.coverage.areas.laval.area}</li>
                <li>{t.coverage.areas.riveSud.area}</li>
                <li>Longueuil</li>
                <li>Brossard</li>
                <li>Saint-Lambert</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">{t.footer.quickLinksTitle}</h3>
              <ul className="text-gray-400 space-y-2">
                <li><a href="#services" className="hover:text-red-500">{t.nav.services}</a></li>
                <li><a href="#pricing" className="hover:text-red-500">{t.nav.pricing}</a></li>
                <li><a href="#booking" className="hover:text-red-500">{t.nav.bookNow}</a></li>
                <li><a href="#areas" className="hover:text-red-500">{t.nav.coverage}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
