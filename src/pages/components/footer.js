import React from "react";

function Footer() {
  return (
    <>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            
            width: 100%;
            overflow-x: hidden;   /* ✅ no horizontal scroll */
          }

          .footer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.6);
            color: white;
            text-align: center;
            padding: 15px 20px;
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 14px;
            width: 100VW;           /* ✅ span full parent width */
            max-width: 100vw;      /* ✅ prevent shrinking */
            box-sizing: border-box;
            box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
            position: relative;
            left: 0;
            right: 0;
            bottom:0;
          }

          .footer a {
            color: #d0d0d0;
            margin: 0 10px;
            text-decoration: none;
            font-weight: 500;
          }

          .footer a:hover {
            color: white;
          }
        `}
      </style>

      <footer className="footer">
        <p>© {new Date().getFullYear()} KIITGO ❤️| All Rights Reserved</p>
      </footer>
    </>
  );
}

export default Footer;
