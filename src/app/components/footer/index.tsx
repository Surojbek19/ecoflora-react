import React from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../../css/footer.css"; // make sure path is correct

const FooterWrap = styled.footer`
  width: 100%;
  background: #f7f8f5;
`;

export default function Footer() {
  const authMember = null;

  return (
    <FooterWrap>
      {/* ===== Green Top Bar (same as screenshot, but no email) ===== */}
      <div className="footer-topbar">
        <Container className="footer-topbar-inner">
          <div className="footer-topbar-icon" aria-hidden="true" />

          <div className="footer-topbar-text">
            <div className="footer-topbar-title">PLANTS FOR CALM LIVING</div>
            <div className="footer-topbar-sub">
              EcoFlora brings indoor & outdoor plants for peaceful, beautiful spaces.
              Curated collections, simple care, and natural style — no clutter.
            </div>
          </div>
        </Container>
      </div>

      {/* ===== Main footer area ===== */}
      <Container className="footer-main">
        <div className="footer-grid">
          {/* LEFT: Brand */}
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-mark" aria-hidden="true">🌿</span>
              <span className="footer-logo-name">EcoFlora</span>
            </div>

            <p className="footer-desc">
              EcoFlora is a modern plant store dedicated to bringing nature into everyday life.
              We hand-pick plants that help you create calm, healthy, and beautiful spaces.
            </p>

            <div className="footer-social">
              <a className="social-circle" href="#" aria-label="Facebook">f</a>
              <a className="social-circle" href="#" aria-label="X">x</a>
              <a className="social-circle" href="#" aria-label="YouTube">▶</a>
              <a className="social-circle" href="#" aria-label="Google+">G+</a>
              <a className="social-circle" href="#" aria-label="Instagram">⌁</a>
            </div>
          </div>

          {/* CENTER: Information */}
          <div className="footer-col">
            <div className="footer-title">Information</div>
            <div className="footer-links">
              <Link to="/about">About Us</Link>
              <Link to="/delivery">Delivery Information</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/sitemap">Site Map</Link>
            </div>
          </div>

          {/* CENTER: Extras */}
          <div className="footer-col">
            <div className="footer-title">Extras</div>
            <div className="footer-links">
              <Link to="/brands">Brands</Link>
              <Link to="/gift-cards">Gift Certificates</Link>
              <Link to="/affiliate">Affiliate</Link>
              <Link to="/specials">Specials</Link>
              <Link to="/help">Contact Us</Link>
            </div>
          </div>

          {/* RIGHT: Store Information */}
          <div className="footer-col">
            <div className="footer-title">Store Information</div>

            <div className="footer-store">
              <div className="store-row">
                <span className="store-ico">📍</span>
                <span>EcoFlora – Plant Store</span>
              </div>
              <div className="store-row">
                <span className="store-ico">🌍</span>
                <span>United States</span>
              </div>
              <div className="store-row">
                <span className="store-ico">📞</span>
                <span>000-000-0000</span>
              </div>
              <div className="store-row">
                <span className="store-ico">🧾</span>
                <span>123456</span>
              </div>
              <div className="store-row">
                <span className="store-ico">✉️</span>
                <span>sales@ecoflora.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider like screenshot */}
        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="footer-powered">
            Powered By OpenCart EcoFlora – Plant Store © 2026
          </div>

          <div className="footer-payments" aria-label="Payment methods">
            <span className="pay-badge">VISA</span>
            <span className="pay-badge">DISC</span>
            <span className="pay-badge">AMEX</span>
            <span className="pay-badge">MC</span>
            <span className="pay-badge">PayPal</span>
          </div>
        </div>
      </Container>
    </FooterWrap>
  );
}
