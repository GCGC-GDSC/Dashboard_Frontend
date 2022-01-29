const ColorPallet = [
  "#303F9F",
  "#CC5500",
  "#F9A825",
  "#93C572",
  "#303F9F",
  "#6C3483",
  "#00A36C",
  "#FF4433",
  "#309F58",
  "#9F3076",
  "#800080",
];
// const ColorPallet = [
//   "#FF2281",
//   "#011FFD",
//   "#652EC7",
//   "#13CA91",
//   "#FF8B8B",
//   "#OJ7A9O",
//   "#FEbB35",
//   "#C24CF6",
//   "#EFO888",
//   "#CEOOOO",
//   "#FFAAO1",
//   "#3CB9FC",
// ];
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(ColorPallet);
export default ColorPallet;
