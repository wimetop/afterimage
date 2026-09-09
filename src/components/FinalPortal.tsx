import { ArrowUpRight, ArrowUp } from "lucide-react";
import { BrandMark } from "./Media";
export function FinalPortal() {
  return (
    <>
      <section className="final-portal">
        <div className="mono portal-top">
          <span>YOU DON’T NEED TO HAVE IT ALL FIGURED OUT.</span>
          <span>JUST A FIRST FRAME.</span>
        </div>
        <a href="#create" className="portal-link">
          <span>
            WHAT IF<span className="portal-question">?</span>
          </span>
          <span className="portal-arrow">
            <ArrowUpRight strokeWidth={1} />
          </span>
        </a>
        <div className="portal-bottom">
          <p>Start with the thing you can’t stop imagining.</p>
          <a href="#create" className="text-button">
            Make it move <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <footer>
        <a href="#create" className="footer-brand">
          <BrandMark /> afterimage®
        </a>
        <span className="mono">
          AN INDEPENDENT EXPLORATION OF WHAT’S NEXT.
          <br />© AFTERIMAGE 2026
        </span>
        <a href="#create" className="mono">
          BACK TO REALITY <ArrowUp size={14} />
        </a>
      </footer>
    </>
  );
}
