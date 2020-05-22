import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
	constructor(els, thresholdPercent) {
        this.thresholdPercent = thresholdPercent
		this.itemsToReveal = els
        this.browserHeight = window.innerHeight
		this.hideInitially()
        this.scrollThrottle = throttle(this.calCaller, 200).bind(this)
        this.events()
	}

    events(){
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(() => {
            console.log("resize just ran")
            this.browserHeight = window.innerHeight
        }, 333))
    }

    calCaller () {
        console.log("scroll function ran")
        this.itemsToReveal.forEach(el => {
          if (el.isReveal == false) {
            this.calculateIfScrolledTo(el)
          }
        })
    }

    calculateIfScrolledTo(el){
        if (window.scrollY + window.innerHeight > el.offsetTop) {
            let scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100
            if (scrollPercent < this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible")
                el.isReveal = true
                if(el.isLastItem){
                    window.removeEventListener("scroll", this.scrollThrottle)
                }
            }
        }
    }

	hideInitially() {
		this.itemsToReveal.forEach(el => {
            el.classList.add('reveal-item')
            el.isReveal = false
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
	}
}

export default RevealOnScroll;
