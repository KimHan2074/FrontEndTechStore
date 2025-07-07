const SpecificationsTab = () => {
  const specifications = [
    { label: "Brand:", value: "TechPro", highlight: true },
    { label: "Model:", value: "TP-KB2024" },
    { label: "Connection:", value: "USB-C, Bluetooth 5.0" },
    { label: "Layout:", value: "Full-size 104 keys" },
    { label: "Switch:", value: "Mechanical Blue Switch" },
    { label: "Backlight:", value: "RGB with 16.7 million colors" },
    { label: "Compatibility:", value: "Windows, macOS, Linux" },
    { label: "Dimensions:", value: "440 x 135 x 35mm" },
    { label: "Weight:", value: "1.2kg" },
    { label: "Warranty:", value: "24 months" },
  ];

  return (
      <div className="spec-grid">
        {specifications.map((spec, index) => (
          <div key={index} className="spec-item">
            <span className="spec-label">{spec.label}</span>
            <span className={`spec-value ${spec.highlight ? "highlight" : ""}`}>{spec.value}</span>
          </div>
        ))}
      </div>
  );
};

export default SpecificationsTab;
 