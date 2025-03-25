import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff5f5",
          position: "relative",
        }}
      >
        {/* 背景の装飾 */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0.1,
            backgroundImage: "repeating-linear-gradient(45deg, #ff9999 0, #ff9999 20px, transparent 20px, transparent 40px)",
          }}
        />
        
        {/* メインコンテンツ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0 8px 16px rgba(255, 107, 107, 0.2)",
          }}
        >
          <img
            src="https://mochinoa.com/images/mochinoajump.png"
            alt="もちのあ"
            width="200"
            height="200"
            style={{
              marginBottom: "20px",
            }}
          />
          <h1
            style={{
              fontSize: "64px",
              color: "#ff6b6b",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            もちのあジャンプ
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#ff9999",
              textAlign: "center",
            }}
          >
            かわいいもちのあがジャンプする楽しいゲーム！
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
} 