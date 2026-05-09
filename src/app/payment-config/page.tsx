'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'

const CONTINENTS = [
  { id: 'asia',     label: '亚洲',   emoji: '🌏' },
  { id: 'europe',   label: '欧洲',   emoji: '🌍' },
  { id: 'north_am', label: '北美洲', emoji: '🌎' },
  { id: 'south_am', label: '南美洲', emoji: '🌎' },
  { id: 'africa',   label: '非洲',   emoji: '🌍' },
  { id: 'oceania',  label: '大洋洲', emoji: '🌏' },
]

const COUNTRIES = [
  { id: 'cn', label: '中国',   continent: 'asia',     flag: '🇨🇳' },
  { id: 'jp', label: '日本',   continent: 'asia',     flag: '🇯🇵' },
  { id: 'kr', label: '韩国',   continent: 'asia',     flag: '🇰🇷' },
  { id: 'sg', label: '新加坡', continent: 'asia',     flag: '🇸🇬' },
  { id: 'de', label: '德国',   continent: 'europe',   flag: '🇩🇪' },
  { id: 'fr', label: '法国',   continent: 'europe',   flag: '🇫🇷' },
  { id: 'gb', label: '英国',   continent: 'europe',   flag: '🇬🇧' },
  { id: 'us', label: '美国',   continent: 'north_am', flag: '🇺🇸' },
  { id: 'ca', label: '加拿大', continent: 'north_am', flag: '🇨🇦' },
  { id: 'br', label: '巴西',   continent: 'south_am', flag: '🇧🇷' },
]

type Mode = 'inc' | 'exc'
type OpenDD = 'continent' | 'country' | null

interface Linkage {
  contId: string
  addedIds: string[]
}

function cx(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(' ')
}

