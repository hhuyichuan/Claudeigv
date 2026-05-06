'use client'

import { useState } from 'react'
import styles from './page.module.css'

type DemoState = 'new' | 'third-party' | 'email'

const GAME_NAMES = [
  'FORTNITE', 'DOFUS', 'FC 26', 'WARCRAFT', 'WOW', 'CLASH', 'BRAWL',
  'ALBION', 'DARK', 'ROBLOX', 'GUILD WARS', 'GTA V', 'NEW WORLD', 'RAID',
  'EVE', 'POKEMON', 'TARKOV', 'DIABLO', 'PUNISHER', 'BRAWL STARS', 'RTD',
  'RUNESCAPE', 'NIGHTOWL', 'CLASH ROYALE', 'STAR TREK', 'COD MOBILE', 'RAID', 'APEX',
  'LOST ARK', 'THRONE', 'COD', 'ARENA', 'MAGIC', 'VALHEIM', 'MIR4',
]

const GI_KEYS = ['gia', 'gib', 'gic', 'gid', 'gie', 'gif', 'gig', 'gih', 'gii', 'gij']

function IconGoogle({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function IconDiscord({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.077.077 0 0 0 .03.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" fill="#5865F2" />
    </svg>
  )
}

function IconSteam({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.718L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z" fill="#1b2838" />
    </svg>
  )
}

function IconApple({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" fill="#000" />
    </svg>
  )
}

function IconX({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" fill="#000" />
    </svg>
  )
}

function IconEmail({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#6b7280" strokeWidth="1.8" />
      <polyline points="22,6 12,13 2,6" stroke="#6b7280" strokeWidth="1.8" />
    </svg>
  )
}

function LeftPanel() {
  return (
    <div className={styles.leftPanel}>
      <div className={styles.gameGrid}>
        {GAME_NAMES.map((name, i) => (
          <div
            key={i}
            className={`${styles.gameIcon} ${(styles as Record<string, string>)[GI_KEYS[i % 10]]}`}
          >
            {name}
          </div>
        ))}
      </div>
      <div className={styles.leftOverlay} />
      <div className={styles.brandLogo}>
        <div className={styles.logoIcon}>iG</div>
        <div>
          <div className={styles.logoText}>
            iGV<span className={styles.logoOrange}>.com</span>
          </div>
          <span className={styles.logoSub}>GAMER VALUE</span>
        </div>
      </div>
    </div>
  )
}

function OAuthGrid() {
  return (
    <div className={styles.oauthGrid}>
      <button className={styles.oauthBtn}><IconGoogle /></button>
      <button className={styles.oauthBtn}><IconDiscord /></button>
      <button className={styles.oauthBtn}><IconSteam /></button>
      <button className={styles.oauthBtn}><IconApple /></button>
      <button className={styles.oauthBtn}><IconX /></button>
    </div>
  )
}

function Divider({ text }: { text: string }) {
  return (
    <div className={styles.divider}>
      <div className={styles.dividerLine} />
      <span className={styles.dividerText}>{text}</span>
      <div className={styles.dividerLine} />
    </div>
  )
}

function LastLoginBanner({ icon, method }: { icon: React.ReactNode; method: string }) {
  return (
    <div className={styles.lastLoginBanner}>
      <div className={styles.bannerIcon}>{icon}</div>
      <span className={styles.bannerLabel}>上次登录：</span>
      <span className={styles.bannerMethod}>{method}</span>
      <span className={styles.bannerEmail}>jo***@gmail.com</span>
    </div>
  )
}

function EmailForm() {
  return (
    <>
      <div className={styles.inputWrapper}>
        <input type="email" placeholder="Enter email address" className={styles.input} />
      </div>
      <button className={styles.btnPrimary}>Continue with email</button>
      <span className={styles.textLink}>Password login</span>
      <button className={styles.ramBtn}>RAM Channel Login</button>
    </>
  )
}

function RightPanel({ state }: { state: DemoState }) {
  return (
    <div className={styles.rightPanel}>
      <a className={styles.sellerLink}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
        Become a Seller ›
      </a>
      <div className={styles.loginBox}>
        <h1 className={styles.loginTitle}>Log in or register for iGV</h1>

        {state === 'new' && (
          <>
            <OAuthGrid />
            <Divider text="Or Verification code login" />
            <EmailForm />
          </>
        )}

        {state === 'third-party' && (
          <>
            <Divider text="其他登录方式" />
            <OAuthGrid />
            <Divider text="Or Verification code login" />
            <LastLoginBanner icon={<IconGoogle size={16} />} method="Google" />
            <EmailForm />
          </>
        )}

        {state === 'email' && (
          <>
            <Divider text="其他登录方式" />
            <OAuthGrid />
            <Divider text="Or Verification code login" />
            <LastLoginBanner icon={<IconEmail size={15} />} method="Email" />
            <EmailForm />
          </>
        )}
      </div>
    </div>
  )
}

function DemoSwitcher({
  state,
  setState,
}: {
  state: DemoState
  setState: (s: DemoState) => void
}) {
  return (
    <div className={styles.demoSwitcher}>
      <div className={styles.dsTitle}>🎛 UI 状态预览</div>
      <button
        className={`${styles.dsBtn} ${state === 'new' ? styles.dsBtnActive : ''}`}
        onClick={() => setState('new')}
      >
        🆕 无登录记录
      </button>
      <button
        className={`${styles.dsBtn} ${state === 'third-party' ? styles.dsBtnActive : ''}`}
        onClick={() => setState('third-party')}
      >
        🔑 上次：第三方登录（Google）
      </button>
      <button
        className={`${styles.dsBtn} ${state === 'email' ? styles.dsBtnActive : ''}`}
        onClick={() => setState('email')}
      >
        📧 上次：邮箱登录
      </button>
    </div>
  )
}

export default function IgvLoginPage() {
  const [state, setState] = useState<DemoState>('new')

  return (
    <div className={styles.page}>
      <LeftPanel />
      <RightPanel state={state} />
      <DemoSwitcher state={state} setState={setState} />
    </div>
  )
}
