import { Link } from 'react-router-dom';

export default function CrewZLogo({ size = 36, dark = false, className = "", testId = "logo-link" }) {
  return (
    <Link to="/" className={`crewz-logo ${dark ? 'logo-dark' : ''} ${className}`} style={{ '--logo-size': `${size}px` }} aria-label="CrewZ home" data-testid={testId}>
      <span className="icon" aria-hidden="true">
        <span className="face">
          <span className="z-letter">Z</span>
          <span className="bar" />
        </span>
      </span>
      <span className="word">CREW<span className="accent">Z</span></span>
    </Link>
  );
}
