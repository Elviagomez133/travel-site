import '../styles/styles.css';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';

new Modal()

let stickyHeader = new StickyHeader();

new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)

if (module.hot) {
	module.hot.accept();
}
