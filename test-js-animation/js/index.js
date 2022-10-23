export class EafSlider {
    #input
    #liTpl = `
            <li title="%title%" role="item">
                <iframe width="100%" height="600" border="0" src="%url%" role="eaf-slider"></iframe>
            </li>
        `

    constructor(input) {
        this.#input = input
    }

    start() {

        const defliTpl = `
            <li title="%title%" role="item">
                <iframe width="100%" height="600" border="0" src="%url%" role="eaf-slider"></iframe>
            </li>
        `
        const get_li = (title, url) => {
            const tpl = defliTpl.replace("%title%", title).replace("%url%", url)
            let $el = new DOMParser().parseFromString(tpl, "text/html")
            return $el.body.firstChild
        }
        const $ul = document.querySelector(".eaf-slider .ul-slider")
        this.#input.forEach(obj => $ul.appendChild(get_li(obj.title, obj.url)))


        let currLi = 0
        let autoAnimation = true

        const $liloading = document.querySelector(".eaf-slider .ul-slider li[role=loading]")
        $liloading.hide = () => {
            $liloading.style.left = "0px"
            $liloading.classList.add("loading-out")
        }

        const $lis = Array.from(document.querySelectorAll(".eaf-slider .ul-slider li[role=item]"))
        const $navP = document.querySelector(".eaf-slider nav.slider-nav p")
        const $h2 = document.querySelector(".eaf-slider h2")

        const NAV_TEXT = "Item %i% of %t% result"
        const NUM_LIS = $lis.length
        const LAST_LI = NUM_LIS - 1

        if (NUM_LIS<2) autoAnimation = false

        const configNav = () => {
            const $nav = document.querySelector(".eaf-slider nav.slider-nav")
            $nav.show = () => $nav.style.display = ""
            $nav.hide = () => $nav.style.display = "none"

            $h2.settitle = (title="") => $h2.innerText = title || ""
            $navP.navtext = () => $navP.innerText = NAV_TEXT.replace("%i%", currLi+1).replace("%t%", NUM_LIS)


            const $prev = document.querySelector(".eaf-slider nav .prev")
            $prev.addEventListener("click", () => {
                const old = currLi
                currLi = currLi - 1
                if (currLi < 0) currLi = LAST_LI
                window.dispatchEvent(new CustomEvent("navClicked", {
                    detail: {
                        ev: "prev",
                        prevli: old,
                        currli: currLi
                    }
                }))
            })
            const $next = document.querySelector(".eaf-slider nav .next")
            $next.addEventListener("click", () => {
                const old = currLi
                currLi = currLi + 1
                if (currLi > LAST_LI) currLi = 0
                window.dispatchEvent(new CustomEvent("navClicked", {
                    detail: {
                        ev: "next",
                        prevli: old,
                        currli: currLi
                    }
                }))
            })
        }
        configNav()

        let totalif = 0
        const configLis = () => {
            totalif = $lis.filter($li => $li.querySelector("iframe")).length

            $lis.forEach(($li, i) => {
                $li.hide = () => {
                    $li.style.left= "0px"
                    $li.classList.remove("li-animation-in")
                    $li.classList.add("li-animation-out")
                }

                $li.show = () => {
                    $li.style.left= "-800px"
                    $li.classList.remove("li-animation-out")
                    $li.classList.add("li-animation-in")
                }

                const $iframe = $li.querySelector("iframe")
                if (!$iframe) return
                const $content = $iframe.contentDocument || $iframe.contentWindow.document
                console.log(`iframe ${i} state`, $content.readyState)
                if ($content.readyState === "complete")
                    $iframe.addEventListener(
                        "load",
                        () => window.dispatchEvent(new CustomEvent("iframeLoaded", {detail: {id: i, total:totalif}})),
                        {once:true}
                    )
            })
        }
        configLis()

        const get_li_by_position = position => $lis.filter(($li, pos)=> position===pos)[0] ?? null

        const detectIframeClick = () => {
            const MILI_SECONDS = 100
            const processId = setInterval(function(){
                if (!autoAnimation) {
                    clearInterval(processId)
                    return
                }
                const $activeElem = document.activeElement;
                if (!$activeElem) return
                if ($activeElem.tagName !== "IFRAME") return
                if ($activeElem.getAttribute("role") !== "eaf-slider") return

                console.log("iframe clicked")
                autoAnimation = false
                clearInterval(processId)
            }, MILI_SECONDS);
        }
        detectIframeClick()

        const animate = () => {
            const $liShow = get_li_by_position(currLi)
            $h2.settitle($liShow.getAttribute("title") ?? "")
            $liShow.show()
            $navP.navtext()

            $liloading.hide()
            const pid = setInterval(() => {
                if (!autoAnimation) {
                    clearInterval(pid)
                    return
                }
                const old = currLi
                currLi = currLi + 1
                if (currLi>LAST_LI) currLi = 0

                const $liHide = get_li_by_position(old)
                const $liShow = get_li_by_position(currLi)
                $liHide.hide()

                $h2.settitle($liShow.getAttribute("title") ?? "")
                $liShow.show()
                $navP.navtext()
            },5000)
        }

        if (!totalif) animate()

        let ifloaded = 0
        window.addEventListener("iframeLoaded", function (ev) {
            console.log("if-loaded", ev)
            ifloaded++
            if (ifloaded === ev.detail.total) {
                animate()
            }
        })

        window.addEventListener("navClicked", function (ev) {
            autoAnimation = false
            let $li = get_li_by_position(ev.detail.prevli)
            $li.hide()

            $li = get_li_by_position(ev.detail.currli)
            $li.show()

            $h2.settitle($li.getAttribute("title") ?? "")
            $navP.navtext()
        })
    }
}

