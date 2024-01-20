export const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height, top, left } = entry.contentRect;

    console.log(entry.target);
    console.log(`width: ${width}px, height: ${height}px`);
    console.log(`top: ${top}px, left: ${left}px`);
  }
});

export default observer;
