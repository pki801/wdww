import { useState } from "react";

const languages = [
  { code: "English", flag: "🇺🇸", label: "English" },
  { code: "Korean", flag: "🇰🇷", label: "한국어" },
  { code: "Spanish", flag: "🇪🇸", label: "Español" },
  { code: "Japanese", flag: "🇯🇵", label: "日本語" },
  { code: "French", flag: "🇫🇷", label: "Français" },
  { code: "Chinese", flag: "🇨🇳", label: "中文" },
  { code: "German", flag: "🇩🇪", label: "Deutsch" },
];

function LanguageSelector({ language, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const current = languages.find((l) => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
        style={{
          borderColor: "#E8845C",
          color: "#3D2C2C",
          backgroundColor: "#FAF7F2",
        }}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span className="text-xs">⏷</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 rounded-xl overflow-hidden z-10"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E4E7",
            minWidth: "160px",
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onChange(lang.code);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
              style={{ color: "#3D2C2C" }}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
