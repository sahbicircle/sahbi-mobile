import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const getRawLanguage = () => {
  try {
    const locales = Localization.getLocales?.();
    return locales?.[0]?.languageCode ?? locales?.[0]?.languageTag ?? "en";
  } catch {
    return "en";
  }
};

export const resources = {
  en: {
    translation: {
      splash: {
        title: "Welcome",
        subtitle: "Less Scrolling, More Living",
      },
      intro: {
        title: "Share Meals and Stories With Amazing New Friends",
        subtitle:
          "Enjoy meaningful conversations and delicious meals while connecting with amazing new friends",
        getStarted: "Get started",
        haveAccount: "I already have an account",
        terms: "By continuing you agree to our Terms and Privacy Policy",
      },
      login: {
        title: "The better we can match you with compatible people.",
        description:
          "Start building meaningful connections and take the first step towards something amazing.",
        email: "Email",
        password: "Password",
        cta: "Login",
        loggingIn: "Logging in...",
        noAccount: "Don't have an account? Register",
        forgotPassword: "Forgot password?",
        error: "Login failed",
      },
      forgotPassword: {
        title: "Forgot password?",
        description:
          "Enter your email and we'll send you a 6-digit code to reset your password.",
        emailRequired: "Email is required",
        codeSent:
          "If an account exists, a 6-digit code was sent to your email.",
        socialAccount: "This account uses Google or Apple sign-in.",
        error: "Something went wrong. Try again.",
        sending: "Sending...",
        cta: "Send code",
      },
      resetPassword: {
        title: "Reset password",
        description: "Enter the 6-digit code sent to",
        codePlaceholder: "6-digit code",
        newPassword: "New password (min 8 chars)",
        confirmPassword: "Confirm password",
        invalidCode: "Please enter the 6-digit code",
        shortPassword: "Password must be at least 8 characters",
        passwordMismatch: "Passwords do not match",
        error: "Invalid or expired code. Try again.",
        resetting: "Resetting...",
        cta: "Reset password",
        success: "Password reset!",
        redirect: "Redirecting to login...",
      },
      common: {
        next: "Next",
        cancel: "Cancel",
        finish: "Finish",
        sendCode: "Send code",
        done: "Done",
      },

      register: {
        welcomeTitle: "Welcome to Sahbi!",
        welcomeSubtitle: "Help us set the table right",
        welcomeDesc: "A few quick questions to match the right vibe.",
        letsGo: "Let's go!",
        alreadyAccount: "Already have an account?",

        createAccount: "Create your account",
        fullName: "Full name",
        email: "Email",
        password: "Password",
        passwordHint:
          "The password must be at least 8 characters long, include uppercase letters, numbers and symbols",

        firstName: "First Name",
        lastName: "Last Name",
        name: {
          title: "Name",
        },

        birthday: {
          title: "Birthday",
          placeholder: "Please select your birthday",
        },

        photos: {
          title: "Photos",
          add: "Add a photo",
        },

        phone: {
          title: "Phone number",
          placeholder: "+212612345678",
          sendCode: "Send code",
          sending: "Sending...",
          otpPlaceholder: "Enter 6-digit code",
          verify: "Verify",
          verifying: "Verifying...",
          changeNumber: "Change number",
          verified: "Phone verified",
        },

        gender: {
          title: "Select your gender",
          male: "Male",
          female: "Female",
          other: "Other",
          preferNotToSay: "Prefer not to say",
        },

        firstImpression: {
          title: "When people meet me, they usually think I am...",
          thoughtful: "Thoughtful",
          energetic: "Energetic",
          kind: "Kind",
        },

        selfView: {
          title: "I see myself as...",
          warmTalkative: "Warm & talkative",
          calmThoughtful: "Calm & thoughtful",
        },

        planningStyle: {
          title: "I plan my week...",
          carefully: "Carefully",
          goWithFlow: "Go with the flow",
        },

        rechargeStyle: {
          title: "I recharge best by...",
          cozyMoments: "Cozy moments",
          livelyEnergy: "Lively energy",
          meetNewFriends: "Meet new friends",
        },

        socialPreference: {
          title: "I usually say yes to...",
          newExperiences: "New experiences",
          familiarComfort: "Familiar comfort",
        },

        socialPace: {
          title: "When I meet new people, my pace is...",
          jumpRightIn: "Jump right in",
          takeItSlow: "Take it slow",
          preferFamiliar: "Prefer familiar faces",
        },

        conversationStart: {
          title: "When I meet new people, I usually start by...",
          askQuestions: "Ask questions",
          tellStories: "Tell stories",
          listen: "Listen",
        },

        talkStyle: {
          title: "I enjoy this kind of talk most...",
          lightJokes: "Light jokes",
          deepThoughts: "Deep thoughts",
          randomStories: "Random stories",
        },

        favoriteTopics: {
          title: "Topics I could talk about for hours",
          food: "Food",
          travel: "Travel",
          filmTv: "Film/TV",
          careerWork: "Career & work",
          personalGrowth: "Personal growth",
          healthFitness: "Health & fitness",
          relationships: "Relationships",
          humorJokes: "Humor & jokes",
        },

        relationshipStatus: {
          title: "What is your relationship status?",
          single: "Single",
          married: "Married",
          complicated: "It's complicated",
          inRelationship: "In a relationship",
          preferNotToSay: "Prefer not to say",
        },

        goalsFromSahbi: {
          title: "From Sahbi, I am most excited to...",
          meetNewFriends: "Meet new friends",
          funStories: "Have fun stories",
          goodFood: "Enjoy good food",
          notFeelLonely: "Not feel lonely",
        },

        dinnerStyle: {
          title: "I believe good social dinners are about...",
          connection: "Connection",
          taste: "Taste",
          surprise: "Surprise",
        },

        superpower: {
          title: "If I could have any superpower for a day...",
          placeholder: "Type here...",
        },

        workStatus: {
          title: "My current status is...",
          employed: "Employed",
          freelance: "Freelance/self-employed",
          student: "Student",
          betweenRoles: "Between roles",
          careGiving: "Homemaking & caregiving",
          preferNotToSay: "Prefer not to say",
        },
      },
    },
  },

  fr: {
    translation: {
      splash: {
        title: "Bienvenue",
        subtitle: "Moins de défilement, plus de vie",
      },
      intro: {
        title:
          "Partagez des repas et des histoires avec de nouveaux amis incroyables",
        subtitle:
          "Profitez de conversations enrichissantes et de délicieux repas tout en rencontrant de nouveaux amis",
        getStarted: "Commencer",
        haveAccount: "J'ai déjà un compte",
        terms:
          "En continuant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité",
      },
      login: {
        title:
          "Pour mieux vous mettre en relation avec des personnes compatibles.",
        description:
          "Commencez à créer des liens significatifs et faites le premier pas vers quelque chose d'incroyable.",
        email: "E-mail",
        password: "Mot de passe",
        cta: "Connexion",
        loggingIn: "Connexion en cours...",
        noAccount: "Vous n'avez pas de compte ? Inscrivez-vous",
        forgotPassword: "Mot de passe oublié ?",
        error: "Échec de la connexion",
      },
      forgotPassword: {
        title: "Mot de passe oublié ?",
        description:
          "Entrez votre e-mail et nous vous enverrons un code à 6 chiffres pour réinitialiser votre mot de passe.",
        emailRequired: "L'e-mail est requis",
        codeSent:
          "Si un compte existe, un code à 6 chiffres a été envoyé à votre e-mail.",
        socialAccount: "Ce compte utilise la connexion Google ou Apple.",
        error: "Une erreur s'est produite. Réessayez.",
        sending: "Envoi...",
        cta: "Envoyer le code",
      },
      resetPassword: {
        title: "Réinitialiser le mot de passe",
        description: "Entrez le code à 6 chiffres envoyé à",
        codePlaceholder: "Code à 6 chiffres",
        newPassword: "Nouveau mot de passe (min. 8 caractères)",
        confirmPassword: "Confirmer le mot de passe",
        invalidCode: "Veuillez entrer le code à 6 chiffres",
        shortPassword: "Le mot de passe doit contenir au moins 8 caractères",
        passwordMismatch: "Les mots de passe ne correspondent pas",
        error: "Code invalide ou expiré. Réessayez.",
        resetting: "Réinitialisation...",
        cta: "Réinitialiser le mot de passe",
        success: "Mot de passe réinitialisé !",
        redirect: "Redirection vers la connexion...",
      },
      common: {
        next: "Suivant",
        cancel: "Annuler",
        finish: "Terminer",
        sendCode: "Envoyer le code",
        done: "Terminé",
      },

      register: {
        welcomeTitle: "Bienvenue sur Sahbi !",
        welcomeSubtitle: "Aidez-nous à bien préparer la table",
        welcomeDesc: "Quelques questions rapides pour matcher la bonne vibe.",
        letsGo: "C’est parti !",
        alreadyAccount: "Vous avez déjà un compte ?",

        createAccount: "Créer votre compte",
        fullName: "Nom complet",
        email: "Email",
        password: "Mot de passe",
        passwordHint:
          "Le mot de passe doit comporter au moins 8 caractères, inclure des lettres majuscules, des chiffres et des symboles",

        firstName: "Prénom",
        lastName: "Nom",
        name: {
          title: "Nom",
        },

        birthday: {
          title: "Date de naissance",
          placeholder: "Veuillez sélectionner votre date de naissance",
        },

        photos: {
          title: "Photos",
          add: "Ajouter une photo",
        },

        phone: {
          title: "Numéro de téléphone",
          placeholder: "+212612345678",
          sendCode: "Envoyer le code",
          sending: "Envoi...",
          otpPlaceholder: "Code à 6 chiffres",
          verify: "Vérifier",
          verifying: "Vérification...",
          changeNumber: "Changer le numéro",
          verified: "Téléphone vérifié",
        },

        gender: {
          title: "Sélectionnez votre genre",
          male: "Homme",
          female: "Femme",
          other: "Autre",
          preferNotToSay: "Préfère ne pas dire",
        },

        firstImpression: {
          title: "Quand on me rencontre, on pense souvent que je suis...",
          thoughtful: "Réfléchi",
          energetic: "Énergique",
          kind: "Gentil",
        },

        selfView: {
          title: "Je me vois comme...",
          warmTalkative: "Chaleureux & bavard",
          calmThoughtful: "Calme & réfléchi",
        },

        planningStyle: {
          title: "Je planifie ma semaine...",
          carefully: "Soigneusement",
          goWithFlow: "Au feeling",
        },

        rechargeStyle: {
          title: "Je me ressource surtout en...",
          cozyMoments: "Moments cosy",
          livelyEnergy: "Énergie animée",
          meetNewFriends: "Rencontrer des gens",
        },

        socialPreference: {
          title: "Je dis généralement oui à...",
          newExperiences: "Nouvelles expériences",
          familiarComfort: "Confort familier",
        },

        socialPace: {
          title: "Quand je rencontre quelqu’un, mon rythme est...",
          jumpRightIn: "Je fonce",
          takeItSlow: "Je prends mon temps",
          preferFamiliar: "Je préfère les connus",
        },

        conversationStart: {
          title: "Quand je rencontre quelqu’un, je commence souvent par...",
          askQuestions: "Poser des questions",
          tellStories: "Raconter des histoires",
          listen: "Écouter",
        },

        talkStyle: {
          title: "J’aime surtout ce type de discussions...",
          lightJokes: "Blagues légères",
          deepThoughts: "Pensées profondes",
          randomStories: "Histoires random",
        },

        favoriteTopics: {
          title: "Des sujets dont je pourrais parler pendant des heures",
          food: "Cuisine",
          travel: "Voyage",
          filmTv: "Films / Séries",
          careerWork: "Carrière & travail",
          personalGrowth: "Développement personnel",
          healthFitness: "Santé & fitness",
          relationships: "Relations",
          humorJokes: "Humour & blagues",
        },

        relationshipStatus: {
          title: "Quel est votre statut relationnel ?",
          single: "Célibataire",
          married: "Marié(e)",
          complicated: "C’est compliqué",
          inRelationship: "En couple",
          preferNotToSay: "Préfère ne pas dire",
        },

        goalsFromSahbi: {
          title: "Avec Sahbi, je veux surtout...",
          meetNewFriends: "Rencontrer de nouveaux amis",
          funStories: "Vivre de belles histoires",
          goodFood: "Bien manger",
          notFeelLonely: "Ne plus me sentir seul(e)",
        },

        dinnerStyle: {
          title: "Pour moi, un bon dîner social c’est...",
          connection: "Connexion",
          taste: "Goût",
          surprise: "Surprise",
        },

        superpower: {
          title: "Si je pouvais avoir un super pouvoir pour une journée...",
          placeholder: "Écris ici...",
        },

        workStatus: {
          title: "Ma situation actuelle est...",
          employed: "Employé(e)",
          freelance: "Freelance / Indépendant",
          student: "Étudiant(e)",
          betweenRoles: "Entre deux emplois",
          careGiving: "Foyer & aidant(e)",
          preferNotToSay: "Préfère ne pas dire",
        },
      },
    },
  },

  ar: {
    translation: {
      splash: {
        title: "مرحباً",
        subtitle: "تمرير أقل، حياة أكثر",
      },
      intro: {
        title: "شارك الوجبات والقصص مع أصدقاء جدد رائعين",
        subtitle:
          "استمتع بمحادثات ذات معنى ووجبات لذيذة أثناء التواصل مع أصدقاء جدد رائعين",
        getStarted: "ابدأ الآن",
        haveAccount: "لدي حساب بالفعل",
        terms: "بالمتابعة، فإنك توافق على الشروط وسياسة الخصوصية الخاصة بنا",
      },
      login: {
        title: "لنساعدك في التواصل مع أشخاص متوافقين بشكل أفضل.",
        description:
          "ابدأ ببناء علاقات ذات معنى واتخذ الخطوة الأولى نحو شيء رائع.",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        cta: "تسجيل الدخول",
        loggingIn: "جارٍ تسجيل الدخول...",
        noAccount: "ليس لديك حساب؟ سجل الآن",
        forgotPassword: "نسيت كلمة المرور؟",
        error: "فشل تسجيل الدخول",
      },
      forgotPassword: {
        title: "نسيت كلمة المرور؟",
        description:
          "أدخل بريدك الإلكتروني وسنرسل لك رمزاً مكوناً من 6 أرقام لإعادة تعيين كلمة المرور.",
        emailRequired: "البريد الإلكتروني مطلوب",
        codeSent:
          "إذا كان الحساب موجوداً، تم إرسال رمز مكون من 6 أرقام إلى بريدك الإلكتروني.",
        socialAccount: "هذا الحساب يستخدم تسجيل الدخول عبر Google أو Apple.",
        error: "حدث خطأ. حاول مرة أخرى.",
        sending: "جارٍ الإرسال...",
        cta: "إرسال الرمز",
      },
      resetPassword: {
        title: "إعادة تعيين كلمة المرور",
        description: "أدخل الرمز المكون من 6 أرقام المرسل إلى",
        codePlaceholder: "الرمز المكون من 6 أرقام",
        newPassword: "كلمة المرور الجديدة (8 أحرف على الأقل)",
        confirmPassword: "تأكيد كلمة المرور",
        invalidCode: "يرجى إدخال الرمز المكون من 6 أرقام",
        shortPassword: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
        passwordMismatch: "كلمات المرور غير متطابقة",
        error: "رمز غير صالح أو منتهي الصلاحية. حاول مرة أخرى.",
        resetting: "جارٍ إعادة التعيين...",
        cta: "إعادة تعيين كلمة المرور",
        success: "تم إعادة تعيين كلمة المرور!",
        redirect: "التحويل إلى تسجيل الدخول...",
      },
      common: {
        next: "التالي",
        cancel: "إلغاء",
        finish: "إنهاء",
        sendCode: "إرسال الرمز",
        done: "تم",
      },

      register: {
        welcomeTitle: "مرحباً بك في صاحبي!",
        welcomeSubtitle: "خلينا نضبط الطاولة صح",
        welcomeDesc: "بعض الأسئلة السريعة لنطابق الأجواء المناسبة.",
        letsGo: "لنبدأ!",
        alreadyAccount: "لديك حساب بالفعل؟",

        createAccount: "أنشئ حسابك",
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        passwordHint:
          "يجب أن يتكون كلمة المرور من 8 أحرف على الأقل ويحتوي على أحرف أبجدية وأرقام ورمز خاص",

        firstName: "الاسم الأول",
        lastName: "الاسم الأخير",
        name: {
          title: "الاسم",
        },

        birthday: {
          title: "تاريخ الميلاد",
          placeholder: "الرجاء اختيار تاريخ ميلادك",
        },

        photos: {
          title: "الصور",
          add: "إضافة صورة",
        },

        phone: {
          title: "رقم الهاتف",
          placeholder: "+212612345678",
          sendCode: "إرسال الرمز",
          sending: "جارٍ الإرسال...",
          otpPlaceholder: "الرمز المكون من 6 أرقام",
          verify: "تحقق",
          verifying: "جارٍ التحقق...",
          changeNumber: "تغيير الرقم",
          verified: "تم التحقق من الهاتف",
        },

        gender: {
          title: "اختر جنسك",
          male: "ذكر",
          female: "أنثى",
          other: "آخر",
          preferNotToSay: "أفضل عدم القول",
        },

        firstImpression: {
          title: "عندما يقابلني الناس لأول مرة، غالباً يعتقدون أنني...",
          thoughtful: "متفهم",
          energetic: "نشيط",
          kind: "لطيف",
        },

        selfView: {
          title: "أرى نفسي كـ...",
          warmTalkative: "ودود ومتحدث",
          calmThoughtful: "هادئ ومفكر",
        },

        planningStyle: {
          title: "أخطط أسبوعي...",
          carefully: "بعناية",
          goWithFlow: "حسب الظروف",
        },

        rechargeStyle: {
          title: "أستعيد طاقتي أفضل عبر...",
          cozyMoments: "لحظات هادئة",
          livelyEnergy: "أجواء حيوية",
          meetNewFriends: "مقابلة أشخاص جدد",
        },

        socialPreference: {
          title: "عادة أقول نعم لـ...",
          newExperiences: "تجارب جديدة",
          familiarComfort: "راحة مألوفة",
        },

        socialPace: {
          title: "عندما أتعرف على أشخاص جدد، وتيرتي تكون...",
          jumpRightIn: "أبدأ فوراً",
          takeItSlow: "آخذ وقتي",
          preferFamiliar: "أفضل الوجوه المألوفة",
        },

        conversationStart: {
          title: "عندما ألتقي بشخص جديد، عادة أبدأ بـ...",
          askQuestions: "طرح أسئلة",
          tellStories: "سرد قصص",
          listen: "الاستماع",
        },

        talkStyle: {
          title: "أستمتع أكثر بهذا النوع من الحديث...",
          lightJokes: "نكت خفيفة",
          deepThoughts: "أفكار عميقة",
          randomStories: "قصص عشوائية",
        },

        favoriteTopics: {
          title: "مواضيع أستطيع التحدث عنها لساعات",
          food: "الطعام",
          travel: "السفر",
          filmTv: "الأفلام / المسلسلات",
          careerWork: "العمل والمهنة",
          personalGrowth: "تطوير الذات",
          healthFitness: "الصحة واللياقة",
          relationships: "العلاقات",
          humorJokes: "الفكاهة والنكت",
        },

        relationshipStatus: {
          title: "ما هي حالتك العاطفية؟",
          single: "أعزب",
          married: "متزوج",
          complicated: "الأمر معقد",
          inRelationship: "في علاقة",
          preferNotToSay: "أفضل عدم القول",
        },

        goalsFromSahbi: {
          title: "من صاحبي، أكثر شيء متحمس له هو...",
          meetNewFriends: "مقابلة أصدقاء جدد",
          funStories: "صناعة ذكريات جميلة",
          goodFood: "الاستمتاع بالطعام",
          notFeelLonely: "عدم الشعور بالوحدة",
        },

        dinnerStyle: {
          title: "برأيي العشاء الاجتماعي الجيد يتمحور حول...",
          connection: "التواصل",
          taste: "الطعم",
          surprise: "المفاجأة",
        },

        superpower: {
          title: "لو كان لدي قوة خارقة ليوم واحد...",
          placeholder: "اكتب هنا...",
        },

        workStatus: {
          title: "وضعي الحالي هو...",
          employed: "موظف",
          freelance: "عمل حر",
          student: "طالب",
          betweenRoles: "بين وظائف",
          careGiving: "رعاية منزلية",
          preferNotToSay: "أفضل عدم القول",
        },
      },
    },
  },
};

const deviceLanguage = getRawLanguage().split("-")[0].toLowerCase() || "en";

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: "en",
  compatibilityJSON: "v3",
  interpolation: { escapeValue: false },

  load: "languageOnly",

  saveMissing: __DEV__,
  missingKeyHandler: __DEV__
    ? (lng, ns, key) =>
        console.warn(`[i18n] Missing key: "${key}" for lang: "${lng}"`)
    : undefined,
});

// import { I18nManager } from "react-native";
// if (deviceLanguage === "ar") I18nManager.forceRTL(true);

export default i18n;
