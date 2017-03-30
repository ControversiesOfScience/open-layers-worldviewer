import React from 'react';
import './App.scss';
import ControversyCard from './ControversyCard/ControversyCard.jsx';
import './mobiscroll/mobiscroll.custom-3.0.1.min.css';
import './mobiscroll/mobiscroll-prevnext.scss';
import Spinner from './Spinner/Spinner.jsx';
import Preload from './Preload/Preload.jsx';

const Menu = require('./BurgerMenu/menus/scaleDown').default;

// Permits HTML markup encoding in controversy card text
import { Parser as HtmlToReactParser } from 'html-to-react';

const AppStateless = React.createClass({
	componentDidMount: function() {
	},

	handleAssetLoadError: function(error) {
		console.log('Error loading overlay images ...');
		console.log(error);
	},

	handleAssetLoadSuccess: function() {
		console.log('All assets loaded successfully.');
	},

	showSettings: function(event) {
		event.preventDefault();
	},

	isMenuOpen: function(state) {
		if (!state.isOpen) {
			this.props.closeMenu();
		}
	},

	render: function() {
		const
			h = new HtmlToReactParser(),
			loadSpinner = (<Spinner />),
			isFirstPage = this.props.slides.current === 0,
			currentSlide = this.props.slideshow[this.props.slides.current] || 0,

			hasText = this.props.slideshow &&
				currentSlide &&
				currentSlide.text,

			showBurger = !this.props.overlays.active || (!isFirstPage && hasText) ?
				true :
				false,

			prevNextStyle = {
				display: this.props.overlays.active ? 'block' : 'none'
			}

		return (
			<div className="App" id="outer-container">

				<Menu pageWrapId="page-wrap"
					outerContainerId="outer-container"
					isOpen={this.props.menu.open}
					width='75vw'
					onStateChange={this.isMenuOpen}
					burgerToggle={showBurger}>

					{isFirstPage ?
						h.parse(this.props.card.text) :
						hasText &&
						h.parse(currentSlide.text.unicode)}

					<hr className="footnotes-line" />

					<div className="footnotes">
						{!isFirstPage && currentSlide.footnotes.map((note,i) => 
							<p key={i}>{h.parse(note.markup)}</p>
						)}
					</div>
				</Menu>

				<main id="page-wrap">
					<Preload
						cardId={this.props.card.id}
						loadingIndicator={loadSpinner}
						onError={this.handleAssetLoadError}
						onSuccess={this.handleAssetLoadSuccess}
						resolveOnError={true}
						mountChildren={true} >

						<ControversyCard
							icon={this.props.card.icon}
							titleLeft={this.props.card.nameLeft}
							titleRight={this.props.card.nameRight}
							summary={this.props.card.summary}
							currentSlide={this.props.slides.current}
							activeSlide={this.props.slides.active}
							showOverlay={this.props.overlays.active} />

					</Preload>

					{this.props.controls.prev &&
						<div 
							onClick={this.props.prevSlide}
							className="md-prev md-np mbsc-ic mbsc-ic-arrow-left5"
							style={prevNextStyle}>
						</div>
					}

					{this.props.controls.next &&
	                    <div
	                    	onClick={this.props.nextSlide}
	                    	className="md-next md-np md-n mbsc-ic mbsc-ic-arrow-right5"
	                    	style={prevNextStyle}>
	                	</div>
	                }
                </main>

			</div>
		);
	}
});

export default AppStateless;