from .config import BASE_URL


SAMPLE_HOTEL_URL = (
    "agoda.com/ko-kr/sequence-miyashita-park-shibuya/hotel/tokyo-jp.html"
    "?cid=-1&adults=1&children=0&rooms=1&checkIn=2026-09-10&los=1"
)


def run_travel_link_desktop(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/en/agoda/", wait_until="networkidle")
    default_market = page.locator("[data-travel-market]").input_value()
    input_top = page.locator("[data-travel-url]").bounding_box()["y"]
    market_top = page.locator("[data-travel-market]").bounding_box()["y"]
    page.locator("[data-travel-url]").fill(SAMPLE_HOTEL_URL)
    active_after_input = page.locator("[data-travel-url]").evaluate(
        "(input) => document.activeElement === input"
    )
    page.locator("[data-generate]").click()
    page.wait_for_function("!document.querySelector('[data-travel-results]').hidden")
    global_href = page.locator("[data-travel-card] a").first.get_attribute("href")
    page.locator(".travel-link-market-options summary").click()
    page.locator("[data-travel-market]").select_option("일본")
    page.wait_for_function(
        "[...document.querySelectorAll('[data-travel-card] a')].some((link) => link.href.includes('cid=1642201'))"
    )

    state = page.evaluate(
        """
        () => {
          const input = document.querySelector('[data-travel-url]');
          const firstLink = document.querySelector('[data-travel-card] a');
          const results = document.querySelector('[data-travel-results]');
          const links = [...document.querySelectorAll('[data-travel-card] a')];
          const market = document.querySelector('[data-travel-market]');
          return {
            title: document.title,
            heading: document.querySelector('h1')?.textContent?.trim(),
            action: document.querySelector('[data-generate]')?.textContent?.trim(),
            resultTitle: document.querySelector('[data-travel-results] h2')?.textContent?.trim(),
            resultsVisible: results ? !results.hidden : false,
            cardCount: document.querySelectorAll('[data-travel-card]').length,
            firstHref: firstLink?.href ?? '',
            japanHref: links.find((link) => link.href.includes('cid=1642201'))?.href ?? '',
            selectedGlobalCardHref: links.find((link) => link.href.includes('cid=1889319'))?.href ?? '',
            externalIconCount: document.querySelectorAll('[data-travel-card] a svg[aria-hidden="true"]').length,
            groupOrder: [...document.querySelectorAll('[data-travel-grid] h3')].map((heading) => heading.textContent?.trim()),
            resultsWidth: Math.round(results?.getBoundingClientRect().width ?? 0),
            marketBackground: getComputedStyle(market).backgroundColor,
            inputBackground: getComputedStyle(input).backgroundColor,
            inputHeight: Math.round(input.getBoundingClientRect().height),
            defaultMarket: document.querySelector('[data-travel-market]')?.value,
          };
        }
        """
    )
    state["defaultMarketOnLoad"] = default_market
    state["activeAfterInput"] = active_after_input
    state["globalHref"] = global_href
    state["inputTop"] = round(input_top)
    state["marketTop"] = round(market_top)
    report["travel_link_desktop"] = state
    if (
        state["title"] != "Find the lowest Agoda hotel price | AbsolTools"
        or state["heading"] != "Find the lowest Agoda hotel price"
        or state["action"] != "Compare lowest prices"
        or state["resultTitle"] != "Compare Agoda prices"
        or not state["resultsVisible"]
        or state["cardCount"] < 3
        or "cid=1642201" not in state["japanHref"]
        or "cid=1889319" not in state["selectedGlobalCardHref"]
        or "cid=-1" in state["firstHref"]
        or state["inputBackground"] != "rgb(255, 255, 255)"
        or state["inputHeight"] < 44
        or default_market != "글로벌"
        or state["externalIconCount"] != state["cardCount"]
        or state["groupOrder"][:2] != ["Search routes", "Hotel links"]
        or state["resultsWidth"] < 1100
        or state["marketBackground"] != "rgb(255, 255, 255)"
        or not state["activeAfterInput"]
        or input_top >= market_top
    ):
        report["ui_detail_failures"].append(
            f"Travel price comparison desktop behavior failed: {state}"
        )


def run_travel_link_mobile(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ar/agoda/", wait_until="networkidle")
    page.locator(".travel-link-market-options summary").click()
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


def run_travel_link_support_content(page, report: dict, _inventory) -> None:
    page.goto(f"{BASE_URL}/ko/agoda/", wait_until="networkidle")
    state = page.evaluate(
        """
        () => {
          const shell = document.querySelector('.tool-shell');
          const support = document.querySelector('.travel-link-support');
          const guide = [...document.querySelectorAll('.travel-link-support ol li')]
            .map((item) => item.textContent?.trim());
          const faqs = [...document.querySelectorAll('.travel-link-support details')]
            .map((item) => ({
              question: item.querySelector('[data-faq-question]')?.textContent?.trim(),
              answer: item.querySelector('[data-faq-answer]')?.textContent?.trim(),
            }));
          return {
            shellLeft: Math.round(shell?.getBoundingClientRect().left ?? -1),
            supportLeft: Math.round(support?.getBoundingClientRect().left ?? -1),
            guide,
            faqs,
          };
        }
        """
    )
    report["travel_link_support_content"] = state
    if (
        state["shellLeft"] != state["supportLeft"]
        or len(state["guide"]) != 3
        or len(state["faqs"]) != 3
        or state["faqs"][0]["question"] != "가격을 자동으로 비교해 주나요?"
        or "가격을 수집하거나 표시하지 않습니다" not in state["faqs"][0]["answer"]
    ):
        report["ui_detail_failures"].append(
            f"Travel price comparison support content failed: {state}"
        )
