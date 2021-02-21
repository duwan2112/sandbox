import Glide from "@glidejs/glide";
import {Component} from "react";

export default class SliderGlide extends Component {
  state = {id: null};
  componentDidMount = () => {
    // Generated random id
    this.setState(
      {id: `glide-${Math.ceil(Math.random() * 100)}`},
      this.initializeGlider
    );
  };

  initializeGlider = () => {
    this.slider = new Glide(`#${this.state.id}`, this.props.options);
    this.slider.mount();
  };

  componentDidUpdate = (newProps) => {
    if (this.props.options.startAt !== newProps.options.startAt) {
      this.slider.go(`=${newProps.options.startAt}`);
    }
  };

  render = () => (
    <div
      style={{marginTop: this.props.shadow ? " 2.5rem" : "7rem"}}
      id={this.state.id}
      className="glide"
    >
      <div
        className="glide__track "
        style={{
          boxShadow: this.props.shadow
            ? "none"
            : "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
        }}
        data-glide-el="track"
      >
        <div
          className="glide__slides"
          style={{
            display: "flex",
          }}
        >
          {this.props.children.map((slide, index) => {
            return React.cloneElement(slide, {
              key: index,
              className: `${slide.props.className}  glide__slide`,
            });
          })}
        </div>
      </div>
      {this.props.arrows && (
        <div className="glide__arrows" data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left"
            data-glide-dir="<"
          >
            <svg
              width="21"
              height="18"
              viewBox="0 0 21 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.335659 9.55136L7.9195 17.1354C8.13599 17.3519 8.42452 17.4707 8.73217 17.4707C9.04017 17.4707 9.32854 17.3517 9.54502 17.1354L10.2336 16.4467C10.4499 16.2305 10.5691 15.9418 10.5691 15.634C10.5691 15.3263 10.4499 15.0279 10.2336 14.8117L5.80927 10.3777L19.8655 10.3777C20.4992 10.3777 21 9.88156 21 9.24763V8.27396C21 7.64004 20.4992 7.09387 19.8655 7.09387L5.75908 7.09387L10.2334 2.63507C10.4497 2.41858 10.5689 2.13773 10.5689 1.8299C10.5689 1.52242 10.4497 1.23747 10.2334 1.02115L9.54485 0.334644C9.32836 0.118156 9.04 0.000183105 8.732 0.000183105C8.42435 0.000183105 8.13581 0.119694 7.91933 0.33618L0.335487 7.92003C0.11849 8.1372 -0.000850677 8.4271 3.8147e-06 8.73527C-0.000679016 9.04447 0.11849 9.33454 0.335659 9.55136Z"
                fill="#303030"
              />
            </svg>
          </button>
          <button
            className="glide__arrow glide__arrow--right"
            data-glide-dir=">"
          >
            <svg
              width="21"
              height="18"
              viewBox="0 0 21 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.6643 7.91934L13.0805 0.335315C12.864 0.118828 12.5755 0 12.2678 0C11.9598 0 11.6715 0.118999 11.455 0.335315L10.7664 1.02404C10.5501 1.24019 10.4309 1.52889 10.4309 1.83672C10.4309 2.14438 10.5501 2.44281 10.7664 2.65896L15.1907 7.093H1.1345C0.500752 7.093 0 7.58915 0 8.22307L0 9.19674C0 9.83067 0.500752 10.3768 1.1345 10.3768H15.2409L10.7666 14.8356C10.5503 15.0521 10.4311 15.333 10.4311 15.6408C10.4311 15.9483 10.5503 16.2332 10.7666 16.4496L11.4551 17.1361C11.6716 17.3525 11.96 17.4705 12.268 17.4705C12.5757 17.4705 12.8642 17.351 13.0807 17.1345L20.6645 9.55067C20.8815 9.3335 21.0008 9.0436 21 8.73543C21.0007 8.42624 20.8815 8.13617 20.6643 7.91934Z"
                fill="#303030"
              />
            </svg>
          </button>
        </div>
      )}

      {/*    {this.props.bullets && this.props.children.length > 1 && (
        <div
          style={{border: "1px solid red"}}
          className="slider__bullets glide__bullets"
          data-glide-el="controls[nav]"
        >
          {this.props.children.map((slide, index) => (
            <button
              key={Math.random() + ""}
              className="slider__bullet glide__bullet"
              data-glide-dir={`=${index}`}
            ></button>
          ))}
        </div>
      )} */}
    </div>
  );
}

SliderGlide.defaultProps = {
  options: {},
};
