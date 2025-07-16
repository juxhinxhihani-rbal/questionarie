"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "al";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: "Homepage",
    investments: "Investments",
    calculator: "Calculator",
    profile: "Profile",
    logout: "Logout",
    applicants: "Applicants",
    overview: "Overview",
    "investment.info": "Investment Info",
    "investment.overview": "Investment Overview",
    
    // Calculator
    "investment.calculator": "Calculator",
    "initial.investment": "Initial Investment Amount",
    "investment.years": "Investment Period",
    year: "year",
    years: "years",
    "risk.level": "Risk Level",
    "additional.contributions":
      "I want to make additional monthly contributions",
    "monthly.amount": "Monthly contribution amount",
    "investment.summary": "Investment Summary",
    "total.investment": "Total Investment",
    "potential.return": "Potential Return",
    "total.value": "Total Value",
    "calculation.disclaimer":
      "These calculations are estimates based on the selected risk level and do not guarantee future returns.",
    // Questionnaire
    "risk.questionnaire": "Questionnaire",
    "client.name": "Client Name",
    ssn: "SSN",
    "investment.knowledge": "Your knowledge of investment funds is:",
    "investment.horizon.question": "What is your investment horizon?",
    "savings.percentage":
      "What percentage of your savings does this investment represent?",
    "investment.preference": "In general, I prefer investments that are:",
    select: "Select",
    low: "Low",
    medium: "Medium",
    high: "High",
    "up.to.1.year": "Up to 1 year",
    "1.to.3.years": "1-3 years",
    "over.3.years": "Over 3 years",
    "less.than.30": "Less than 30%",
    "30.to.60": "30-60%",
    "over.60": "Over 60%",
    conservative: "Conservative",
    balanced: "Balanced",
    aggressive: "Aggressive",
    result: "Result",
    "submit.data": "Submit Data",
    "result.conservative":
      "Conservative Fund - Low Risk (2/7) - Recommended investment period 1-2 years",
    "result.balanced":
      "Balanced Fund - Moderate Risk (4/7) - Recommended investment period 3-5 years",
    "result.aggressive":
      "Growth Fund - High Risk (6/7) - Recommended investment period 5+ years",
    "please.complete.form": "Please complete and submit the form first",
    "error.loading.questions": "Error loading questions",
    "not.found": "Not Found",
    "ssn.not.found": "Client with SSN Not Found",
    // Previous translations...
    // Home
    welcome: "Welcome to Your Investment Journey",
    "welcome.subtitle":
      "Discover our range of expert-managed funds designed to meet your financial goals. Start your investment journey today with our professional guidance.",
    "start.investing": "Start Investing Now",
    "start.journey": "Start Your Investment Journey",

    // Investment Options
    "investment.vehicles": "Vehicle Investment",
    "investment.vehicles.desc":
      "Strategic investments in vehicle and transportation sectors.",
    "precious.metals": "Precious Metals",
    "precious.metals.desc":
      "Diversify your portfolio with gold and other precious metals.",
    "real.estate": "Real Estate",
    "real.estate.desc": "Property investments with high return potential.",
    "energy.sector": "Energy Sector",
    "energy.sector.desc":
      "Investment options in sustainable and traditional energy.",

    // Progress Messages
    "progress.start": "Click to confirm your commitment",
    "progress.click1": "Good start! Keep going...",
    "progress.click2": "You're showing dedication!",
    "progress.click3": "Building trust...",
    "progress.click4": "Halfway there!",
    "progress.click5": "You're persistent!",
    "progress.click6": "Almost there...",
    "progress.click7": "Just a few more clicks!",
    "progress.click8": "So close now!",
    "progress.click9": "One final click!",
    "progress.complete": "You've earned our trust!",

    // Why Choose Us
    "why.choose": "Why Choose Our Platform?",
    "flexible.options": "Flexible Investment Options",
    "flexible.options.desc":
      "Start from 5,000 ALL or 250 EUR with no entry fees. Choose your investment level.",
    "performance.tracking": "Performance Tracking",
    "performance.tracking.desc":
      "Monitor your investments with real-time analytics and comprehensive reports.",
    "secure.platform": "Secure Platform",
    "secure.platform.desc":
      "Your investments are protected with state-of-the-art security measures.",

    // How It Works
    "how.works": "How It Works",
    "easy.start": "Easy to Start",
    "easy.start.desc":
      "Create your account and start investing in minutes with our simple process.",
    "regular.investments": "Regular Investments",
    "regular.investments.desc":
      "Set up periodic investments or make one-time contributions as you wish.",
    "digital.management": "Digital Management",
    "digital.management.desc":
      "Manage your portfolio anywhere, anytime with our user-friendly platform.",

    // Investment Info
    "investment.funds": "Overview",
    skip: "Skip",
    "what.is.fund": "What is an Investment Fund?",
    "fund.description":
      "Investment funds offer a diversified portfolio managed by experts, pooling investors' money to invest in stocks and/or bonds, with returns shared among members. Funds vary in objectives, returns, risk, and currency. Benefits include:",
    "professional.care": "Professional care for your savings",
    "professional.care.desc": "Experts grow your savings.",
    "inflation.protection": "Protection from inflation",
    "inflation.protection.desc":
      "Ensure your savings keep pace with rising prices.",
    "better.returns": "Better returns",
    "better.returns.desc": "Higher yields than typical deposits.",
    "flexibility.liquidity": "Flexibility and liquidity",
    "flexibility.liquidity.desc":
      "Easily sell units at any of our branches or invest more with regular or one-time payments.",

    // Navigation
    back: "Back",
    continue: "Continue",

    // Investment Period
    "investment.period": "Investment Period",
    "period.description":
      "Consider how long you are willing to invest in an investment fund. A longer investment period means a longer period to achieve returns not only on the invested funds but also on previously realized returns.",
    "give.time": "Give your money enough time to earn more.",
    "time.description":
      "Before investing in any fund, please check the recommended investment period. The longer you invest, the higher the potential for a better return.",

    // Investment Risk
    "investment.risk": "Investment Risk",
    "risk.description":
      "Like prices in a store, the value of your investment can rise and fall with market conditions. Lower risk funds give smaller returns, while higher risk funds can give more. Risk depends on the financial instruments, sectors, and markets where the funds are invested.",
    "check.risk": "Check the Risk Indicator/fund level before investing.",
    "risk.scale":
      "The fund's risk level or SRRI is rated on a scale of 1 to 7 as follows: 1-low, 2-low, 3-acceptable, 4-moderate, 5-significant, 6-high, and 7-highest risk level.",
    "need.support": "Need support? +042 282 3587",
    "download.app": "Install Raiffeisen Youth to continue your application",

    // Language
    "switch.language": "AL",

    // Login
    username: "Username",
    password: "Password",
    "enter.username": "Enter username",
    "enter.password": "Enter password",
    login: "Login",
    "login.sso": "Login with SSO",
    "remember.me": "Remember me",
    "view.more": "View More",
    "applicant.details": "Applicant Details",
    "view.document": "View",
    "download.document": "Download",
    "investment.certificate": "Investment Certificate",
    "total.applicants": "Total Applicants",
    "filtered.applicants": "Applicants in Selected Year",
    "fund.performance": "Fund Performance",
    "fund.distribution": "Fund Distribution",
    "average.performance": "Average Performance",
    "best.fund": "Best Performing Fund",
    "historic.trend": "Historic Trend",
    "select.fund": "Select Fund",
    "current.value": "Current Value",
    "select.year": "Filter by Year",
    all: "All",
    settings: "Settings",
    funds: "Funds",
    "questions.answers": "Questions & Answers",
    name: "Name",
    limit: "Limit",
    active: "Active",
    add: "Add",
    "add.fund": "Add Fund",
    answer: "Answer",
    weight: "Weight",
    actions: "Actions",
  },
  al: {
    // Navigation
    home: "Kryefaqja",
    investments: "Investimet",
    calculator: "Llogaritësi",
    profile: "Profili",
    logout: "Dil",
    applicants: "Aplikantët",
    overview: "Përmbledhje",
    "investment.info": "Informacion Investimi",
    "investment.overview": "Përmbledhje Investimi",
    
    // Calculator
    "investment.calculator": "Llogaritësi",
    "initial.investment": "Shuma Fillestare e Investimit",
    "investment.years": "Periudha e Investimit",
    year: "vit",
    years: "vite",
    "risk.level": "Niveli i Rrezikut",
    "additional.contributions": "Dua të bëj kontribute shtesë mujore",
    "monthly.amount": "Shuma e kontributit mujor",
    "investment.summary": "Përmbledhja e Investimit",
    "total.investment": "Investimi Total",
    "potential.return": "Kthimi Potencial",
    "total.value": "Vlera Totale",
    "calculation.disclaimer":
      "Këto llogaritje janë vlerësime bazuar në nivelin e zgjedhur të rrezikut dhe nuk garantojnë kthime në të ardhmen.",
    // Questionnaire
    "risk.questionnaire": "Pyetësor",
    "client.name": "Emri i Klientit",
    ssn: "SSN",
    "investment.knowledge": "Njohuritë tuaja për fondet e investimit janë:",
    "investment.horizon.question": "Cili është horizonti juaj i investimit?",
    "savings.percentage":
      "Çfarë përqindje të kursimeve tuaja përfaqëson ky investim?",
    "investment.preference": "Në përgjithësi, preferoj investime që janë:",
    select: "Zgjidhni",
    low: "Të ulëta",
    medium: "Mesatare",
    high: "Të larta",
    "up.to.1.year": "Deri në 1 vit",
    "1.to.3.years": "1-3 vjet",
    "over.3.years": "Mbi 3 vjet",
    "less.than.30": "Më pak se 30%",
    "30.to.60": "30-60%",
    "over.60": "Mbi 60%",
    conservative: "Konservative",
    balanced: "Të balancuara",
    aggressive: "Agresive",
    result: "Rezultati",
    "submit.data": "Dërgo të Dhënat",
    "result.conservative":
      "Fond Konservativ - Rrezik i Ulët (2/7) - Periudha e rekomanduar e investimit 1-2 vjet",
    "result.balanced":
      "Fond i Balancuar - Rrezik i Moderuar (4/7) - Periudha e rekomanduar e investimit 3-5 vjet",
    "result.aggressive":
      "Fond Rritjeje - Rrezik i Lartë (6/7) - Periudha e rekomanduar e investimit 5+ vjet",
    "please.complete.form":
      "Ju lutemi plotësoni dhe dorëzoni formularin fillimisht",
    "error.loading.questions": "Problem me marrjen e pyetjeve",
    "not.found": "Not Found",
    "ssn.not.found": "Klienti me këtë SSN nuk u gjet",
    // Progress Messages
    "progress.start": "Klikoni për të konfirmuar angazhimin tuaj",
    "progress.click1": "Fillim i mirë! Vazhdoni...",
    "progress.click2": "Po tregoni përkushtim!",
    "progress.click3": "Duke ndërtuar besimin...",
    "progress.click4": "Gjysma e rrugës!",
    "progress.click5": "Jeni këmbëngulës!",
    "progress.click6": "Pothuajse aty...",
    "progress.click7": "Vetëm edhe pak klikime!",
    "progress.click8": "Shumë afër tani!",
    "progress.click9": "Një klikim i fundit!",
    "progress.complete": "Keni fituar besimin tonë!",
    // Home
    welcome: "Mirë se vini në Udhëtimin tuaj të Investimit",
    "welcome.subtitle":
      "Zbuloni gamën tonë të fondeve të menaxhuara nga ekspertë të dizajnuara për të përmbushur qëllimet tuaja financiare. Filloni udhëtimin tuaj të investimit sot me udhëzimin tonë profesional.",
    "start.investing": "Filloni të Investoni Tani",
    "start.journey": "Filloni Udhëtimin Tuaj të Investimit",

    // Investment Options
    "investment.vehicles": "Investim në Automjete",
    "investment.vehicles.desc":
      "Investime strategjike në sektorët e automjeteve dhe transportit.",
    "precious.metals": "Metale të Çmuara",
    "precious.metals.desc":
      "Diversifikoni portofolin tuaj me ar dhe metale të tjera të çmuara.",
    "real.estate": "Pasuri të Paluajtshme",
    "real.estate.desc": "Investime në pronë me potencial për kthime të larta.",
    "energy.sector": "Sektori i Energjisë",
    "energy.sector.desc":
      "Opsione investimi në energji të qëndrueshme dhe tradicionale.",

    // Why Choose Us
    "why.choose": "Pse të Zgjidhni Platformën Tonë?",
    "flexible.options": "Opsione Fleksibël Investimi",
    "flexible.options.desc":
      "Filloni nga 5,000 Lekë ose 250 EUR pa tarifa hyrëse. Zgjidhni nivelin tuaj të investimit.",
    "performance.tracking": "Ndjekja e Performancës",
    "performance.tracking.desc":
      "Monitoroni investimet tuaja me analiza në kohë reale dhe raporte gjithëpërfshirëse.",
    "secure.platform": "Platformë e Sigurt",
    "secure.platform.desc":
      "Investimet tuaja janë të mbrojtura me masa sigurie të teknologjisë më të fundit.",

    // How It Works
    "how.works": "Si Funksionon",
    "easy.start": "E Lehtë për të Filluar",
    "easy.start.desc":
      "Krijoni llogarinë tuaj dhe filloni të investoni në minuta me procesin tonë të thjeshtë.",
    "regular.investments": "Investime të Rregullta",
    "regular.investments.desc":
      "Konfiguroni investime periodike ose bëni kontribute të njëhershme sipas dëshirës suaj.",
    "digital.management": "Menaxhim Dixhital",
    "digital.management.desc":
      "Menaxhoni portofolin tuaj kudo dhe kurdo me platformën tonë të lehtë për përdorim.",

    // Investment Info
    "investment.funds": "Përmbledhje",
    skip: "Kalo",
    "what.is.fund": "Çfarë është një Fond Investimi?",
    "fund.description":
      "Fondet e investimit ofrojnë një portofol të diversifikuar të menaxhuar nga ekspertë, duke grumbulluar paratë e investitorëve për të investuar në aksione dhe/ose obligacione, me kthime të ndara mes anëtarëve. Fondet ndryshojnë në objektiva, kthime, rrezik dhe monedhë. Përfitimet përfshijnë:",
    "professional.care": "Kujdes profesional për kursimet tuaja",
    "professional.care.desc": "Ekspertët rrisin kursimet tuaja.",
    "inflation.protection": "Mbrojtje nga inflacioni",
    "inflation.protection.desc":
      "Sigurohuni që kursimet tuaja të ecin në hap me rritjen e çmimeve.",
    "better.returns": "Kthime më të mira",
    "better.returns.desc": "Rendimente më të larta se depozitat tipike.",
    "flexibility.liquidity": "Fleksibilitet dhe likuiditet",
    "flexibility.liquidity.desc":
      "Shitni lehtësisht njësitë në çdo degë tonë ose investoni më shumë me pagesa të rregullta ose të njëhershme.",

    // Navigation
    back: "Kthehu",
    continue: "Vazhdo",

    // Investment Period
    "investment.period": "Periudha e Investimit",
    "period.description":
      "Konsideroni sa kohë jeni të gatshëm të investoni në një fond investimi. Një periudhë më e gjatë investimi do të thotë një periudhë më e gjatë për të arritur kthime jo vetëm në fondet e investuara por edhe në kthimet e realizuara më parë.",
    "give.time":
      "Jepini parave tuaja kohë të mjaftueshme për të fituar më shumë.",
    "time.description":
      "Para se të investoni në çdo fond, ju lutemi kontrolloni periudhën e rekomanduar të investimit. Sa më gjatë të investoni, aq më i lartë është potenciali për një kthim më të mirë.",

    // Investment Risk
    "investment.risk": "Rreziku i Investimit",
    "risk.description":
      "Ashtu si çmimet në dyqan, vlera e investimit tuaj mund të rritet dhe të bjerë me kushtet e tregut. Fondet me rrezik më të ulët japin kthime më të vogla, ndërsa fondet me rrezik më të lartë mund të japin më shumë. Rreziku varet nga instrumentet financiare, sektorët dhe tregjet ku janë investuar fondet.",
    "check.risk":
      "Kontrolloni Treguesin e Rrezikut/nivelin e fondit para se të investoni.",
    "risk.scale":
      "Shkalla e rrezikut të fondit ose SRRI vlerësohet në një shkallë nga 1 në 7 si më poshtë: 1-i ulët, 2-i ulët, 3-i pranueshëm, 4-i moderuar, 5-i rëndësishëm, 6-i lartë dhe 7-niveli më i lartë i rrezikut.",
    "need.support": "Keni nevojë për mbështetje? +042 282 3587",
    "download.app": "Shkarkoni Raiffeisen Youth për të vazhduar aplikimin",

    // Language
    "switch.language": "EN",

    // Login
    username: "Emri i përdoruesit",
    password: "Fjalëkalimi",
    "enter.username": "Vendosni emrin e përdoruesit",
    "enter.password": "Vendosni fjalëkalimin",
    login: "Hyr",
    "login.sso": "Hyr me SSO",
    "remember.me": "Më mbaj mend",
    "view.more": "Shiko më shumë",
    "applicant.details": "Detajet e aplikantit",
    "view.document": "Shiko",
    "download.document": "Shkarko",
    "investment.certificate": "Certifikata e investimit",
    "total.applicants": "Aplikantë Gjithsej",
    "filtered.applicants": "Aplikantët në Vitin e Zgjedhur",
    "fund.performance": "Performanca e Fondit",
    "fund.distribution": "Shpërndarja e Fondit",
    "average.performance": "Mesatarja",
    "best.fund": "Fondi më i mirë",
    "historic.trend": "Trendi Historik",
    "select.fund": "Zgjidh Fondin",
    "current.value": "Vlera Aktuale",
    "select.year": "Filtro sipas Vitit",
    all: "Të Gjithë",
    settings: "Cilësimet",
    funds: "Fondet",
    "questions.answers": "Pyetjet & Përgjigjet",
    name: "Emri",
    limit: "Limiti",
    active: "Aktiv",
    add: "Shto",
    "add.fund": "Shto Fond",
    answer: "Përgjigja",
    weight: "Pesha",
    actions: "Veprime",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("al");

  // Add persistence
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}