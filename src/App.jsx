import PreferenceForm from "./components/PreferenceForm";
import LoadingScreen from "./components/LoadingScreen";
import LanguageSelector from "./components/LanguageSelector";
import { useState } from "react";
import { searchMovie, getWatchProviders } from "./api/tmdb";
import wdwwLogo from "./assets/wdww-logo.png";

const translations = {
  English: {
    title: "What Do We Watch?",
    tagline:
      "Different tastes, one perfect pick — let AI find what you'll all love.",
    subtitle: "What gets you on the couch?",
    person: "Person",
    name: "Your name",
    preference: "Your preference",
    preferencePlaceholder:
      "e.g. romantic comedy, calm and cozy, something thrilling but not too dark",
    addPerson: "+ Add another couch potato",
    findMatch: "Find our match!",
    loading: "Finding your perfect match...",
    back: "← Back to the couch",
    remove: "Remove",
    shuffle: "↻ Shuffle the deck!",
    filterAll: "Anything",
    filterMovies: "Movies only",
    filterTV: "TV shows only",
    movieLabel: "Movie",
    tvLabel: "TV Show",
  },
  Korean: {
    title: "오늘 우리 뭐 볼까?",
    tagline: "취향이 다 달라도 괜찮아 — AI가 다 같이 좋아할 작품을 찾아드려요.",
    subtitle: "오늘 방구석 1열로 이끄는 너의 무드는?",
    person: "사람",
    name: "이름",
    preference: "취향",
    preferencePlaceholder:
      "예: 로맨틱 코미디, 이불 속 감성, 쫄깃하지만 너무 어둡지 않은 것",
    addPerson: "+ 프로 집순이/집돌이 추가",
    findMatch: "뭐 볼지 정해줘!",
    loading: "찰떡인 작품 고르는 중...",
    back: "← 방구석으로 돌아가기",
    remove: "삭제",
    shuffle: "↻ 다시 골라줘!",
    filterAll: "다 좋아",
    filterMovies: "영화만",
    filterTV: "TV쇼만",
    movieLabel: "영화",
    tvLabel: "TV 시리즈",
  },
  Spanish: {
    title: "¿Qué vemos hoy?",
    tagline:
      "Gustos diferentes, una elección perfecta — deja que la IA encuentre lo que a todos les encantará.",
    subtitle: "¿Qué te va a pegar al sofá hoy?",
    person: "Persona",
    name: "Tu nombre",
    preference: "Tus preferencias",
    preferencePlaceholder:
      "Ej. comedia romántica, peli y manta, algo de intriga pero no muy oscuro",
    addPerson: "+ Añadir a otro adicto al sofá",
    findMatch: "¡A buscar nuestro match!",
    loading: "Buscando el match perfecto...",
    back: "← Volver al sofá",
    remove: "Eliminar",
    shuffle: "↻ ¡Baraja de nuevo!",
    filterAll: "Cualquier cosa",
    filterMovies: "Solo películas",
    filterTV: "Solo series",
    movieLabel: "Película",
    tvLabel: "Serie",
  },
  Japanese: {
    title: "今日、何観る？",
    tagline: "好みが違っても大丈夫 — AIがみんなにぴったりの一本を見つけます。",
    subtitle: "今日、あなたをソファから動けなくする作品は？",
    person: "人",
    name: "お名前",
    preference: "好みの気分・ジャンル",
    preferencePlaceholder:
      "例：ロマコメ、おうち映画、ちょっとハラハラするけど怖すぎないもの",
    addPerson: "＋ ソファの住人を追加",
    findMatch: "ソファに釘付けの1本を探す！",
    loading: "最高のマッチを探しています...",
    back: "← ソファに戻る",
    remove: "削除",
    shuffle: "↻ もう 1回 引く！",
    filterAll: "どっちでも",
    filterMovies: "映画だけ",
    filterTV: "ドラマだけ",
    movieLabel: "映画",
    tvLabel: "ドラマ",
  },
  French: {
    title: "On regarde quoi ce soir ?",
    tagline:
      "Des goûts différents, un choix parfait — laisse l'IA trouver ce que vous allez tous adorer.",
    subtitle: "Qu'est-ce qui va t'aimanter au canapé ?",
    person: "Personne",
    name: "Ton nom",
    preference: "Tes préférences",
    preferencePlaceholder:
      "Ex : comédie romantique, mode cocooning, du suspense mais pas trop sombre",
    addPerson: "+ Ajouter un autre pro du canapé",
    findMatch: "Trouve notre pépite !",
    loading: "Recherche du match parfait...",
    back: "← Retour au canapé",
    remove: "Supprimer",
    shuffle: "↻ On remélange !",
    filterAll: "Peu importe",
    filterMovies: "Films seulement",
    filterTV: "Séries seulement",
    movieLabel: "Film",
    tvLabel: "Série",
  },
  Chinese: {
    title: "今天看点啥？",
    tagline: "喜好各不相同，一个完美选择 — 让AI找到大家都爱看的作品。",
    subtitle: "今天什么剧能把你锁在沙发上？",
    person: "成员",
    name: "昵称",
    preference: "你的偏好",
    preferencePlaceholder: "例：浪漫喜剧、窝在沙发里、有点刺激但别太压抑",
    addPerson: "+ 添加另一位「沙发土豆」",
    findMatch: "看片神器，启动",
    loading: "正在匹配完美片单...",
    back: "← 返回沙发",
    remove: "删除",
    shuffle: "↻ 重新洗牌！",
    filterAll: "都可以",
    filterMovies: "只看电影",
    filterTV: "只看剧集",
    movieLabel: "电影",
    tvLabel: "剧集",
  },
  German: {
    title: "Was schauen wir heute?",
    tagline:
      "Unterschiedliche Geschmäcker, eine perfekte Wahl — lass die KI finden, was euch allen gefällt.",
    subtitle: "Was fesselt dich heute ans Sofa?",
    person: "Person",
    name: "Dein Name",
    preference: "Deine Vorlieben",
    preferencePlaceholder:
      "Z.B. Romantische Komödie, Couch-Modus, packend aber nicht zu düster",
    addPerson: "+ Weiteren Couch-Potato hinzufügen",
    findMatch: "Match finden!",
    loading: "Das perfekte Match wird gesucht...",
    back: "← Zurück aufs Sofa",
    remove: "Entfernen",
    shuffle: "↻ Neu mischen!",
    filterAll: "Egal",
    filterMovies: "Nur Filme",
    filterTV: "Nur Serien",
    movieLabel: "Film",
    tvLabel: "Serie",
  },
};

