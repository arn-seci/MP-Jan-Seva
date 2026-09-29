export type Language = "en" | "hi"

export type StatusKey = "default" | "success" | "warning" | "error"

type StatusContent = {
  title: string
  subtitle: string
}

type Translation = {
  langLabel: string
  appTitle: string
  appSubtitle: string
  locationTitle: string
  latitude: string
  longitude: string
  accuracy: string
  recordHelper: string
  recordingHelper: string
  processingHelper: string
  tapToStop: string
  statusHeading: string
  status: Record<StatusKey, StatusContent>
  submit: string
  submitting: string
  recordAgain: string
  errors: {
    fileTooLarge: string
    micDenied: string
    locationDenied: string
    uploadFailed: string
  }
}

export const translations: Record<Language, Translation> = {
  en: {
    langLabel: "English",
    appTitle: "Madhya Pradesh Jan Seva",
    appSubtitle: "Citizen Voice Reporting",
    locationTitle: "Captured Location",
    latitude: "Latitude",
    longitude: "Longitude",
    accuracy: "Accuracy",
    recordHelper: "Tap microphone to record",
    recordingHelper: "Listening... tap to stop",
    processingHelper: "Submitting your report...",
    tapToStop: "Tap to stop",
    statusHeading: "Report Status",
    status: {
      default: {
        title: "Ready to submit your voice report",
        subtitle: "Your report will be sent to the nearest office",
      },
      success: {
        title: "Ticket Registered - Thank you!",
        subtitle: "Ticket ID: MP-2026-084213",
      },
      warning: {
        title: "Duplicate Found nearby",
        subtitle: "A similar case is already registered near you",
      },
      error: {
        title: "Could not submit report",
        subtitle: "Please check your connection and try again",
      },
    },
    submit: "Submit Report",
    submitting: "Submitting...",
    recordAgain: "Record Again",
    errors: {
      fileTooLarge: "Recording is too large (max 25 MB). Please record a shorter message.",
      micDenied: "Microphone access was denied. Please allow it to record.",
      locationDenied: "Location access was denied. Please enable location to submit.",
      uploadFailed: "Upload failed. Please try again.",
    },
  },
  hi: {
    langLabel: "हिंदी",
    appTitle: "मध्य प्रदेश जन सेवा",
    appSubtitle: "नागरिक आवाज़ रिपोर्टिंग",
    locationTitle: "प्राप्त स्थान",
    latitude: "अक्षांश",
    longitude: "देशांतर",
    accuracy: "सटीकता",
    recordHelper: "रिकॉर्डिंग के लिए माइक दबाएं",
    recordingHelper: "सुन रहे हैं... रोकने के लिए दबाएं",
    processingHelper: "आपकी रिपोर्ट भेजी जा रही है...",
    tapToStop: "रोकने के लिए दबाएं",
    statusHeading: "रिपोर्ट स्थिति",
    status: {
      default: {
        title: "अपनी आवाज़ में रिपोर्ट दर्ज करें",
        subtitle: "आपकी रिपोर्ट नज़दीकी कार्यालय को भेजी जाएगी",
      },
      success: {
        title: "टिकट दर्ज हो गया - धन्यवाद!",
        subtitle: "टिकट आईडी: MP-2026-084213",
      },
      warning: {
        title: "पास में ही समान मामला दर्ज है!",
        subtitle: "आपके पास पहले से एक समान मामला दर्ज है",
      },
      error: {
        title: "रिपोर्ट दर्ज नहीं हो सकी",
        subtitle: "कृपया अपना कनेक्शन जांचें और फिर से प्रयास करें",
      },
    },
    submit: "रिपोर्ट भेजें",
    submitting: "भेजा जा रहा है...",
    recordAgain: "फिर से रिकॉर्ड करें",
    errors: {
      fileTooLarge: "रिकॉर्डिंग बहुत बड़ी है (अधिकतम 25 MB)। कृपया छोटा संदेश रिकॉर्ड करें।",
      micDenied: "माइक्रोफ़ोन की अनुमति नहीं मिली। रिकॉर्ड करने के लिए अनुमति दें।",
      locationDenied: "स्थान की अनुमति नहीं मिली। रिपोर्ट भेजने के लिए स्थान चालू करें।",
      uploadFailed: "अपलोड विफल रहा। कृपया फिर से प्रयास करें।",
    },
  },
}
