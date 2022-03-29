import { getPageTitle } from "./index"

describe("func testing", () => {
	test("getPageTitle func", () => {
		let title = getPageTitle("test")
		expect(title).toBe("test - Ky Admin")
	})
})
