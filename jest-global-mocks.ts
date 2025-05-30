// jest-global-mocks.ts
Object.defineProperty(window, "CSS", { value: null });
Object.defineProperty(document, "doctype", {
  value: "<!DOCTYPE html>",
});
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    display: "none",
    appearance: ["-webkit-appearance"],
  }),
});
