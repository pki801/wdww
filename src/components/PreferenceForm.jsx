function PreferenceForm({
  personNumber,
  person,
  onChange,
  onRemove,
  canRemove,
  t,
  showError,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 mb-4">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-lg" style={{ color: "#3D2C2C" }}>
          {t.person} {personNumber}
        </h3>
        {canRemove && (
          <button
            onClick={onRemove}
            className="text-sm"
            style={{ color: "#E8845C" }}
          >
            {t.remove}
          </button>
        )}
      </div>
      <p className="text-sm mb-4" style={{ color: "#E8845C" }}>
        {t.subtitle}
      </p>

      <div className="mb-3">
        <label className="block text-sm mb-1" style={{ color: "#3D2C2C" }}>
          {t.name}
        </label>
        <input
          type="text"
          value={person.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          style={{
            borderColor:
              showError && !person.name.trim() ? "#E24B4A" : "#E5E4E7",
            borderWidth: showError && !person.name.trim() ? "2px" : "1px",
          }}
        />
      </div>

      <div>
        <label className="block text-sm mb-1" style={{ color: "#3D2C2C" }}>
          {t.preference}
        </label>
        <textarea
          rows={3}
          value={person.preference}
          placeholder={t.preferencePlaceholder}
          onChange={(e) => onChange("preference", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
          style={{
            borderColor:
              showError && !person.preference.trim() ? "#E24B4A" : "#E5E4E7",
            borderWidth: showError && !person.preference.trim() ? "2px" : "1px",
          }}
        />
      </div>
    </div>
  );
}

export default PreferenceForm;
