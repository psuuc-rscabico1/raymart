
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* 
        This is a zero-JS implementation. 
        All animations, counters, and charts are driven by CSS and SVG.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');

        :root {
          --bg-color: #0c0c0e;
          --brand-red: #db3533;
          --status-green: #4cbf40;
          --border-light: rgba(255, 255, 255, 0.06);
          --text-gray: rgba(255, 255, 255, 0.4);
          --text-darker: rgba(255, 255, 255, 0.2);
        }

        @property --num-lead {
          syntax: '<integer>';
          initial-value: 0;
          inherits: false;
        }
        @property --num-cost {
          syntax: '<integer>';
          initial-value: 0;
          inherits: false;
        }
        @property --num-roi {
          syntax: '<integer>';
          initial-value: 0;
          inherits: false;
        }
        @property --num-live {
          syntax: '<integer>';
          initial-value: 0;
          inherits: false;
        }

        .widget {
          width: 414px;
          height: 518px;
          background: var(--bg-color);
          color: white;
          font-family: 'IBM Plex Mono', monospace;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          user-select: none;
          box-sizing: border-box;
        }

        /* Section 1: Header */
        header {
          padding: 24px 20px 16px;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid var(--border-light);
        }
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
        }
        .title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .live-status {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pulse-red {
          width: 6px;
          height: 6px;
          background: var(--brand-red);
          border-radius: 50%;
          animation: pulse-red 1.5s infinite ease-in-out;
        }
        .live-pilot-text {
          font-size: 11px;
          font-weight: 700;
          color: var(--brand-red);
        }
        .header-subtitle {
          align-self: flex-end;
          font-size: 10px;
          color: var(--text-gray);
        }

        /* Section 2: Chart */
        .chart-container {
          padding: 20px 20px 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .chart-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .label-left {
          font-size: 9px;
          color: var(--text-gray);
        }
        .label-right {
          font-size: 9px;
          color: var(--text-gray);
          text-transform: uppercase;
        }
        .svg-chart {
          width: 100%;
          height: 120px;
          margin-top: auto;
          overflow: visible;
        }
        .path-prompt {
          fill: none;
          stroke: var(--brand-red);
          stroke-width: 2;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: draw-line 2s ease-out forwards;
        }
        .path-traditional {
          fill: none;
          stroke: #444;
          stroke-width: 1.5;
          stroke-dasharray: 4 4;
        }
        .month-labels {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          font-size: 9px;
          color: #666;
        }

        /* Section 3: Metric Counters */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px 20px;
          padding: 30px 20px;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        .metric-item {
          display: flex;
          flex-direction: column;
        }
        .metric-value {
          font-size: 22px;
          font-weight: 700;
          color: var(--brand-red);
          margin-bottom: 4px;
        }
        .metric-label {
          font-size: 9px;
          color: var(--text-gray);
          text-transform: uppercase;
          margin-bottom: 6px;
          font-weight: 700;
        }
        .metric-desc {
          font-size: 8px;
          color: var(--text-darker);
          line-height: 1.3;
        }

        /* Counter Animations */
        .counter-lead::after {
          counter-reset: num var(--num-lead);
          content: "+" counter(num) "%";
          animation: count-lead 1.5s ease-out forwards;
        }
        .counter-cost::after {
          counter-reset: num var(--num-cost);
          content: "−" counter(num) "%";
          animation: count-cost 1.5s ease-out forwards;
        }
        .counter-roi::after {
          counter-reset: num var(--num-roi);
          content: counter(num) "×";
          animation: count-roi 1.5s ease-out forwards;
        }
        .counter-live::after {
          counter-reset: num var(--num-live);
          content: counter(num) "h";
          animation: count-live 1.5s ease-out forwards;
        }

        /* Section 4: Scrolling Ticker */
        .ticker-container {
          height: 32px;
          background: rgba(255, 255, 255, 0.01);
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .ticker-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }
        .ticker-item {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.4);
          padding: 0 20px;
          text-transform: uppercase;
          font-weight: 400;
        }

        /* Section 5: Footer */
        footer {
          padding: 16px 20px;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }
        .footer-left {
          font-size: 10px;
          color: var(--text-darker);
        }
        .footer-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pulse-green {
          width: 6px;
          height: 6px;
          background: var(--status-green);
          border-radius: 50%;
          animation: pulse-green 2s infinite ease-in-out;
          box-shadow: 0 0 6px var(--status-green);
        }
        .status-text {
          font-size: 10px;
          color: var(--text-darker);
          text-transform: uppercase;
        }

        /* Animations */
        @keyframes pulse-red {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.4; }
        }
        @keyframes pulse-green {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; filter: brightness(1.2); }
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes count-lead { from { --num-lead: 0; } to { --num-lead: 25; } }
        @keyframes count-cost { from { --num-cost: 0; } to { --num-cost: 35; } }
        @keyframes count-roi { from { --num-roi: 0; } to { --num-roi: 5; } }
        @keyframes count-live { from { --num-live: 0; } to { --num-live: 48; } }
      ` }} />

      <div className="widget">
        <header>
          <div className="header-top">
            <span className="title">AI Lead Intelligence</span>
            <div className="live-status">
              <div className="pulse-red"></div>
              <span className="live-pilot-text">LIVE PILOT</span>
            </div>
          </div>
          <span className="header-subtitle">48 dealerships · 5 states</span>
        </header>

        <div className="chart-container">
          <div className="chart-labels">
            <span className="label-left">AI-driven lead volume · last 6 months</span>
            <span className="label-right">JAN – JUN 2025</span>
          </div>
          
          <svg className="svg-chart" viewBox="0 0 374 100" preserveAspectRatio="none">
            {/* Traditional Line */}
            <path className="path-traditional" d="M0,80 L75,78 L150,79 L225,78 L300,77 L374,77" />
            {/* AI Prompt Line */}
            <path className="path-prompt" d="M0,80 L75,70 L150,55 L225,40 L300,20 L374,5" />
          </svg>

          <div className="month-labels">
            <span>JAN</span>
            <span>FEB</span>
            <span>MAR</span>
            <span>APR</span>
            <span>MAY</span>
            <span>JUN</span>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-value counter-lead"></div>
            <span className="metric-label">Lead volume</span>
            <p className="metric-desc">More qualified buyers reaching you every month — because AI now knows you exist.</p>
          </div>
          <div className="metric-item">
            <div className="metric-value counter-cost"></div>
            <span className="metric-label">Cost per lead</span>
            <p className="metric-desc">You spend less chasing leads on traditional channels because AI brings them to you.</p>
          </div>
          <div className="metric-item">
            <div className="metric-value counter-roi"></div>
            <span className="metric-label">ROI generated</span>
            <p className="metric-desc">Every dollar into Prompt Graph earns back five, measured over six months.</p>
          </div>
          <div className="metric-item">
            <div className="metric-value counter-live"></div>
            <span className="metric-label">Live results</span>
            <p className="metric-desc">From sign-up to showing up in AI answers. No rebuild. No downtime.</p>
          </div>
        </div>

        <div className="ticker-container">
          <div className="ticker-track">
            <span className="ticker-item">· Toyota of Dallas +18 leads this week</span>
            <span className="ticker-item">· Honda of Austin cost per lead ↓41%</span>
            <span className="ticker-item">· Ford of Houston AI mentions ↑3.2×</span>
            <span className="ticker-item">· Chevy of Phoenix ROI 5.1× confirmed</span>
            <span className="ticker-item">· BMW of Denver +31 leads this month</span>
            {/* Repeated for seamless loop */}
            <span className="ticker-item">· Toyota of Dallas +18 leads this week</span>
            <span className="ticker-item">· Honda of Austin cost per lead ↓41%</span>
            <span className="ticker-item">· Ford of Houston AI mentions ↑3.2×</span>
            <span className="ticker-item">· Chevy of Phoenix ROI 5.1× confirmed</span>
            <span className="ticker-item">· BMW of Denver +31 leads this month</span>
          </div>
        </div>

        <footer>
          <span className="footer-left">Real dealerships. Real attribution.</span>
          <div className="footer-right">
            <span className="status-text">All systems nominal</span>
            <div className="pulse-green"></div>
          </div>
        </footer>
      </div>
    </main>
  );
}
