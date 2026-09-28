import { useEffect, useState } from 'react';

/* ---------- 清新风格天气 SVG 图标（按 WMO weather code 映射） ---------- */

function SunIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ui-sun" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFE27A" />
          <stop offset="100%" stopColor="#FF9D3D" />
        </radialGradient>
      </defs>
      <circle cx="21" cy="21" r="9" fill="url(#ui-sun)" />
      <g stroke="#FFB347" strokeWidth="2" strokeLinecap="round">
        <line x1="21" y1="4" x2="21" y2="9" />
        <line x1="21" y1="33" x2="21" y2="38" />
        <line x1="4" y1="21" x2="9" y2="21" />
        <line x1="33" y1="21" x2="38" y2="21" />
        <line x1="9" y1="9" x2="12.5" y2="12.5" />
        <line x1="29.5" y1="29.5" x2="33" y2="33" />
        <line x1="9" y1="33" x2="12.5" y2="29.5" />
        <line x1="29.5" y1="12.5" x2="33" y2="9" />
      </g>
    </svg>
  );
}

function SunCloudIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ui-sun2" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFE27A" />
          <stop offset="100%" stopColor="#FFB347" />
        </radialGradient>
        <linearGradient id="ui-cloud2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D8E3F0" />
        </linearGradient>
      </defs>
      <circle cx="15" cy="15" r="7" fill="url(#ui-sun2)" />
      <path
        d="M14 30 a6 6 0 0 1 0.5-11.9 a8 8 0 0 1 14.5 2.4 a5 5 0 0 1 -0.5 9.5 z"
        fill="url(#ui-cloud2)"
        stroke="#B8C5D6"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ui-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4F8FC" />
          <stop offset="100%" stopColor="#C7D3E2" />
        </linearGradient>
      </defs>
      <path
        d="M11 30 a6.5 6.5 0 0 1 0.5-12.9 a9 9 0 0 1 16.5 2.6 a5.5 5.5 0 0 1 -0.5 10.3 z"
        fill="url(#ui-cloud)"
        stroke="#A8B5C8"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ui-rain-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8EEF6" />
          <stop offset="100%" stopColor="#B5C2D4" />
        </linearGradient>
      </defs>
      <path
        d="M11 25 a6 6 0 0 1 0.5-11.9 a8 8 0 0 1 14.5 2.4 a5 5 0 0 1 -0.5 9.5 z"
        fill="url(#ui-rain-cloud)"
        stroke="#9FAFC4"
        strokeWidth="1.2"
      />
      <g stroke="#5BA4E6" strokeWidth="2" strokeLinecap="round">
        <line x1="15" y1="29" x2="13" y2="35" />
        <line x1="21" y1="29" x2="19" y2="35" />
        <line x1="27" y1="29" x2="25" y2="35" />
      </g>
    </svg>
  );
}

function SnowIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ui-snow-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4F8FC" />
          <stop offset="100%" stopColor="#CFD9E8" />
        </linearGradient>
      </defs>
      <path
        d="M11 25 a6 6 0 0 1 0.5-11.9 a8 8 0 0 1 14.5 2.4 a5 5 0 0 1 -0.5 9.5 z"
        fill="url(#ui-snow-cloud)"
        stroke="#A8B5C8"
        strokeWidth="1.2"
      />
      <g fill="#7FB8E6">
        <circle cx="14" cy="33" r="1.6" />
        <circle cx="21" cy="35" r="1.6" />
        <circle cx="28" cy="33" r="1.6" />
      </g>
    </svg>
  );
}

function ThunderIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ui-thunder-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C5CCD8" />
          <stop offset="100%" stopColor="#8E97A8" />
        </linearGradient>
      </defs>
      <path
        d="M11 25 a6 6 0 0 1 0.5-11.9 a8 8 0 0 1 14.5 2.4 a5 5 0 0 1 -0.5 9.5 z"
        fill="url(#ui-thunder-cloud)"
        stroke="#727B8C"
        strokeWidth="1.2"
      />
      <path d="M21 27 l-4 7 h4 l-2 6 l7 -9 h-4 l3 -4 z" fill="#FFD24A" stroke="#F5A623" strokeWidth="0.8" />
    </svg>
  );
}

function FogIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <g stroke="#B8C5D6" strokeWidth="2.4" strokeLinecap="round">
        <line x1="8" y1="14" x2="32" y2="14" />
        <line x1="6" y1="21" x2="36" y2="21" />
        <line x1="9" y1="28" x2="31" y2="28" />
      </g>
    </svg>
  );
}

function WeatherIcon({ code }) {
  if (code === 0) return <SunIcon />;
  if (code <= 2) return <SunCloudIcon />;
  if (code === 3) return <CloudIcon />;
  if (code >= 45 && code <= 48) return <FogIcon />;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <RainIcon />;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <SnowIcon />;
  if (code >= 95) return <ThunderIcon />;
  return <CloudIcon />;
}

function weatherText(code) {
  if (code === 0) return '晴';
  if (code === 1) return '主晴';
  if (code === 2) return '多云';
  if (code === 3) return '阴';
  if (code >= 45 && code <= 48) return '雾';
  if (code >= 51 && code <= 57) return '毛毛雨';
  if (code >= 61 && code <= 67) return '雨';
  if (code >= 71 && code <= 77) return '雪';
  if (code >= 80 && code <= 82) return '阵雨';
  if (code >= 85 && code <= 86) return '阵雪';
  if (code >= 95) return '雷暴';
  return '未知';
}

/* ---------- 组件主体 ---------- */

export default function UserLocalInfo() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(new Date());

  // 拉取访客 IP 位置 + 天气
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // 1. IP 地理定位（HTTPS、免 key、含时区与国旗）
        const ipRes = await fetch('https://ipwho.is/');
        const ipData = await ipRes.json();
        if (!ipData.success) throw new Error(ipData.message || 'IP 定位失败');
        const tz =
          ipData.timezone?.id || Intl.DateTimeFormat().resolvedOptions().timeZone;

        // 2. 用经纬度查 Open-Meteo 当前天气
        const wRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${ipData.latitude}&longitude=${ipData.longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`
        );
        const wData = await wRes.json();
        const c = wData.current;
        if (!cancelled) {
          setInfo({
            city: ipData.city || '未知',
            country: ipData.country || '',
            flag: ipData.flag?.emoji || '',
            tz,
            temp: Math.round(c.temperature_2m),
            code: c.weather_code,
            wind: Math.round(c.wind_speed_10m),
          });
        }
      } catch (e) {
        if (!cancelled) setError(e.message || '获取位置信息失败');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 每秒更新时间
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = info
    ? now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: info.tz,
      })
    : '--:--:--';

  return (
    <div className="user-info-card">
      {error ? (
        <div className="user-info-placeholder">无法获取位置信息</div>
      ) : !info ? (
        <div className="user-info-placeholder">获取中…</div>
      ) : (
        <div className="user-info-grid">
          <div className="user-info-weather">
            <WeatherIcon code={info.code} />
            <div className="user-info-weather-text">
              <div className="user-info-temp">{info.temp}°C</div>
              <div className="user-info-cond">{weatherText(info.code)}</div>
            </div>
          </div>
          <div className="user-info-side">
            <div className="user-info-location">{info.city}</div>
            <div className="user-info-time">{timeStr}</div>
          </div>
        </div>
      )}
    </div>
  );
}
