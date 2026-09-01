from .config import BASE_URL


SAMPLE_HOTEL_URL = (
    "agoda.com/ko-kr/sequence-miyashita-park-shibuya/hotel/tokyo-jp.html"
    "?cid=-1&adults=1&children=0&rooms=1&checkIn=2026-09-10&los=1"
)


def run_travel_link_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/travel-link-lab/", wait_until="networkidle")
    page.locator("[data-travel-market]").select_option("일본")
    page.locator("[data-travel-url]").fill(SAMPLE_HOTEL_URL)
    page.locator("[data-generate]").click()
    page.wait_for_function("!document.querySelector('[data-travel-results]').hidden")

    state = page.evaluate(
        """
        () => {
          const input = document.querySelector('[data-travel-url]');
          const firstLink = document.querySelector('[data-travel-card] a');
          const results = document.querySelector('[data-travel-results]');
          return {
            title: document.title,
            heading: document.querySelector('h1')?.textContent?.trim(),
            action: document.querySelector('[data-generate]')?.textContent?.trim(),
            resultTitle: document.querySelector('[data-travel-results] h2')?.textContent?.trim(),
            resultsVisible: results ? !results.hidden : false,
            cardCount: document.querySelectorAll('[data-travel-card]').length,
            firstHref: firstLink?.href ?? '',
            inputBackground: getComputedStyle(input).backgroundColor,
            inputHeight: Math.round(input.getBoundingClientRect().height),
          };
        }
        """
    )
    report["travel_link_desktop"] = state
    if (
        state["title"] != "Find the lowest Agoda hotel price | AbsolTools"
        or state["heading"] != "Find the lowest Agoda hotel price"
        or state["action"] != "Compare lowest prices"
        or state["resultTitle"] != "Compare Agoda prices"
        or not state["resultsVisible"]
        or state["cardCount"] < 3
        or "cid=1642201" not in state["firstHref"]
        or "cid=-1" in state["firstHref"]
        or state["inputBackground"] != "rgb(255, 255, 255)"
        or state["inputHeight"] < 44
    ):
        report["ui_detail_failures"].append(
            f"Travel price comparison desktop behavior failed: {state}"
        )


def run_travel_link_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/travel-link-lab/", wait_until="networkidle")
    page.locator("[data-travel-market]").select_option("일본")
    page.locator("[data-travel-url]").fill(SAMPLE_HOTEL_URL)
    page.locator("[data-generate]").click()
    page.wait_for_function("!document.querySelector('[data-travel-results]').hidden")

    state = page.evaluate(
        """
        () => {
          const input = document.querySelector('[data-travel-url]');
          const action = document.querySelector('[data-generate]');
          const cards = [...document.querySelectorAll('[data-travel-card]')];
          return {
            direction: document.documentElement.dir,
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            inputHeight: Math.round(input.getBoundingClientRect().height),
            actionHeight: Math.round(action.getBoundingClientRect().height),
            cardsWithinViewport: cards.every((card) => {
              const bounds = card.getBoundingClientRect();
              return bounds.left >= -0.5 && bounds.right <= document.documentElement.clientWidth + 0.5;
            }),
            priceAction: document.querySelector('[data-travel-card] a')?.textContent?.trim(),
          };
        }
        """
    )
    report["travel_link_mobile_ar"] = state
    if (
        state["direction"] != "rtl"
        or state["scrollWidth"] != state["clientWidth"]
        or state["inputHeight"] < 44
        or state["actionHeight"] < 44
        or not state["cardsWithinViewport"]
        or state["priceAction"] != "عرض سعر أجودا"
    ):
        report["ui_detail_failures"].append(
            f"Travel price comparison Arabic mobile layout failed: {state}"
        )
