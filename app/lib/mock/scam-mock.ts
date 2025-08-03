import type { Scam } from "./types";

export const mockScams: Scam[] = [
  {
    id: "1",
    scam_id: "scam-a1b2c3",
    title: "Fake JazzCash Agent Scam at Hakla Rest Area",
    content:
      "I was traveling from Islamabad to Peshawar during the last Ramzan. I stopped at the Hakla rest area to fill up my tank. As I was leaving the rest area, a white GLI 2017 model pulled up at the end. The man put his arm out and asked me to stop. I stopped out of courtesy and because it was Ramzan and you get extra rewards for helping needy people. He claimed to be a JazzCash agent and said he needed to verify my account. He asked for my phone and OTP. I was stupid enough to give it. Lost 50,000 rupees. Be careful at rest areas!",
    type: "mobile-banking",
    platform: ["JazzCash", "WhatsApp"],
    location: ["Islamabad", "Peshawar", "Hakla"],
    victim: {
      username: "AnonymousVictim",
      anonymous: true,
    },
    evidence_urls: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    ],
    upvotes: 127,
    comments: [
      {
        id: "c1",
        content:
          "Same thing happened to me at Sialkot rest area! They're everywhere now.",
        poster: {
          username: "Zain Ali",
        },
      },
      {
        id: "c2",
        content:
          "Never give your phone to strangers, especially at rest areas. Thanks for sharing.",
        poster: {
          username: "Ahmed Khan",
        },
      },
    ],
  },
  {
    id: "2",
    scam_id: "scam-d4e5f6",
    title: "Fake Job Offer - Advance Fee Scam",
    content:
      'Got a job offer from "Tech Solutions Pakistan" on LinkedIn. They offered 80k salary for a remote position. They asked for 5000 rupees for "documentation fees" and 3000 for "background verification". I paid both amounts. After that, they asked for 10,000 more for "training materials". That\'s when I realized it was a scam. They blocked me everywhere. Lost 8000 rupees. Never pay money to get a job!',
    type: "job-scams",
    platform: ["LinkedIn", "WhatsApp", "Email"],
    location: ["Karachi", "Online"],
    victim: {
      username: "JobSeeker2024",
      anonymous: false,
    },
    evidence_urls: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    ],
    upvotes: 89,
    comments: [
      {
        id: "c3",
        content:
          "I got the same offer! They use different company names but same pattern.",
        poster: {
          username: "Sara Ahmed",
        },
      },
    ],
  },
  {
    id: "3",
    scam_id: "scam-g7h8i9",
    title: "Fake Property Plot in DHA Phase 8",
    content:
      'Someone on Facebook Marketplace was selling a plot in DHA Phase 8 for 2.5 crore. The price was too good to be true. I contacted them and they showed me fake documents. They asked for 5 lakh advance to "reserve" the plot. I almost fell for it but decided to verify with DHA office first. The plot number didn\'t exist! They had fake stamps and everything. Be very careful with property deals.',
    type: "property",
    platform: ["Facebook Marketplace", "WhatsApp"],
    location: ["Lahore", "DHA"],
    victim: {
      username: "PropertyBuyer",
      anonymous: true,
    },
    evidence_urls: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    ],
    upvotes: 156,
    comments: [
      {
        id: "c4",
        content:
          "Always verify with the relevant authority before paying any money.",
        poster: {
          username: "RealEstateExpert",
        },
      },
      {
        id: "c5",
        content:
          "Same scam happening in Bahria Town too. They use fake documents.",
        poster: {
          username: "LahoreResident",
        },
      },
    ],
  },
  {
    id: "4",
    scam_id: "scam-j1k2l3",
    title: "Fake EasyPaisa Cashback Scam",
    content:
      "Got a message saying I won 50,000 rupees cashback from EasyPaisa. The link looked official but was fake. I entered my phone number and they sent an OTP. I entered it and they immediately withdrew 25,000 from my account. The message looked exactly like official EasyPaisa messages. Always verify with official sources!",
    type: "mobile-banking",
    platform: ["EasyPaisa", "SMS", "WhatsApp"],
    location: ["Islamabad"],
    victim: {
      username: "MobileUser",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 203,
    comments: [
      {
        id: "c6",
        content:
          "Never click on links in SMS messages, even if they look official.",
        poster: {
          username: "CyberSecurityGuy",
        },
      },
    ],
  },
  {
    id: "5",
    scam_id: "scam-m4n5o6",
    title: "Fake Online Shopping - Ghost Seller",
    content:
      'Ordered a Samsung phone from "Electronics Pakistan" on Facebook. The page looked legit with thousands of followers. Paid 45,000 through bank transfer. They sent me a fake tracking number. After 2 weeks, the page disappeared. The phone never came. Lost 45,000 rupees. Always use COD or verified platforms.',
    type: "online-shopping",
    platform: ["Facebook", "Instagram"],
    location: ["Karachi", "Online"],
    victim: {
      username: "OnlineShopper",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 178,
    comments: [
      {
        id: "c7",
        content:
          "Same happened to me with a laptop. These fake pages are everywhere.",
        poster: {
          username: "TechBuyer",
        },
      },
      {
        id: "c8",
        content:
          "Always check if the page is verified and use COD for expensive items.",
        poster: {
          username: "SafeShopper",
        },
      },
    ],
  },
  {
    id: "6",
    scam_id: "scam-p7q8r9",
    title: "Fake Investment Scheme - Crypto Scam",
    content:
      'Someone on WhatsApp offered me a "guaranteed" investment scheme. They promised 20% monthly returns on crypto trading. I invested 100,000 rupees. First month I got 20,000 back. I invested more. Second month, they asked for more money to "maintain the account". I refused and they blocked me. Lost 80,000 rupees. No investment guarantees 20% monthly returns!',
    type: "investment",
    platform: ["WhatsApp", "Telegram"],
    location: ["Lahore", "Online"],
    victim: {
      username: "Investor2024",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 145,
    comments: [
      {
        id: "c9",
        content: "If it sounds too good to be true, it probably is.",
        poster: {
          username: "FinanceExpert",
        },
      },
    ],
  },
  {
    id: "7",
    scam_id: "scam-s1t2u3",
    title: "Fake University Admission Scam",
    content:
      'Applied for admission in "International University of Technology" online. They asked for 50,000 rupees admission fee. I paid through bank transfer. They sent me fake admission letter and student ID. When I tried to contact the university directly, they said they never heard of this institution. Lost 50,000 rupees. Always verify universities with HEC.',
    type: "education",
    platform: ["Website", "Email", "WhatsApp"],
    location: ["Islamabad", "Online"],
    victim: {
      username: "Student2024",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 92,
    comments: [
      {
        id: "c10",
        content: "Always check HEC website for recognized universities.",
        poster: {
          username: "EducationAdvisor",
        },
      },
    ],
  },
  {
    id: "8",
    scam_id: "scam-v4w5x6",
    title: "Fake Romance Scam - Catfishing",
    content:
      'Met someone on Tinder who claimed to be a doctor in Dubai. We talked for 3 months. She asked for money to visit Pakistan. I sent 100,000 rupees for "visa and ticket". She never came. Later found out the photos were fake and she was actually a man from Nigeria. Lost 100,000 rupees and my heart. Be careful with online relationships.',
    type: "romance",
    platform: ["Tinder", "WhatsApp", "Instagram"],
    location: ["Dubai", "Online"],
    victim: {
      username: "Heartbroken",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 167,
    comments: [
      {
        id: "c11",
        content: "Never send money to someone you haven't met in person.",
        poster: {
          username: "LoveExpert",
        },
      },
    ],
  },
  {
    id: "9",
    scam_id: "scam-y7z8a9",
    title: "Fake Bank Call Scam",
    content:
      'Got a call from someone claiming to be from HBL. They said my account was compromised and I needed to transfer money to a "safe account". They sounded very professional and had my basic details. I almost fell for it but decided to call HBL directly. They said they never call customers for such requests. Be very careful with bank calls!',
    type: "mobile-banking",
    platform: ["Phone Call", "SMS"],
    location: ["Karachi"],
    victim: {
      username: "BankCustomer",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 134,
    comments: [
      {
        id: "c12",
        content: 'Banks never ask you to transfer money to "safe accounts".',
        poster: {
          username: "BankingExpert",
        },
      },
    ],
  },
  {
    id: "10",
    scam_id: "scam-b1c2d3",
    title: "Fake Freelancing Job Scam",
    content:
      "Applied for a graphic design job on a freelancing platform. Client asked me to create a logo for 5000 rupees. I delivered the work. They said they sent payment but I never received it. They kept asking for more work. Later found out they were using fake payment screenshots. Lost 5000 rupees and my time. Always use escrow services.",
    type: "job-scams",
    platform: ["Freelancing Platform", "WhatsApp"],
    location: ["Online"],
    victim: {
      username: "Freelancer",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 78,
    comments: [
      {
        id: "c13",
        content: "Always use platform escrow services for protection.",
        poster: {
          username: "FreelanceExpert",
        },
      },
    ],
  },
  {
    id: "11",
    scam_id: "scam-e4f5g6",
    title: "Fake Car Sale Scam",
    content:
      'Found a Honda City 2018 for sale on OLX for 1.8 crore. The price was very low. I contacted the seller. They asked for 50,000 advance to "reserve" the car. I paid through bank transfer. When I went to see the car, the address was fake. The seller blocked me. Lost 50,000 rupees. Always see the car before paying anything.',
    type: "online-shopping",
    platform: ["OLX", "WhatsApp"],
    location: ["Lahore"],
    victim: {
      username: "CarBuyer",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 112,
    comments: [
      {
        id: "c14",
        content: "If the price is too good to be true, it's probably a scam.",
        poster: {
          username: "CarExpert",
        },
      },
    ],
  },
  {
    id: "12",
    scam_id: "scam-h7i8j9",
    title: "Fake Insurance Policy Scam",
    content:
      'Someone called claiming to be from State Life Insurance. They offered me a "special" life insurance policy with 50% discount. I paid 25,000 rupees for the policy. They sent me fake documents. When I tried to claim, I found out the policy number was fake. Lost 25,000 rupees. Always verify with official insurance companies.',
    type: "investment",
    platform: ["Phone Call", "WhatsApp"],
    location: ["Islamabad"],
    victim: {
      username: "InsuranceBuyer",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 89,
    comments: [
      {
        id: "c15",
        content: "Insurance companies don't offer 50% discounts randomly.",
        poster: {
          username: "InsuranceExpert",
        },
      },
    ],
  },
  {
    id: "13",
    scam_id: "scam-k1l2m3",
    title: "Fake Restaurant Delivery Scam",
    content:
      'Ordered food from "Pizza Hut" on a fake website. The website looked exactly like the real one. I paid 2000 rupees through credit card. The food never came. Later found out it was a fake website. They stole my credit card details too. Lost 2000 rupees and had to cancel my card. Always use official apps.',
    type: "online-shopping",
    platform: ["Fake Website", "Credit Card"],
    location: ["Karachi", "Online"],
    victim: {
      username: "FoodLover",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 156,
    comments: [
      {
        id: "c16",
        content:
          "Always check the URL carefully. Fake sites often have slight differences.",
        poster: {
          username: "CyberSecurityGuy",
        },
      },
    ],
  },
  {
    id: "14",
    scam_id: "scam-n4o5p6",
    title: "Fake Visa Consultant Scam",
    content:
      'Contacted a visa consultant for UK student visa. They asked for 100,000 rupees for "processing fees". I paid the amount. They sent me fake documents and visa application. When I submitted to British High Commission, they rejected it because the documents were fake. Lost 100,000 rupees. Always use registered consultants.',
    type: "education",
    platform: ["Website", "WhatsApp"],
    location: ["Lahore"],
    victim: {
      username: "VisaApplicant",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 123,
    comments: [
      {
        id: "c17",
        content:
          "Always check if the consultant is registered with relevant authorities.",
        poster: {
          username: "VisaExpert",
        },
      },
    ],
  },
  {
    id: "15",
    scam_id: "scam-q7r8s9",
    title: "Fake Lottery Win Scam",
    content:
      'Got an email saying I won 50 lakh rupees in a lottery. They asked for 50,000 rupees as "processing fee" to release the prize. I almost fell for it but decided to research. Found out it was a common scam. They would have taken my money and disappeared. Never pay money to claim prizes!',
    type: "other",
    platform: ["Email", "WhatsApp"],
    location: ["Online"],
    victim: {
      username: "LotteryWinner",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 98,
    comments: [
      {
        id: "c18",
        content: "You can't win a lottery you never entered.",
        poster: {
          username: "CommonSense",
        },
      },
    ],
  },
  {
    id: "16",
    scam_id: "scam-t1u2v3",
    title: "Fake Mobile Phone Sale Scam",
    content:
      "Bought an iPhone 14 from a seller on Facebook for 150,000 rupees. The price was reasonable. I paid through bank transfer. They sent me a fake tracking number. The phone never came. The seller blocked me everywhere. Lost 150,000 rupees. Always meet in person for expensive items.",
    type: "online-shopping",
    platform: ["Facebook", "WhatsApp"],
    location: ["Islamabad"],
    victim: {
      username: "PhoneBuyer",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 145,
    comments: [
      {
        id: "c19",
        content: "Always meet in a safe public place for expensive purchases.",
        poster: {
          username: "SafeBuyer",
        },
      },
    ],
  },
  {
    id: "17",
    scam_id: "scam-w4x5y6",
    title: "Fake Charity Scam",
    content:
      "Someone came to my door claiming to be from Edhi Foundation. They asked for donations for flood victims. I gave them 5000 rupees. Later found out they were fake and not affiliated with Edhi. Lost 5000 rupees. Always verify charity workers and donate through official channels.",
    type: "other",
    platform: ["Door-to-Door"],
    location: ["Karachi"],
    victim: {
      username: "CharityDonor",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 167,
    comments: [
      {
        id: "c20",
        content: "Always ask for official ID and verify with the organization.",
        poster: {
          username: "CharityExpert",
        },
      },
    ],
  },
  {
    id: "18",
    scam_id: "scam-z7a8b9",
    title: "Fake Online Course Scam",
    content:
      'Enrolled in an "Advanced Web Development" course online for 30,000 rupees. The course promised job placement. I paid the amount. The course material was copied from YouTube. No job placement was provided. Lost 30,000 rupees. Always research course providers thoroughly.',
    type: "education",
    platform: ["Website", "WhatsApp"],
    location: ["Online"],
    victim: {
      username: "Student2024",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 89,
    comments: [
      {
        id: "c21",
        content: "Check reviews and verify course content before enrolling.",
        poster: {
          username: "EducationExpert",
        },
      },
    ],
  },
  {
    id: "19",
    scam_id: "scam-c1d2e3",
    title: "Fake Travel Package Scam",
    content:
      "Booked a Dubai tour package for 150,000 rupees through a travel agent. The agent had a nice office and seemed professional. I paid the full amount. When the travel date came, the agent disappeared. The tickets were fake. Lost 150,000 rupees. Always use registered travel agents.",
    type: "online-shopping",
    platform: ["Travel Agency", "WhatsApp"],
    location: ["Lahore"],
    victim: {
      username: "Traveler",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 134,
    comments: [
      {
        id: "c22",
        content:
          "Always verify travel agents with PTA (Pakistan Tourism Authority).",
        poster: {
          username: "TravelExpert",
        },
      },
    ],
  },
  {
    id: "20",
    scam_id: "scam-f4g5h6",
    title: "Fake Crypto Investment Scam",
    content:
      'Invested 200,000 rupees in a "guaranteed" crypto trading bot. They promised 15% monthly returns. I invested and got some returns initially. Then they asked for more money to "upgrade the system". I invested more. Suddenly the platform disappeared. Lost 200,000 rupees. Crypto investments are highly risky.',
    type: "investment",
    platform: ["Website", "Telegram"],
    location: ["Online"],
    victim: {
      username: "CryptoInvestor",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 178,
    comments: [
      {
        id: "c23",
        content:
          "No investment guarantees returns. Be very careful with crypto.",
        poster: {
          username: "FinanceExpert",
        },
      },
    ],
  },
  {
    id: "21",
    scam_id: "scam-i7j8k9",
    title: "Fake Medical Equipment Scam",
    content:
      'Someone called claiming to be from a medical supply company. They offered me a "special deal" on medical equipment for my clinic. I ordered equipment worth 100,000 rupees. I paid the amount. The equipment never came. The company was fake. Lost 100,000 rupees. Always verify medical suppliers.',
    type: "online-shopping",
    platform: ["Phone Call", "Email"],
    location: ["Karachi"],
    victim: {
      username: "Doctor",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 112,
    comments: [
      {
        id: "c24",
        content: "Always verify medical suppliers with relevant authorities.",
        poster: {
          username: "MedicalExpert",
        },
      },
    ],
  },
  {
    id: "22",
    scam_id: "scam-l1m2n3",
    title: "Fake Social Media Account Scam",
    content:
      "Someone created a fake Instagram account using my photos. They contacted my friends asking for money, claiming I was in an emergency. Several friends sent money. I only found out when a friend called me. Lost reputation and friends lost money. Be careful with social media privacy.",
    type: "other",
    platform: ["Instagram", "WhatsApp"],
    location: ["Online"],
    victim: {
      username: "SocialMediaUser",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 145,
    comments: [
      {
        id: "c25",
        content: "Always verify emergency requests through other means.",
        poster: {
          username: "PrivacyExpert",
        },
      },
    ],
  },
  {
    id: "23",
    scam_id: "scam-o4p5q6",
    title: "Fake Home Repair Scam",
    content:
      "Someone came to my house claiming to be a plumber. They said there was a serious plumbing issue and needed immediate repair. I let them in. They did some fake work and charged me 15,000 rupees. Later found out there was no real issue. Lost 15,000 rupees. Always verify workers.",
    type: "other",
    platform: ["Door-to-Door"],
    location: ["Islamabad"],
    victim: {
      username: "HomeOwner",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 98,
    comments: [
      {
        id: "c26",
        content: "Always get multiple quotes and verify workers' credentials.",
        poster: {
          username: "HomeExpert",
        },
      },
    ],
  },
  {
    id: "24",
    scam_id: "scam-r7s8t9",
    title: "Fake Online Gaming Scam",
    content:
      "Joined a PUBG tournament online. The organizers asked for 5000 rupees entry fee. I paid the amount. The tournament was fake and never happened. The organizers disappeared. Lost 5000 rupees. Always verify online gaming tournaments.",
    type: "other",
    platform: ["Discord", "WhatsApp"],
    location: ["Online"],
    victim: {
      username: "Gamer",
      anonymous: false,
    },
    evidence_urls: [],
    upvotes: 67,
    comments: [
      {
        id: "c27",
        content: "Most legitimate gaming tournaments are free to enter.",
        poster: {
          username: "GamingExpert",
        },
      },
    ],
  },
  {
    id: "25",
    scam_id: "scam-u1v2w3",
    title: "Fake Online Dating Scam",
    content:
      "Met someone on Bumble who claimed to be a businesswoman. We talked for 2 months. She asked for money to help her business. I sent 50,000 rupees. She kept asking for more. I found out she was using fake photos. Lost 50,000 rupees. Be careful with online dating.",
    type: "romance",
    platform: ["Bumble", "WhatsApp"],
    location: ["Online"],
    victim: {
      username: "DatingUser",
      anonymous: true,
    },
    evidence_urls: [],
    upvotes: 123,
    comments: [
      {
        id: "c28",
        content: "Never send money to someone you met online.",
        poster: {
          username: "DatingExpert",
        },
      },
    ],
  },
  {
    id: "26",
    scam_id: "scam-x4y5z6",
    title: "Emotional Dhoka - Girlfriend Scam with Fake Love",
    content:
      "Met a girl on Instagram who seemed perfect. We talked for 6 months, she claimed to be from Lahore but working in Dubai. She would call me daily, send me gifts, and talk about our future together. She said she loved me and wanted to marry me. After 6 months, she started asking for money - first 50,000 for 'visa renewal', then 100,000 for 'medical emergency', then 200,000 for 'business investment'. I sent her total 350,000 rupees over 3 months. Then she suddenly blocked me everywhere. Later found out she was actually a man from Nigeria using fake photos. Lost 350,000 rupees and my heart. This emotional dhoka destroyed me completely. Never trust someone you haven't met in person, no matter how much they say they love you.",
    type: "romance",
    platform: ["Instagram", "WhatsApp", "Telegram"],
    location: ["Lahore", "Dubai", "Online"],
    victim: {
      username: "HeartbrokenSoul",
      anonymous: true,
    },
    evidence_urls: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    ],
    upvotes: 234,
    comments: [
      {
        id: "c29",
        content:
          "Same thing happened to me! These emotional scammers are the worst. They play with your heart and take your money.",
        poster: {
          username: "AnotherVictim",
        },
      },
      {
        id: "c30",
        content:
          "Never send money to someone you haven't met in person, no matter how much they claim to love you.",
        poster: {
          username: "LoveExpert",
        },
      },
      {
        id: "c31",
        content:
          "The emotional manipulation is the worst part. They make you feel special just to take your money.",
        poster: {
          username: "PsychologyGuy",
        },
      },
    ],
  },
];
