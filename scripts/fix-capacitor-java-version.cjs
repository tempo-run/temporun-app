const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "android", "app", "capacitor.build.gradle");

if (!fs.existsSync(file)) {
  console.warn("[TempoRun] capacitor.build.gradle not found, skipping Java version fix.");
  process.exit(0);
}

const before = fs.readFileSync(file, "utf8");
const after = before
  .replace(/sourceCompatibility JavaVersion\.VERSION_21/g, "sourceCompatibility JavaVersion.VERSION_17")
  .replace(/targetCompatibility JavaVersion\.VERSION_21/g, "targetCompatibility JavaVersion.VERSION_17");

if (after !== before) {
  fs.writeFileSync(file, after);
  console.log("[TempoRun] Fixed Capacitor Java compatibility: VERSION_21 -> VERSION_17");
} else {
  console.log("[TempoRun] Capacitor Java compatibility already OK.");
}