export default function PaymentConfigPage() {
  const [selContinents, setSelContinents] = useState<Set<string>>(new Set())
  const [selCountries, setSelCountries]   = useState<Set<string>>(new Set())
  const [mode, setMode]                   = useState<Mode>('inc')
  const [openDD, setOpenDD]               = useState<OpenDD>(null)
  const [cFilter, setCFilter]             = useState('')
  const [linkage, setLinkage]             = useState<Linkage | null>(null)

  const continentWrapRef = useRef<HTMLDivElement>(null)
  const countryWrapRef   = useRef<HTMLDivElement>(null)
  const countrySearchRef = useRef<HTMLInputElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!continentWrapRef.current?.contains(e.target as Node)) {
        setOpenDD(dd => dd === 'continent' ? null : dd)
      }
      if (!countryWrapRef.current?.contains(e.target as Node)) {
        setOpenDD(dd => dd === 'country' ? null : dd)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Auto-focus country search input when opened
  useEffect(() => {
    if (openDD === 'country') {
      countrySearchRef.current?.focus()
    }
  }, [openDD])

  // Auto-hide linkage banner after 5 seconds
  useEffect(() => {
    if (!linkage) return
    const t = setTimeout(() => setLinkage(null), 5000)
    return () => clearTimeout(t)
  }, [linkage])

  function toggleDD(w: 'continent' | 'country') {
    setOpenDD(prev => prev === w ? null : w)
  }

  function toggleContinent(id: string) {
    if (selContinents.has(id)) {
      setSelContinents(prev => { const s = new Set(prev); s.delete(id); return s })
      setSelCountries(prev => {
        const s = new Set(prev)
        COUNTRIES.filter(c => c.continent === id).forEach(c => s.delete(c.id))
        return s
      })
    } else {
      const added = COUNTRIES.filter(c => c.continent === id).map(c => c.id)
      setSelContinents(prev => new Set([...prev, id]))
      setSelCountries(prev => new Set([...prev, ...added]))
      setLinkage({ contId: id, addedIds: added })
    }
  }

  function removeContinent(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    setSelContinents(prev => { const s = new Set(prev); s.delete(id); return s })
    setSelCountries(prev => {
      const s = new Set(prev)
      COUNTRIES.filter(c => c.continent === id).forEach(c => s.delete(c.id))
      return s
    })
  }

  function clearContinents() {
    setSelContinents(new Set())
    setSelCountries(new Set())
    setLinkage(null)
  }

  function toggleCountry(id: string) {
    setSelCountries(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }

  function removeCountry(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    setSelCountries(prev => { const s = new Set(prev); s.delete(id); return s })
  }

  function clearCountries() {
    setSelCountries(new Set())
  }

  function handleSave() {
    if (selContinents.size === 0) {
      alert('请至少选择一个适用大洲')
      return
    }
    const mt = mode === 'inc' ? '正选（适用）' : '反选（不适用）'
    const cn = [...selContinents].map(id => CONTINENTS.find(x => x.id === id)?.label).join('、')
    const co = [...selCountries].map(id => COUNTRIES.find(x => x.id === id)?.label).join('、') || '无'
    alert(`✅ 配置保存成功！\n\n大洲：${cn}\n国家（${mt}）：${co}`)
  }

  // Derived: countries filtered and grouped by continent
  const filteredCountries = COUNTRIES.filter(c => !cFilter || c.label.includes(cFilter))
  const countriesByCont = filteredCountries.reduce<Record<string, typeof COUNTRIES>>((acc, c) => {
    if (!acc[c.continent]) acc[c.continent] = []
    acc[c.continent].push(c)
    return acc
  }, {})

  const contTriggerClass = cx(
    styles['ms-trigger'],
    openDD === 'continent' && styles.open
  )

  const cntTriggerClass = cx(
    styles['ms-trigger'],
    openDD === 'country' && styles.open,
    selCountries.size > 0 && (mode === 'inc' ? styles['mode-inc'] : styles['mode-exc'])
  )

  return (
    <div className={styles.pageRoot}>

      {/* Page header */}
      <div className={styles['page-header']}>
        <div className={styles.label}>Admin Console · Payment Methods</div>
        <h1>适用范围配置</h1>
        <p>
          选择大洲后自动填充对应国家；支持切换{' '}
          <strong style={{ color: '#4ade80' }}>✅ 正选</strong>（勾选国家适用）或{' '}
          <strong style={{ color: '#f87171' }}>🚫 反选</strong>（勾选国家不适用）两种模式进行精细配置。
        </p>
      </div>

      {/* Config card */}
      <div className={styles.card}>
        <div className={styles['card-title']}>
          <span className={styles.dot} />
          大洲 &amp; 国家配置
        </div>

        {/* ① Continent select */}
        <div className={styles['field-group']}>
          <label className={styles['field-label']}>
            适用大洲 <span className={styles.req}>*</span>
            <span className={styles.badge}>多选</span>
          </label>
          <div className={styles['multi-select']} ref={continentWrapRef}>
            <div className={contTriggerClass} onClick={() => toggleDD('continent')}>
              {selContinents.size === 0 ? (
                <span className={styles.placeholder}>请选择适用大洲…</span>
              ) : (
                [...selContinents].map(id => {
                  const c = CONTINENTS.find(x => x.id === id)!
                  return (
                    <span key={id} className={styles.tag}>
                      {c.emoji} {c.label}
                      <span className={styles.remove} onClick={e => removeContinent(e, id)}>×</span>
                    </span>
                  )
                })
              )}
              <span className={styles.arrow}>▼</span>
            </div>
            <div className={cx(styles['ms-dropdown'], openDD === 'continent' && styles.open)}>
              <div className={styles['ms-options']}>
                {CONTINENTS.map(c => {
                  const sel = selContinents.has(c.id)
                  return (
                    <div key={c.id} className={styles['ms-option']} onClick={() => toggleContinent(c.id)}>
                      <span
                        className={styles['check-box']}
                        style={sel ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' } : {}}
                      >
                        {sel ? '✓' : ''}
                      </span>
                      <span className={styles.emoji}>{c.emoji}</span>
                      {c.label}
                    </div>
                  )
                })}
              </div>
              <div className={styles['ms-footer']}>
                <span>已选 {selContinents.size} 项</span>
                <span className={styles['clear-btn']} onClick={clearContinents}>清空</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linkage banner */}
        {linkage && (() => {
          const cont = CONTINENTS.find(x => x.id === linkage.contId)!
          const names = linkage.addedIds
            .map(id => { const c = COUNTRIES.find(x => x.id === id); return c ? `${c.flag} ${c.label}` : id })
            .join('、')
          return (
            <div className={styles['linkage-banner']}>
              <span className={styles.lbi}>⚡</span>
              <div className={styles.lbt}>
                <strong>单向联动</strong>：选择「{cont.emoji} {cont.label}」→ 已自动勾选{' '}
                <strong>{linkage.addedIds.length} 个国家</strong>（{names}）。可在下方手动增减。
              </div>
            </div>
          )
        })()}

        <div className={styles.divider}>国家精细配置</div>

        {/* ② Mode toggle */}
        <div className={styles['mode-row']}>
          <span className={styles['mode-lbl']}>国家选择方式：</span>
          <div className={styles['mode-toggle']}>
            <button
              className={cx(styles['mode-btn'], mode === 'inc' && styles['active-inc'])}
              onClick={() => setMode('inc')}
            >
              ✅ 正选（勾选国家 适用）
            </button>
            <button
              className={cx(styles['mode-btn'], mode === 'exc' && styles['active-exc'])}
              onClick={() => setMode('exc')}
            >
              🚫 反选（勾选国家 不适用）
            </button>
          </div>
        </div>

        {/* Mode hint */}
        <div className={cx(styles['mode-hint'], styles[mode])}>
          <span className={styles.hi}>{mode === 'inc' ? '✅' : '🚫'}</span>
          <div className={styles.ht}>
            {mode === 'inc' ? (
              <><strong>正选模式</strong>：下方勾选的国家表示 <strong>「适用」</strong> 该支付方式，未勾选国家不适用。</>
            ) : (
              <><strong>反选模式</strong>：下方勾选的国家表示 <strong>「不适用」</strong> 该支付方式，未勾选国家默认适用。</>
            )}
          </div>
        </div>

        {/* ③ Country select */}
        <div className={styles['field-group']} style={{ marginBottom: 0 }}>
          <div className={styles['country-head']}>
            <label className={styles['field-label']}>
              适用国家 <span className={styles.badge}>多选 · 可手动调整</span>
            </label>
            <div className={styles['cnt-info']}>
              已选 <span className={cx(styles['cnt-num'], styles[mode])}>{selCountries.size}</span> 个国家
            </div>
          </div>
          <div className={styles['multi-select']} ref={countryWrapRef}>
            <div className={cntTriggerClass} onClick={() => toggleDD('country')}>
              {selCountries.size === 0 ? (
                <span className={styles.placeholder}>请先选择大洲，或直接搜索国家…</span>
              ) : (
                [...selCountries].map(id => {
                  const c = COUNTRIES.find(x => x.id === id)
                  if (!c) return null
                  return (
                    <span key={id} className={cx(styles.tag, mode === 'inc' ? styles['inc-tag'] : styles['exc-tag'])}>
                      {c.flag} {c.label}
                      <span className={styles.remove} onClick={e => removeCountry(e, id)}>×</span>
                    </span>
                  )
                })
              )}
              <span className={styles.arrow}>▼</span>
            </div>
            <div className={cx(styles['ms-dropdown'], openDD === 'country' && styles.open)}>
              <div className={styles['search-wrap']}>
                <input
                  ref={countrySearchRef}
                  className={styles['search-input']}
                  type="text"
                  placeholder="搜索国家名称…"
                  value={cFilter}
                  onChange={e => setCFilter(e.target.value)}
                />
                <span className={cx(styles['mode-pill'], styles[mode])}>
                  {mode === 'inc' ? '✅ 正选' : '🚫 反选'}
                </span>
              </div>
              <div className={styles['ms-options']}>
                {Object.keys(countriesByCont).length === 0 ? (
                  <div className={styles['no-match']}>无匹配国家</div>
                ) : (
                  Object.keys(countriesByCont).map(cid => {
                    const cont = CONTINENTS.find(x => x.id === cid)
                    const active = selContinents.has(cid)
                    return (
                      <div key={cid}>
                        <div className={cx(styles['group-hd'], active && styles.active)}>
                          {cont?.emoji} {cont?.label ?? cid}
                        </div>
                        {countriesByCont[cid].map(c => {
                          const sel = selCountries.has(c.id)
                          const boxStyle = sel
                            ? (mode === 'inc'
                              ? { background: '#22c55e', borderColor: '#22c55e', color: '#fff' }
                              : { background: '#ef4444', borderColor: '#ef4444', color: '#fff' })
                            : {}
                          const rowStyle = sel
                            ? { color: mode === 'inc' ? '#4ade80' : '#f87171' }
                            : {}
                          return (
                            <div
                              key={c.id}
                              className={styles['ms-option']}
                              style={rowStyle}
                              onClick={() => toggleCountry(c.id)}
                            >
                              <span className={styles['check-box']} style={boxStyle}>
                                {sel ? '✓' : ''}
                              </span>
                              <span className={styles.emoji}>{c.flag}</span>
                              {c.label}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })
                )}
              </div>
              <div className={styles['ms-footer']}>
                <span>已选 {selCountries.size} 个</span>
                <span className={styles['clear-btn']} onClick={clearCountries}>清空</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action row */}
        <div className={styles['action-row']}>
          <button className={cx(styles.btn, styles['btn-ghost'])}>取消</button>
          <button className={cx(styles.btn, styles['btn-primary'])} onClick={handleSave}>
            保存配置
          </button>
        </div>
      </div>

      {/* Live preview */}
      <div className={styles['preview-card']}>
        <div className={styles['preview-title']}>📋 配置预览（实时）</div>

        <div className={styles['preview-row']}>
          <span className={styles.pkey}>大洲</span>
          <div className={styles['preview-tags']}>
            {selContinents.size === 0 ? (
              <span className={styles['preview-empty']}>—</span>
            ) : (
              [...selContinents].map(id => {
                const c = CONTINENTS.find(x => x.id === id)!
                return <span key={id} className={styles.tag}>{c.emoji} {c.label}</span>
              })
            )}
          </div>
        </div>

        <div className={styles['preview-row']}>
          <span className={styles.pkey}>{mode === 'inc' ? '适用' : '排除'}</span>
          <div className={styles['preview-tags']}>
            {selCountries.size === 0 ? (
              <span className={styles['preview-empty']}>—</span>
            ) : (
              [...selCountries].map(id => {
                const c = COUNTRIES.find(x => x.id === id)
                return c ? (
                  <span key={id} className={cx(styles.tag, mode === 'inc' ? styles['inc-tag'] : styles['exc-tag'])}>
                    {c.flag} {c.label}
                  </span>
                ) : null
              })
            )}
          </div>
        </div>

        <div className={styles['preview-row']} style={{ marginTop: 4 }}>
          <span className={styles.pkey}>模式</span>
          <div>
            {mode === 'inc' ? (
              <span style={{ color: '#4ade80', fontSize: 13, fontWeight: 600 }}>✅ 正选 — 勾选国家适用该支付方式</span>
            ) : (
              <span style={{ color: '#f87171', fontSize: 13, fontWeight: 600 }}>🚫 反选 — 勾选国家不适用该支付方式</span>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
