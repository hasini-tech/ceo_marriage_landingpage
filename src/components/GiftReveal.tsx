import { useEffect } from "react";

type GiftRevealProps = {
  onComplete: () => void;
};

export function GiftReveal({ onComplete }: GiftRevealProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(onComplete, reducedMotion ? 250 : 3650);

    return () => window.clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="gift-reveal" role="dialog" aria-modal="true" aria-label="Opening your surprise">
      <div className="gift-reveal__grain" aria-hidden="true" />
      <div className="gift-reveal__content">
        <p className="gift-reveal__eyebrow">A little surprise</p>

        <div className="gift-stage" aria-hidden="true">
          <span className="gift-stage__halo" />
          <span className="gift-spark gift-spark--one">&#10022;</span>
          <span className="gift-spark gift-spark--two">&#10023;</span>
          <span className="gift-spark gift-spark--three">&#10022;</span>
          <span className="gift-spark gift-spark--four">&#183;</span>

          <span className="gift-confetti gift-confetti--one" />
          <span className="gift-confetti gift-confetti--two" />
          <span className="gift-confetti gift-confetti--three" />
          <span className="gift-confetti gift-confetti--four" />
          <span className="gift-confetti gift-confetti--five" />
          <span className="gift-confetti gift-confetti--six" />

          <div className="gift-box">
            <span className="gift-box__shadow" />
            <div className="gift-box__pack">
              <span className="gift-pack__shine" />
              <span className="gift-pack__label">FOR YOU SIR</span>
              <span className="gift-pack__heart">&#9829;</span>
            </div>
            <div className="gift-box__well" />
            <div className="gift-box__body">
              <span className="gift-box__body-ribbon" />
              <span className="gift-box__front-shine" />
            </div>
            <div className="gift-box__lid">
              <span className="gift-box__lid-ribbon" />
              <span className="gift-box__bow gift-box__bow--left" />
              <span className="gift-box__bow gift-box__bow--right" />
              <span className="gift-box__bow-knot">&#9829;</span>
            </div>
          </div>
        </div>

        <p className="gift-reveal__caption">Opening something beautiful...</p>
      </div>
    </div>
  );
}

export default GiftReveal;