function App() {
  const [people, setPeople] = useState([
    { name: "", preference: "" },
    { name: "", preference: "" },
  ]);

  const isReady = people.every((p) => p.name.trim() && p.preference.trim());
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState([]);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [filter, setFilter] = useState("All");

  const [language, setLanguage] = useState("English");
  const t = translations[language];

  const addPerson = () => {
    setPeople([...people, { name: "", preference: "" }]);
  };

  const updatePerson = (index, field, value) => {
    const updated = [...people];
    updated[index] = { ...updated[index], [field]: value };
    setPeople(updated);
  };

  const removePerson = (index) => {
    const updated = people.filter((_, i) => i !== index);
    setPeople(updated);
  };

  const findMatch = async () => {
    setAttemptedSubmit(true);
    if (!isReady) return;

    setIsLoading(true);
    setIsResult(false);

    const filterInstruction =
      filter === "Movies"
        ? "Only recommend movies, no TV shows."
        : filter === "TV"
          ? "Only recommend TV shows, no movies."
          : "Recommend a mix of both movies and TV shows.";

    const previousTitles = result.map((r) => r.title).join(", ");

    const prompt = `Here are the preferences of ${people.length} people who want to watch something together:

    ${people.map((p) => `- ${p.name}: ${p.preference}`).join("\n")}

    Please recommend 5 movies or TV shows that everyone would enjoy.
    ${filterInstruction}
    ${previousTitles ? `Do NOT recommend any of these previously suggested titles: ${previousTitles}.` : ""}
    Respond ONLY with a JSON array, no explanation, no markdown, no backticks. Like this:
    [
      {
        "title": "Movie Title",
        "year": 2019,
        "type": "Movie or TV Show",
        "reason": "Why this works for the group"
        "overview": "A short 1-2 sentence plot summary"
      }
    ]
    Please respond with the "reason", "type", and "overview" fields written in ${language}.
    Keep "title" in its original language (do not translate movie/show titles).`;

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 8192,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();
    const recommendations = JSON.parse(data.content[0].text);
    const enriched = await Promise.all(
      recommendations.map(async (item) => {
        const tmdbData = await searchMovie(item.title, item.year);
        if (!tmdbData) return item;

        const providers = await getWatchProviders(
          tmdbData.tmdbId,
          tmdbData.mediaType,
        );
        return { ...item, ...tmdbData, providers };
      }),
    );
    setResult(enriched);

    setIsResult(true);
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen pt-4 pb-8 px-4"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      <div className="flex justify-between items-center mb-6 sm:mb-1">
        <div className="flex items-center gap-2">
          <img
            src="/icon-192.png"
            alt="WDWW"
            style={{ width: "32px", height: "32px" }}
            className="rounded-md"
          />
          <span className="font-semibold" style={{ color: "#3D2C2C" }}>
            wdww
          </span>
        </div>
        <LanguageSelector
          language={language}
          onChange={(newLang) => {
            setLanguage(newLang);
            setPeople([
              { name: "", preference: "" },
              { name: "", preference: "" },
            ]);
            setIsResult(false);
            setResult([]);
            setAttemptedSubmit(false);
            setFilter("All");
          }}
        />
      </div>
      <div className="flex justify-center mb-4">
        <img
          src={wdwwLogo}
          alt="WDWW"
          style={{ width: "120px", height: "120px" }}
        />
      </div>
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-5xl font-bold text-center mb-2"
          style={{ color: "#3D2C2C" }}
        >
          {t.title}
        </h1>
        <p className="text-center mb-10" style={{ color: "#6B5B5B" }}>
          {t.tagline}
        </p>

        {isLoading && <LoadingScreen t={t} />}

        {!isResult && !isLoading && (
          <>
            <div className="flex gap-2 mb-6 justify-center">
              {["All", "Movies", "TV"].map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className="px-4 py-2 rounded-full text-sm border"
                  style={{
                    borderColor: "#E8845C",
                    backgroundColor:
                      filter === option ? "#E8845C" : "transparent",
                    color: filter === option ? "#FFFFFF" : "#E8845C",
                  }}
                >
                  {option === "All"
                    ? t.filterAll
                    : option === "Movies"
                      ? t.filterMovies
                      : t.filterTV}
                </button>
              ))}
            </div>
            {people.map((person, index) => (
              <PreferenceForm
                key={index}
                personNumber={index + 1}
                person={person}
                onChange={(field, value) => updatePerson(index, field, value)}
                onRemove={() => removePerson(index)}
                canRemove={people.length > 2}
                t={t}
                showError={attemptedSubmit}
              />
            ))}
            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={addPerson}
                className="px-4 py-2 rounded-full border text-sm"
                style={{ borderColor: "#E8845C", color: "#E8845C" }}
              >
                {t.addPerson}
              </button>
              <button
                onClick={findMatch}
                className="px-6 py-2 rounded-full text-white text-sm font-medium"
                style={{
                  backgroundColor: "#E8845C",
                  cursor: "pointer",
                }}
              >
                {t.findMatch}
              </button>
            </div>
          </>
        )}

        {isResult && (
          <>
            <div className="flex justify-between mb-8">
              <button
                onClick={() => {
                  setIsResult(false);
                  setResult([]);
                }}
                className="text-sm"
                style={{ color: "#E8845C" }}
              >
                {t.back}
              </button>
              <button
                onClick={findMatch}
                className="text-sm"
                style={{ color: "#E8845C" }}
              >
                {t.shuffle}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {result.map((item, index) => (
                <a
                  key={index}
                  href={
                    item.tmdbId
                      ? `https://www.themoviedb.org/${item.mediaType}/${item.tmdbId}`
                      : "#"
                  }
                  target={item.tmdbId ? "_blank" : undefined}
                  className="flex gap-4 p-4 rounded-2xl transition-transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <div className="flex gap-4">
                    {item.poster && (
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="rounded-xl object-cover"
                        style={{ width: "100px", height: "150px" }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3
                          className="text-xl font-semibold"
                          style={{ color: "#3D2C2C" }}
                        >
                          {item.title} ({item.year})
                        </h3>
                        {item.providers && item.providers.length > 0 && (
                          <div
                            className="flex flex-wrap gap-1 justify-end"
                            style={{ maxWidth: "300px" }}
                          >
                            {item.providers.map((p, i) => (
                              <img
                                key={i}
                                src={p.logo}
                                alt={p.name}
                                title={p.name}
                                className="rounded-md object-cover"
                                style={{ width: "30px", height: "30px" }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm mt-1" style={{ color: "#E8845C" }}>
                        {item.mediaType === "movie"
                          ? t.movieLabel
                          : item.mediaType === "tv"
                            ? t.tvLabel
                            : item.type}
                      </p>
                      <p className="text-sm mt-1" style={{ color: "#3D2C2C" }}>
                        ⭐ {item.rating}
                      </p>
                      <p className="text-sm mt-2" style={{ color: "#6B5B5B" }}>
                        {item.overview}
                      </p>
                      <p className="text-sm mt-2" style={{ color: "#6B5B5B" }}>
                        {item.reason}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
