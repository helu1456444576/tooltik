import { validateMobile, validateEmail, validateIdCard } from "../src/validate";

describe("test validate", () => {
  it("init", () => {
    expect(validateMobile("18810507699")).toBe(true);
    expect(validateEmail("1345646@aa.com")).toBe(true);
    expect(validateIdCard("43122419990220755X")).toBe(true);
  });
});
