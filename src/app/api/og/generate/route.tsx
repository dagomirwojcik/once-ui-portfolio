import { ImageResponse } from "next/og";
import { baseURL, person } from "@/resources";

export const runtime = "edge";

export async function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Portfolio";
  let description = url.searchParams.get("description") || "";
  let type = url.searchParams.get("type") || "page"; // page, blog, work, about, etc.

  async function loadGoogleFont(font: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}`
    const css = await (await fetch(url)).text()
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

    if (resource) {
      const response = await fetch(resource[1])
      if (response.status == 200) {
        return await response.arrayBuffer()
      }
    }

    throw new Error('failed to load font data')
  }

  // Dynamic background based on type
  const getBackgroundGradient = (type: string) => {
    switch (type) {
      case "blog":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "work":
        return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
      case "about":
        return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
      case "gallery":
        return "linear-gradient(135deg, #fa709a 0%, #fee140 100%)";
      case "contact":
        return "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)";
      default:
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
  };

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: getBackgroundGradient(type),
        position: "relative",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.1)",
          backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
        }}
      />
      
      {/* Main Content */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "4rem",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2rem",
            flex: 1,
            maxWidth: "60%",
          }}
        >
          {/* Type Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "2rem",
              width: "fit-content",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                width: "0.5rem",
                height: "0.5rem",
                background: "white",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "white",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {type}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "3.8rem",
              lineHeight: "1.1",
              fontWeight: "800",
              color: "white",
              margin: 0,
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              style={{
                fontSize: "1.8rem",
                lineHeight: "1.4",
                color: "rgba(255, 255, 255, 0.9)",
                margin: 0,
                maxWidth: "90%",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              {description}
            </p>
          )}

          {/* Author Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 1.5rem",
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "1rem",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <img
                src={baseURL + person.avatar}
                style={{
                  width: "3rem",
                  height: "3rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    color: "white",
                    lineHeight: "1.2",
                  }}
                >
                  {person.name}
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: "1.2",
                  }}
                >
                  {person.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Decorative Elements */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flex: 0.4,
          }}
        >
          {/* Large Avatar */}
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src={baseURL + person.avatar}
              style={{
                width: "16rem",
                height: "16rem",
                objectFit: "cover",
                borderRadius: "50%",
                border: "4px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              }}
            />
            {/* Glow effect */}
            <div
              style={{
                position: "absolute",
                top: "-0.5rem",
                left: "-0.5rem",
                right: "-0.5rem",
                bottom: "-0.5rem",
                background: "linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))",
                borderRadius: "50%",
                zIndex: -1,
                filter: "blur(20px)",
              }}
            />
          </div>

          {/* Decorative Circles */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: `${0.5 + i * 0.3}rem`,
                  height: `${0.5 + i * 0.3}rem`,
                  background: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "50%",
                  animation: `pulse 2s infinite ${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Branding */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: "1rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            color: "rgba(255, 255, 255, 0.8)",
            fontWeight: "500",
          }}
        >
          dagomirwojcik.com
        </span>
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont('Geist:wght@400;600;800'),
          style: "normal",
        },
      ],
    },
  );
}