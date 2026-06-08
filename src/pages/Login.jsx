import React, { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "admin123") {
      onLoginSuccess();
    } else {
      alert("Invalid Password");
    }
  };

  return (
    <>
      <style>{`

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

      @keyframes float {
        0%{
          transform:translateY(0px) translateX(0px);
        }
        50%{
          transform:translateY(-40px) translateX(20px);
        }
        100%{
          transform:translateY(0px) translateX(0px);
        }
      }

      @keyframes fadeUp {
        from{
          opacity:0;
          transform:translateY(30px);
        }
        to{
          opacity:1;
          transform:translateY(0);
        }
      }

      .login-page{
        min-height:100vh;
        background:#050A30;
        position:relative;
        overflow:hidden;
        display:flex;
        justify-content:center;
        align-items:center;
        font-family:Inter,sans-serif;
      }

      /* Animated Blobs */

      .blob{
        position:absolute;
        border-radius:50%;
        filter:blur(90px);
      }

      .blob1{
        width:350px;
        height:350px;
        background:#2563EB;
        top:-100px;
        left:-100px;
        opacity:.25;
        animation:float 8s ease-in-out infinite;
      }

      .blob2{
        width:400px;
        height:400px;
        background:#06B6D4;
        bottom:-120px;
        right:-120px;
        opacity:.18;
        animation:float 10s ease-in-out infinite;
      }

      .blob3{
        width:250px;
        height:250px;
        background:#3B82F6;
        top:50%;
        left:15%;
        opacity:.15;
        animation:float 12s ease-in-out infinite;
      }

      /* Grid */

      .grid{
        position:absolute;
        inset:0;
        background-image:
        linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);

        background-size:50px 50px;
      }

      .login-card{
        width:420px;
        background:rgba(255,255,255,.04);
        border:1px solid rgba(255,255,255,.08);
        border-radius:24px;
        padding:45px;
        backdrop-filter:blur(10px);
        position:relative;
        z-index:10;
        animation:fadeUp .8s ease;
      }

      .logo{
        width:70px;
        height:70px;
        margin:auto;
        margin-bottom:25px;
        border-radius:18px;
        background:linear-gradient(
          135deg,
          #2563EB,
          #06B6D4
        );

        display:flex;
        justify-content:center;
        align-items:center;
        font-size:30px;
      }

      h1{
        color:white;
        text-align:center;
        font-size:30px;
        margin-bottom:8px;
      }

      .subtitle{
        text-align:center;
        color:#94A3B8;
        margin-bottom:35px;
      }

      .input{
        width:100%;
        padding:16px;
        background:#0A1140;
        border:1px solid rgba(255,255,255,.08);
        border-radius:14px;
        color:white;
        font-size:15px;
        outline:none;
        margin-bottom:20px;
      }

      .input:focus{
        border-color:#2563EB;
      }

      .btn{
        width:100%;
        padding:16px;
        border:none;
        border-radius:14px;
        background:linear-gradient(
          135deg,
          #2563EB,
          #06B6D4
        );

        color:white;
        font-size:15px;
        font-weight:600;
        cursor:pointer;
        transition:.3s;
      }

      .btn:hover{
        transform:translateY(-2px);
      }

      .footer{
        margin-top:20px;
        text-align:center;
        color:#64748B;
        font-size:13px;
      }

      `}</style>

      <div className="login-page">

        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>

        <div className="grid"></div>

        <div className="login-card">

          <div className="logo">🛡️</div>

          <h1>Admin Portal</h1>

          <p className="subtitle">
            Secure Management Access
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="password"
              className="input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn">
              Sign In
            </button>

          </form>

          <div className="footer">
            Enterprise Security Protected
          </div>

        </div>

      </div>
    </>
  );
}