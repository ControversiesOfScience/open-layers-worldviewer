import React from 'react';
import './Title.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Power1 } from 'gsap';

// Permits HTML markup encoding in Title
import { Parser as HtmlToReactParser } from 'html-to-react';

const AnimatedTitle = React.createClass({
	componentWillAppear: function(callback) {
		const el = this.container;

	    if (this.props.position === 'Center') {
		    TweenMax.from(el, 1.0, { delay:1, y:-300, opacity:0, ease:Power1.easeInOut, onComplete: callback });
		} else if (this.props.position === 'Left') {
		    TweenMax.from(el, 1.0, { delay:1, x:-300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		} else if (this.props.position === 'Right') {
		    TweenMax.from(el, 1.0, { delay:1, x:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		}
	},

	componentWillEnter: function(callback) {
		const el = this.container;

	    if (this.props.position === 'Center') {
		    TweenMax.from(el, 1.0, { delay:1, y:-300, opacity:0, ease:Power1.easeInOut, onComplete: callback });
		} else if (this.props.position === 'Left') {
		    TweenMax.from(el, 1.0, { delay:1, x:-300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		} else if (this.props.position === 'Right') {
		    TweenMax.from(el, 1.0, { delay:1, x:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		}
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function(callback) {
	    const el = this.container;

	    if (this.props.position === 'Center') {
		    TweenMax.to(el, 1.0, { y:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });
		} else if (this.props.position === 'Left') {
		    TweenMax.to(el, 1.0, { x:-300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		} else if (this.props.position === 'Right') {
		    TweenMax.to(el, 1.0, { x:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		}	
	},

	componentDidLeave: function() {
	},

	render: function() {
		let h = new HtmlToReactParser();

		let cssStyles =
			this.props.position === "Right" ? 
			{
				right: this.props.display.right,
				top: this.props.display.top,
				textAlign: "right",
				zIndex: this.props.zindex
			} :
			{
				left: this.props.display.left,
				top: this.props.display.top,
				textAlign: "left",
				zIndex: this.props.zindex
			}

		return (
			<p className={"Title " + this.props.position}
				ref={c => this.container = c}
				style={cssStyles}>

				{h.parse(this.props.children)}

			</p>
		)
	}
});

const Title = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{this.props.showOverlay &&
					<AnimatedTitle
						position={this.props.position}
						display={this.props.display}
						zindex={this.props.zindex}>
						{this.props.children}
					</AnimatedTitle>
				}
			</TransitionGroup>
		);
	}
});

export default Title;
