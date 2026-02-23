from playwright.sync_api import sync_playwright

def verify_top_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the local development server
            page.goto("http://localhost:3000")

            # Wait for the page to load
            page.wait_for_load_state("networkidle")

            # Take a screenshot of the full page
            page.screenshot(path="verification_top_page_updated.png", full_page=True)
            print("Screenshot saved to verification_top_page_updated.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_top_page()
