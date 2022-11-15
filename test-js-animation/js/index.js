export class EafSlider {
    #input = []
    #liTpl = `
            <li title="%title%" role="item">
                <iframe width="100%" height="600" border="0" src="%url%" role="eaf-slider"></iframe>
            </li>
        `
    #$ul = null
    #currLi = 0
    #autoAnimation = true
    #$liloading = null
    #$lis = []
    #NUM_LIS = 0
    #LAST_LI = 0
    #NAV_TEXT = "Item %i% of %t% result"
    #totalif = 0
    #$navP = null
    #$h2 = null
    #$nav = null
    #$prev = null
    #$next = null
    #ifloaded = 0

    constructor(input) {
        this.#input = input
        this.#_order_input()
        this.#$ul = document.querySelector(".eaf-slider .ul-slider")
        this.#$liloading = document.querySelector(".eaf-slider .ul-slider li[role=loading]")
        this.#$navP = document.querySelector(".eaf-slider nav.slider-nav p")
        this.#$h2 = document.querySelector(".eaf-slider h2")
        this.#$nav = document.querySelector(".eaf-slider nav.slider-nav")
        this.#$prev = document.querySelector(".eaf-slider nav .prev")
        this.#$next = document.querySelector(".eaf-slider nav .next")
        console.log("lis const",this.#$lis)
    }

    #_order_input() {
        const compare = (a, b) => {
            if ( a.order < b.order ){
                return -1
            }
            if ( a.order > b.order ){
                return 1
            }
            return 0
        }
        this.#input = this.#input.sort(compare)
    }

    #_get_li(title, url) {
        const tpl = this.#liTpl.replace("%title%", title).replace("%url%", url)
        let $el = new DOMParser().parseFromString(tpl, "text/html")
        return $el.body.firstChild
    }

    #_load_lis() {
        //const $ul = this.#$ul
        this.#input.forEach(obj => this.#$ul.appendChild(this.#_get_li(obj.title, obj.url)))
        this.#$lis = Array.from(document.querySelectorAll(".eaf-slider .ul-slider li[role=item]"))
        this.#NUM_LIS = this.#$lis.length
        this.#LAST_LI = this.#NUM_LIS - 1
    }

    #_load_loader() {
        this.#$liloading.hide = () => {
            this.#$liloading.style.left = "0px"
            this.#$liloading.classList.add("loading-out")
        }
    }

    #_get_li_by_position(position) {
        return this.#$lis.filter(($li, pos) => position===pos)[0] ?? null
    }

    #_load_nav() {
        this.#$nav.show = () => this.#$nav.style.display = ""
        this.#$nav.hide = () => this.#$nav.style.display = "none"

        this.#$h2.settitle = (title="") => this.#$h2.innerText = title || ""
        this.#$navP.navtext = () => this.#$navP.innerText = this.#NAV_TEXT.replace("%i%", this.#NUM_LIS>0 ? (this.#currLi+1).toString() : "0").replace("%t%", this.#NUM_LIS)

        this.#$prev.addEventListener("click", () => {
            const old = this.#currLi
            this.#currLi = this.#currLi - 1
            if (this.#currLi < 0) this.#currLi = this.#LAST_LI
            window.dispatchEvent(new CustomEvent("navClicked", {
                detail: {
                    ev: "prev",
                    prevli: old,
                    currli: this.#currLi
                }
            }))
        })

        this.#$next.addEventListener("click", () => {
            const old = this.#currLi
            this.#currLi = this.#currLi + 1
            if (this.#currLi > this.#LAST_LI) this.#currLi = 0
            window.dispatchEvent(new CustomEvent("navClicked", {
                detail: {
                    ev: "next",
                    prevli: old,
                    currli: this.#currLi
                }
            }))
        })
    }

    #_config_lis() {
        this.#totalif = this.#$lis.filter($li => $li.querySelector("iframe")).length

        this.#$lis.forEach(($li, i) => {
            $li.hide = () => {
                //desde 0
                $li.style.left= "0px"
                $li.classList.remove("li-animation-in")
                // hasta -800
                $li.classList.add("li-animation-out")
            }

            $li.show = () => {
                //desde -800px
                $li.style.left= "-800px"
                $li.classList.remove("li-animation-out")
                //hasta 0px
                $li.classList.add("li-animation-in")
            }

            const $iframe = $li.querySelector("iframe")
            if (!$iframe) return
            const $content = $iframe.contentDocument || $iframe.contentWindow.document
            console.log(`iframe ${i} state`, $content.readyState)
            if ($content.readyState === "complete")
                $iframe.addEventListener(
                    "load",
                    () => window.dispatchEvent(new CustomEvent("iframeLoaded", {detail: {id: i, total:this.#totalif}})),
                    {once:true}
                )
        })
    }

    #_animate() {
        const MILLISECONS = 60000
        const $liShow = this.#_get_li_by_position(this.#currLi)
        console.log("lishow", $liShow, this.#currLi)
        this.#$h2.settitle($liShow.getAttribute("title") ?? "")
        $liShow.show()
        this.#$navP.navtext()

        this.#$liloading.hide()
        const pid = setInterval(() => {
            if (!this.#autoAnimation) {
                clearInterval(pid)
                return
            }
            const old = this.#currLi
            this.#currLi = this.#currLi + 1
            if (this.#currLi>this.#LAST_LI) this.#currLi = 0

            const $liHide = this.#_get_li_by_position(old)
            const $liShow = this.#_get_li_by_position(this.#currLi)
            $liHide.hide()

            this.#$h2.settitle($liShow.getAttribute("title") ?? "")
            $liShow.show()
            this.#$navP.navtext()
        },MILLISECONS)
    }
    
    #_detect_iframe_click() {
        const MILI_SECONDS = 100
        const that = this
        const processId = setInterval(function(){
            if (!that.#autoAnimation) {
                clearInterval(processId)
                return
            }
            const $activeElem = document.activeElement;
            if (!$activeElem) return
            if ($activeElem.tagName !== "IFRAME") return
            if ($activeElem.getAttribute("role") !== "eaf-slider") return

            console.log("iframe clicked")
            that.#autoAnimation = false
            clearInterval(processId)
        }, MILI_SECONDS);        
    }

    start() {
        //carga y cuenta los lis
        this.#_load_lis()
        this.#_load_loader()
        if (this.#NUM_LIS<2) this.#autoAnimation = false
        this.#_load_nav()
        if (!this.#NUM_LIS) {
            this.#$liloading.hide()
            this.#$h2.settitle("No data")
            this.#$navP.navtext()
            return
        }
        this.#_config_lis()
        this.#_detect_iframe_click()
        if (!this.#totalif) this.#_animate()

        const that = this
        window.addEventListener("iframeLoaded", function (ev) {
            console.log("if-loaded", ev)
            that.#ifloaded++
            if (that.#ifloaded === ev.detail.total) {
                that.#_animate()
            }
        })

        window.addEventListener("navClicked", function (ev) {
            that.#autoAnimation = false
            let $li = that.#_get_li_by_position(ev.detail.prevli)
            $li.hide()

            $li = that.#_get_li_by_position(ev.detail.currli)
            $li.show()

            that.#$h2.settitle($li.getAttribute("title") ?? "")
            that.#$navP.navtext()
        })
    }
}

