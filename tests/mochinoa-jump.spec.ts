import { expect, test } from "@playwright/test";

test.describe("Mochinoa Jump Game", () => {
	test.beforeEach(async ({ page }) => {
		// ゲームページに移動
		await page.goto("http://localhost:3000/games/mochinoa-jump");

		// ダイアログが出た場合は自動で閉じる
		page.on("dialog", (dialog) => dialog.accept());
	});

	test("should start game and update score", async ({ page }) => {
		// タイトルが表示されていることを確認
		await expect(page.locator("text=もちのあジャンプ")).toBeVisible();

		// スタートメッセージが表示されていることを確認
		await expect(
			page.locator("text=スペースキーでスタート&ジャンプ"),
		).toBeVisible();

		// 初期スコアが0であることを確認
		const scoreDisplay = page.locator("text=スコア:").locator("span");
		await expect(scoreDisplay).toHaveText("0");

		// スペースキーでゲーム開始
		await page.keyboard.press("Space");

		// スタートメッセージが消えることを確認
		await expect(
			page.locator("text=スペースキーでスタート&ジャンプ"),
		).not.toBeVisible();

		// 少し待機してスコアが更新されるか確認
		await page.waitForTimeout(1000);

		// スコアが0より大きくなっていることを確認
		const currentScoreText = await scoreDisplay.textContent();
		expect(Number.parseInt(currentScoreText || "0", 10)).toBeGreaterThan(0);

		// プレイヤーがジャンプできるか確認
		await page.keyboard.press("Space");
		await page.waitForTimeout(100);

		// ジャンプのアニメーション(transform)が適用されているか確認
		const player = page.locator("div > img[alt='もちのあ']").locator("..");
		const transform = await player.evaluate((el) => {
			return window.getComputedStyle(el).transform;
		});

		// transformがnoneではない（何らかの変形が適用されている）ことを確認
		expect(transform).not.toBe("none");
	});
});
